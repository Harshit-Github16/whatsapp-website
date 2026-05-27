import { NextRequest, NextResponse } from 'next/server';
import { handleWhatsAppMessage, generateTwiML } from '@/services/whatsapp';
import twilio from 'twilio';

export async function POST(req: NextRequest) {
  try {
    // Read the body as urlencoded form data
    const formData = await req.formData();
    const from = formData.get('From') as string; // e.g. "whatsapp:+14155238886"
    const body = (formData.get('Body') as string) || '';
    const numMedia = parseInt((formData.get('NumMedia') as string) || '0', 10);

    if (!from) {
      return new NextResponse('Missing From parameter', { status: 400 });
    }

    // Optional Twilio request signature verification for production
    const twilioSignature = req.headers.get('x-twilio-signature');
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const validateEnabled = process.env.VERIFY_TWILIO_SIGNATURE === 'true';

    if (validateEnabled && authToken && twilioSignature) {
      // Reconstruct full URL for validation (required by Twilio)
      const url = req.url;
      const params: Record<string, string> = {};
      formData.forEach((value, key) => {
        params[key] = value.toString();
      });

      const isValid = twilio.validateRequest(authToken, twilioSignature, url, params);
      if (!isValid) {
        return new NextResponse('Invalid Twilio Signature', { status: 401 });
      }
    }

    // Clean phone number (remove "whatsapp:" prefix)
    const cleanPhone = from.replace('whatsapp:', '').trim();

    // Extract media attachments
    const mediaUrls: string[] = [];
    for (let i = 0; i < numMedia; i++) {
      const mediaUrl = formData.get(`MediaUrl${i}`) as string;
      if (mediaUrl) {
        mediaUrls.push(mediaUrl);
      }
    }

    // Execute the onboarding state machine
    const xmlResponse = await handleWhatsAppMessage(cleanPhone, body, mediaUrls);

    // Return the response as XML
    return new NextResponse(xmlResponse, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (err) {
    console.error('Error handling WhatsApp webhook:', err);
    // Return a generic fallback TwiML
    const errorXml = generateTwiML(
      '⚠️ Sorry, our website generator encountered an internal error. Please try sending your message again or type RESET.'
    );
    return new NextResponse(errorXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}
