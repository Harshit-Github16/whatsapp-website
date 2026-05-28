import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Business from '@/models/Business';

// Helper to slugify business name
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

// Fallback dictionary for common categories
const getLocalFallbacks = (name = "My Business", cat = "Local Business") => {
  const lowerCat = cat.toLowerCase();
  const bName = name || "Our business";

  if (lowerCat.includes("dent") || lowerCat.includes("medic") || lowerCat.includes("clin") || lowerCat.includes("doctor")) {
    return {
      about: `Welcome to ${bName}. We are dedicated to providing exceptional medical care and treatment in a warm, patient-first environment. Our state-of-the-art facility is equipped with modern diagnostic tools to ensure you and your family receive high-quality treatments customized exactly to your health goals.`,
      services: ["General Health Checkup", "Precision Diagnosis", "Specialist Consultation", "Emergency Medical Care", "Post-Treatment Support", "Preventative Care Plans"],
      theme: "medical"
    };
  }
  if (lowerCat.includes("gym") || lowerCat.includes("fit") || lowerCat.includes("work") || lowerCat.includes("trainer")) {
    return {
      about: `${bName} is your ultimate fitness and wellness destination. We offer premium training zones, advanced cardio/strength equipment, and customized fitness programs led by certified trainers. Join us to transform your health, build endurance, and conquer your personal lifestyle milestones.`,
      services: ["Personal Fitness Coaching", "Strength & Conditioning", "Cardio Workout Zone", "Group Aerobics & Yoga", "Nutrition & Diet Planning", "Locker Room & Shower Access"],
      theme: "gym"
    };
  }
  if (lowerCat.includes("cafe") || lowerCat.includes("rest") || lowerCat.includes("food") || lowerCat.includes("coff") || lowerCat.includes("bakery")) {
    return {
      about: `At ${bName}, we believe in creating exceptional culinary experiences. Our menu features premium, freshly prepared dishes and specialty beverages crafted by expert chefs. Come enjoy our cozy, aesthetic ambiance, friendly service, and locally sourced organic ingredients.`,
      services: ["Fine Dining Experience", "Specialty Coffee Bar", "Freshly Baked Desserts", "Quick Home Delivery", "Corporate Event Catering", "Custom Menu Bookings"],
      theme: "restaurant"
    };
  }
  if (lowerCat.includes("salon") || lowerCat.includes("spa") || lowerCat.includes("hair") || lowerCat.includes("beauty")) {
    return {
      about: `${bName} is a luxury beauty sanctuary dedicated to elevating your style and relaxation. From designer hair styling and coloring to nourishing skin facials and therapeutic massages, our certified beauticians treat you to a premium, renewing experience.`,
      services: ["Designer Haircuts & Styling", "Revitalizing Skin Facials", "Bridal & Party Makeovers", "Artistic Nail Spa & Extension", "Stress-Relief Massage Therapy", "Organic Skin Care Treatment"],
      theme: "salon"
    };
  }
  if (lowerCat.includes("realestate") || lowerCat.includes("property") || lowerCat.includes("house") || lowerCat.includes("realty") || lowerCat.includes("builder")) {
    return {
      about: `At ${bName}, we make property buying, selling, and leasing smooth and stress-free. Combining local market analysis, legal transaction transparency, and customized agent support, we ensure you find prime residential or commercial spaces suited to your requirements.`,
      services: ["Residential Home Sales", "Commercial Office Leasing", "Prime Land Plot Deals", "Market Valuation Analysis", "Legal Documentation Support", "Property Investment Consulting"],
      theme: "realestate"
    };
  }
  return {
    about: `Welcome to ${bName}. We specialize in delivering professional, reliable, and premium ${cat.toLowerCase()} services customized to your targets. Backed by industry expertise, our team is dedicated to offering exceptional value and unmatched support to help your operations succeed.`,
    services: ["Professional Consultation", "Tailored Support Services", "Quality Guarantee Audits", "24/7 Emergency Assistance", "Customer Training Sessions", "Annual Service Contracts"],
    theme: "medical"
  };
};

