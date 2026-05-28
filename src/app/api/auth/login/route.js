import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Business from '@/models/Business';

export async function POST(request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Clean phone number input (remove spaces, dashes, etc.)
    const cleanPhoneInput = phone.trim().replace(/[\s\-\(\)]+/g, '');

    await connectDB();

    // Fetch all businesses to do a loose comparison (ignoring +, 91, or 1 prefixes to be user-friendly)
    const businesses = await Business.find({});
    
    let matchedBusiness = null;
    for (const biz of businesses) {
      if (biz.phone) {
        const cleanDbPhone = biz.phone.replace(/[\s\-\(\)\+]+/g, '');
        // Compare suffix (last 10 digits or exact match)
        if (
          cleanDbPhone === cleanPhoneInput ||
          cleanDbPhone.endsWith(cleanPhoneInput) ||
          cleanPhoneInput.endsWith(cleanDbPhone)
        ) {
          matchedBusiness = biz;
          break;
        }
      }
    }

    if (!matchedBusiness) {
      return NextResponse.json(
        { error: 'No website found associated with this phone number.' },
        { status: 404 }
      );
    }

    // Set a session cookie
    const response = NextResponse.json(
      { message: 'Login successful', business: matchedBusiness },
      { status: 200 }
    );
    
    response.cookies.set('whatssite_phone', matchedBusiness.phone, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { error: 'Server error during login' },
      { status: 500 }
    );
  }
}
