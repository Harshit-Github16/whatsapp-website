import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { businessName, category } = await request.json();

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    // Fallback dictionary for common categories
    const getLocalFallbacks = (name = "My Business", cat = "Local Business") => {
      const lowerCat = cat.toLowerCase();
      const bName = name || "Our business";

      if (lowerCat.includes("dent") || lowerCat.includes("medic") || lowerCat.includes("clin") || lowerCat.includes("doctor")) {
        return {
          about: `Welcome to ${bName}. We are dedicated to providing exceptional medical care and treatment in a warm, patient-first environment. Our state-of-the-art facility is equipped with modern diagnostic tools to ensure you and your family receive high-quality treatments customized exactly to your health goals.`,
          services: ["General Health Checkup", "Precision Diagnosis", "Specialist Consultation", "Emergency Medical Care", "Post-Treatment Support", "Preventative Care Plans"]
        };
      }
      if (lowerCat.includes("gym") || lowerCat.includes("fit") || lowerCat.includes("work") || lowerCat.includes("trainer")) {
        return {
          about: `${bName} is your ultimate fitness and wellness destination. We offer premium training zones, advanced cardio/strength equipment, and customized fitness programs led by certified trainers. Join us to transform your health, build endurance, and conquer your personal lifestyle milestones.`,
          services: ["Personal Fitness Coaching", "Strength & Conditioning", "Cardio Workout Zone", "Group Aerobics & Yoga", "Nutrition & Diet Planning", "Locker Room & Shower Access"]
        };
      }
      if (lowerCat.includes("cafe") || lowerCat.includes("rest") || lowerCat.includes("food") || lowerCat.includes("coff") || lowerCat.includes("bakery")) {
        return {
          about: `At ${bName}, we believe in creating exceptional culinary experiences. Our menu features premium, freshly prepared dishes and specialty beverages crafted by expert chefs. Come enjoy our cozy, aesthetic ambiance, friendly service, and locally sourced organic ingredients.`,
          services: ["Fine Dining Experience", "Specialty Coffee Bar", "Freshly Baked Desserts", "Quick Home Delivery", "Corporate Event Catering", "Custom Menu Bookings"]
        };
      }
      if (lowerCat.includes("salon") || lowerCat.includes("spa") || lowerCat.includes("hair") || lowerCat.includes("beauty")) {
        return {
          about: `${bName} is a luxury beauty sanctuary dedicated to elevating your style and relaxation. From designer hair styling and coloring to nourishing skin facials and therapeutic massages, our certified beauticians treat you to a premium, renewing experience.`,
          services: ["Designer Haircuts & Styling", "Revitalizing Skin Facials", "Bridal & Party Makeovers", "Artistic Nail Spa & Extension", "Stress-Relief Massage Therapy", "Organic Skin Care Treatment"]
        };
      }
      if (lowerCat.includes("realestate") || lowerCat.includes("property") || lowerCat.includes("house") || lowerCat.includes("realty") || lowerCat.includes("builder")) {
        return {
          about: `At ${bName}, we make property buying, selling, and leasing smooth and stress-free. Combining local market analysis, legal transaction transparency, and customized agent support, we ensure you find prime residential or commercial spaces suited to your requirements.`,
          services: ["Residential Home Sales", "Commercial Office Leasing", "Prime Land Plot Deals", "Market Valuation Analysis", "Legal Documentation Support", "Property Investment Consulting"]
        };
      }
      // Generic fallback
      return {
        about: `Welcome to ${bName}. We specialize in delivering professional, reliable, and premium ${cat.toLowerCase()} services customized to your targets. Backed by industry expertise, our team is dedicated to offering exceptional value and unmatched support to help your operations succeed.`,
        services: ["Professional Consultation", "Tailored Support Services", "Quality Guarantee Audits", "24/7 Emergency Assistance", "Customer Training Sessions", "Annual Service Contracts"]
      };
    };

    // If API key is not present, return local fallback instantly
    if (!apiKey) {
      console.log("GROQ_API_KEY not found in env, returning local template fallback.");
      return NextResponse.json(getLocalFallbacks(businessName, category));
    }

    // Call Groq Chat Completions API
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
              content: `You are a world-class copywriter and professional editor specializing in local business marketing and brand development.
Your task is to write exceptionally detailed, highly appealing, and category-relevant copy that immediately builds trust and conveys premium value.

The generated text must sound extremely natural, upscale, and deeply customized to the specific business category and name. Avoid all generic phrases.
Specifically, your copy must adhere to:
1. "about": Generate a detailed, high-fidelity brand story of 4-5 sentences. Include details about their commitment to excellence, state-of-the-art equipment or methodologies, customer-first service philosophy, and unique local expertise.
2. "services": An array of exactly 6 key premium services/solutions/treatments. Instead of generic single-word nouns, write descriptive, professional service titles that sound premium (e.g., "Advanced Root Canal Therapy with Digital Imaging" instead of "Root Canal", "Customized High-Intensity Strength Coaching" instead of "Gym", "Artisanal Hand-Roasted Specialty Coffees" instead of "Coffee").
3. "theme": Guess the best match styling theme from: "medical", "gym", "restaurant", "salon", "realestate".

Respond ONLY with a JSON object containing keys:
1. "about"
2. "services"
3. "theme"

Do not write any other markdown, markdown code block backticks, or text outside the JSON object.`
            },
            {
              role: "user",
              content: `Business Name: "${businessName || "My Business"}", Business Category: "${category}". Generate premium website about copy, services list, and best theme in JSON.`
            }
          ],
          response_format: {
            type: "json_object"
          },
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API returned status code ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);

      if (parsed.about && Array.isArray(parsed.services)) {
        return NextResponse.json({
          about: parsed.about,
          services: parsed.services,
          theme: parsed.theme || "medical"
        });
      } else {
        throw new Error("Invalid keys returned in JSON");
      }
    } catch (apiError) {
      console.error("Groq API Call failed, utilizing local fallback.", apiError);
      return NextResponse.json({
        ...getLocalFallbacks(businessName, category),
        theme: getLocalFallbacks(businessName, category).theme || "medical"
      });
    }
  } catch (error) {
    console.error("Error in generate route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