// Generate AI Copy using Groq
const generateAICopy = async (businessName, category) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return getLocalFallbacks(businessName, category);
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `You are an expert copywriting assistant for local business websites.
Your task is to generate high-converting, professional, and category-relevant copy for a business website.
The generated text must sound natural, professional, and deeply customized to the business name and category. Do not use generic placeholders.

Respond ONLY with a JSON object containing keys:
1. "about": A premium, highly appealing, 3-4 sentence description of the business, its history, expertise, and focus on customer satisfaction.
2. "services": An array of 6 key services/features/treatments offered by this specific business category.
3. "theme": Guess the best match styling theme from: "medical", "gym", "restaurant", "salon", "realestate".

Do not write any other markdown, markdown code block backticks, or text outside the JSON object.`
          },
          {
            role: "user",
            content: `Business Name: "${businessName}", Business Category: "${category}". Generate premium website about copy, services list, and best theme in JSON.`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      })
    });

    if (!response.ok) throw new Error("Groq API error");
    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    
    // Guess theme fallback if AI doesn't return allowed enum
    const local = getLocalFallbacks(businessName, category);
    const validThemes = ["medical", "gym", "restaurant", "salon", "realestate"];
    const chosenTheme = (parsed.theme && validThemes.includes(parsed.theme.toLowerCase())) 
      ? parsed.theme.toLowerCase() 
      : local.theme;

    return {
      about: parsed.about || local.about,
      services: parsed.services || local.services,
      theme: chosenTheme
    };
  } catch (err) {
    console.error("AI fetch failed, falling back:", err);
    return getLocalFallbacks(businessName, category);
  }
};

// Response helper to format TwiML response
const twimlResponse = (message) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${message}</Message>
</Response>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'text/xml' }
  });
};

export async function POST(request) {
  try {
    await connectDB();

    // Twilio sends data as application/x-www-form-urlencoded
    let fromPhone = '';
    let userText = '';

    try {
      const formData = await request.formData();
      fromPhone = formData.get('From');
      userText = formData.get('Body')?.toString().trim();
    } catch (e) {
      const rawText = await request.text();
      const params = new URLSearchParams(rawText);
      fromPhone = params.get('From');
      userText = params.get('Body')?.toString().trim();
    }

    if (!fromPhone || !userText) {
      return twimlResponse("Error: Missing parameters.");
    }

    // Extract clean phone number
    const phone = fromPhone.replace('whatsapp:', '');

    // Get host and protocol dynamically based on request headers
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'whatsapp-website-hazel.vercel.app';
    const protocol = request.headers.get('x-forwarded-proto') || 'https';

    // Search for existing business under onboarding
    let business = await Business.findOne({ phone });

    // 1. Initial State: No record found
    if (!business) {
      // Create new draft business
      const tempSlug = `temp-${Date.now()}`;
      business = new Business({
        slug: tempSlug,
        businessName: 'Temporary Business',
        phone: phone,
        category: 'Local Business',
        isPublished: false,
        paymentStatus: 'pending'
      });
      // Storing onboarding step in mongoose dynamically
      business.set('onboardingStep', 'OWNER_NAME');
      await business.save();

      return twimlResponse(`Hi! 👋 Welcome to *WhatsSite* website builder. Let's create a premium website for your business in 5 minutes!\n\nTo get started, please tell us:\n*What is your name?*`);
    }

    // Fetch step (default to OWNER_NAME if not set)
    const currentStep = business.get('onboardingStep') || 'OWNER_NAME';

    switch (currentStep) {
      case 'OWNER_NAME': {
        business.ownerName = userText;
        business.set('onboardingStep', 'BUSINESS_NAME');
        await business.save();

        return twimlResponse(`Thanks *${userText}*!\n\nNow, *what is the name of your Business?* (e.g. Sharma Dental Clinic)`);
      }

      case 'BUSINESS_NAME': {
        business.businessName = userText;

        // Generate clean unique slug
        let baseSlug = slugify(userText);
        let slug = baseSlug;
        let counter = 1;
        while (await Business.findOne({ slug })) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        business.slug = slug;

        business.set('onboardingStep', 'CATEGORY');
        await business.save();

        return twimlResponse(`Got it! 🏢 *${userText}*.\n\nNow, *what is your business category?* (e.g. Dental Clinic, Gym, Restaurant, Salon, Real Estate)`);
      }

      case 'CATEGORY': {
        business.category = userText;
        business.set('onboardingStep', 'AI_DECISION');
        await business.save();

        // Trigger AI content generation
        const aiData = await generateAICopy(business.businessName, userText);
        business.about = aiData.about;
        business.services = aiData.services;
        business.theme = aiData.theme;
        await business.save();

        return twimlResponse(`✨ Here is what our AI drafted for your website:\n\n*About Us:* ${aiData.about}\n\n*Key Services:* ${aiData.services.join(', ')}\n\nDo you want to accept these details? Reply with:\n*1* - Yes, use AI copy\n*2* - No, I want to write manually`);
      }

      case 'AI_DECISION': {
        const choice = userText.replace(/\*/g, '').trim();
        if (choice === '1' || choice.toLowerCase() === 'yes') {
          business.set('onboardingStep', 'EMAIL');
          await business.save();
          return twimlResponse(`Awesome! Let's proceed.\n\n*What is your business email address?* (Or reply *skip*)`);
        } else if (choice === '2' || choice.toLowerCase() === 'no') {
          business.set('onboardingStep', 'MANUAL_ABOUT');
          await business.save();
          return twimlResponse(`Alright! Please type a short description (3-4 sentences) about your business:`);
        } else {
          return twimlResponse(`Please select a valid option:\n*1* - Yes, use AI copy\n*2* - No, write manually`);
        }
      }

      case 'MANUAL_ABOUT': {
        business.about = userText;
        business.set('onboardingStep', 'MANUAL_SERVICES');
        await business.save();

        return twimlResponse(`Perfect! Now list your key services separated by commas (e.g. Service 1, Service 2, Service 3):`);
      }

      case 'MANUAL_SERVICES': {
        const servicesArray = userText.split(',').map(s => s.trim()).filter(Boolean);
        business.services = servicesArray;
        business.set('onboardingStep', 'EMAIL');
        await business.save();

        return twimlResponse(`Great! *What is your business email address?* (Or reply *skip*)`);
      }

      case 'EMAIL': {
        if (userText.toLowerCase() !== 'skip') {
          business.email = userText;
        }
        business.set('onboardingStep', 'ADDRESS');
        await business.save();

        return twimlResponse(`Got it. *What is your physical office or shop address?* (Or reply *skip*)`);
      }

      case 'ADDRESS': {
        if (userText.toLowerCase() !== 'skip') {
          business.address = userText;
        }
        business.set('onboardingStep', 'THEME');
        await business.save();

        return twimlResponse(`Almost there! Choose a layout theme for your website. Reply with one of these:\n- *medical*\n- *gym*\n- *restaurant*\n- *salon*\n- *realestate*`);
      }

      case 'THEME': {
        const selectedTheme = userText.toLowerCase().replace(/[\*\s]+/g, "");
        const validThemes = ["medical", "gym", "restaurant", "salon", "realestate"];
        
        if (validThemes.includes(selectedTheme)) {
          business.theme = selectedTheme;
          business.isPublished = true;
          business.paymentStatus = 'completed'; // auto-published free plan
          business.set('onboardingStep', 'COMPLETED');
          await business.save();

          const websiteUrl = `${protocol}://${host}/${business.slug}`;
          return twimlResponse(`🎉 *Congratulations!* Your professional website is now LIVE!\n\n🔗 *Link:* ${websiteUrl}\n\nYour customers can view it instantly! Type anything to get the options.`);
        } else {
          return twimlResponse(`Please choose a valid theme:\n- *medical*\n- *gym*\n- *restaurant*\n- *salon*\n- *realestate*`);
        }
      }

      case 'COMPLETED': {
        const websiteUrl = `${protocol}://${host}/${business.slug}`;
        return twimlResponse(`Your website is live at: ${websiteUrl} 🚀\n\nYou can edit it anytime from the web dashboard. Have a wonderful day!`);
      }

      default: {
        return twimlResponse("Welcome back! Type anything to get your website link.");
      }
    }

  } catch (error) {
    console.error("Error in whatsapp webhook handler:", error);
    return twimlResponse(`Oops! Error: ${error.message}\nStack: ${error.stack ? error.stack.substring(0, 120) : 'no stack'}`);
  }
}
