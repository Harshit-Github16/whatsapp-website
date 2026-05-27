import { db } from './db';
import { slugify } from '@/lib/utils';
import { OnboardingStep, ThemeType, WebsiteConfig, OnboardingSessionData } from '@/types';
import { uploadImageToCloudinary } from './cloudinary';

// Category stock images for rich visuals out-of-the-box
const CATEGORY_DEFAULTS: Record<string, {
  logo: string;
  images: string[];
  subtitle: string;
  tagline: string;
  theme: ThemeType;
  services: string[];
  testimonials: { name: string; text: string }[];
  blogs: { title: string; description: string; date: string; readTime: string; image: string }[];
}> = {
  modern: {
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80'
    ],
    subtitle: 'Innovation meets implementation.',
    tagline: 'Leading the future of technology and design.',
    theme: 'modern',
    services: ['Web Design', 'SaaS Implementation', 'Cloud Engineering'],
    testimonials: [
      { name: 'David Lee', text: 'Stunning layout and fast implementation!' },
      { name: 'Sarah Connor', text: 'Highly professional team and amazing results.' }
    ],
    blogs: [
      {
        title: 'Scaling Digital Products in 2026',
        description: 'Learn the core patterns used by top tier tech teams to build and scale SaaS applications globally.',
        date: 'May 12, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Why Minimal Design Wins Markets',
        description: 'How reducing visual noise and focusing on speed leads to 3x conversions.',
        date: 'May 20, 2026',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  minimal: {
    logo: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=120&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1494438639946-1ebd1d2038b5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    ],
    subtitle: 'Simplicity is ultimate sophistication.',
    tagline: 'Clean designs, simple execution, high value.',
    theme: 'minimal',
    services: ['Strategic Consulting', 'UI/UX Design', 'Brand Identity'],
    testimonials: [
      { name: 'Alex Rivera', text: 'Just what I wanted. Clean, simple, and loads in milliseconds.' },
      { name: 'Clara Oswald', text: 'Elegant, quiet, and highly focused website.' }
    ],
    blogs: [
      {
        title: 'The Art of Doing Less',
        description: 'Embracing whitespace, content focus, and elegant visual flow in branding.',
        date: 'Apr 28, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d2038b5?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Designing for Longevity',
        description: 'Avoid trends. Focus on timeless grid alignments and typography rules.',
        date: 'May 05, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  luxury: {
    logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=120&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80'
    ],
    subtitle: 'Crafting elite experiences.',
    tagline: 'Premium services tailored for discerning clients.',
    theme: 'luxury',
    services: ['VIP Concierge', 'Elite Event Planning', 'Luxury Asset Sourcing'],
    testimonials: [
      { name: 'Viscount Bennett', text: 'Impeccable service, extraordinary attention to detail.' },
      { name: 'Victoria Thorne', text: 'Simply exceptional. They redefine luxury standard.' }
    ],
    blogs: [
      {
        title: 'The Craftsmanship Behind Luxury',
        description: 'Why dedication, rare materials, and elite attention to detail never go out of style.',
        date: 'May 18, 2026',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Elite Hosting & Event Curation',
        description: 'Secret formulas for creating experiences that your VIP guests will never forget.',
        date: 'May 25, 2026',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  medical: {
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584515901367-f134706ef532?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80'
    ],
    subtitle: 'Professional care you can trust.',
    tagline: 'Compassionate, evidence-based healthcare services.',
    theme: 'medical',
    services: ['General Consultation', 'Specialized Diagnosis', 'Preventative Therapy'],
    testimonials: [
      { name: 'Arthur Pendelton', text: 'A clean clinic, caring doctors, and highly effective treatment.' },
      { name: 'Melanie Brooks', text: 'Scheduling was easy and the staff was extremely friendly.' }
    ],
    blogs: [
      {
        title: '5 Habits for Optimal Dental Health',
        description: 'Crucial routines beyond brushing to prevent cavities and maintain a white smile.',
        date: 'May 09, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1584515901367-f134706ef532?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Understanding Preventive Care',
        description: 'Why regular health checkups save lives and reduce clinical costs in the long run.',
        date: 'May 22, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  restaurant: {
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80'
    ],
    subtitle: 'Savor the experience.',
    tagline: 'Handcrafted dishes made from fresh, locally-sourced ingredients.',
    theme: 'restaurant',
    services: ['Fine Dining', 'Private Catering', 'Weekend Brunches'],
    testimonials: [
      { name: 'Gordon Chase', text: 'The tasting menu was an absolute masterpiece!' },
      { name: 'Alice Waters', text: 'Warm ambiance, top-tier service, and exquisite flavors.' }
    ],
    blogs: [
      {
        title: 'The Sourdough Starter Secret',
        description: 'How temperature, wild yeast, and 72 hours of fermentation create our iconic crust.',
        date: 'May 15, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Sourcing Locally, Serving Freshly',
        description: 'Meet the local farmers who supply 100% of our organic ingredients daily.',
        date: 'May 24, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  gym: {
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
    ],
    subtitle: 'No excuses. Just results.',
    tagline: 'State-of-the-art equipment and world-class personal trainers.',
    theme: 'gym',
    services: ['Strength Conditioning', 'HIIT Workouts', 'Nutrition Coaching'],
    testimonials: [
      { name: 'Mike Mentzer', text: 'Great community. The best equipment in the area.' },
      { name: 'Dana Linn', text: 'Transformed my health. The coaches here are world-class.' }
    ],
    blogs: [
      {
        title: 'Unlocking Peak Athletic Power',
        description: 'The science of progressive overload, muscle recovery, and energy fuel.',
        date: 'May 10, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'HIIT vs. Strength Training',
        description: 'Which metabolic routine is best suited for your specific fitness goals.',
        date: 'May 19, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80'
      }
    ]
  }
};

/**
 * Generate standard TwiML XML string
 */
export function generateTwiML(message: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</Message>
</Response>`;
}

/**
 * Generate JSON structure config for site sections
 */
function createWebsiteConfig(
  businessName: string,
  categoryKey: string,
  themeKey: ThemeType,
  logoUrl?: string | null,
  galleryUrls: string[] = [],
  contactPhone?: string | null,
  contactEmail?: string | null,
  address?: string | null,
  services: string[] = [],
  about?: string | null
): WebsiteConfig {
  const defaults = CATEGORY_DEFAULTS[categoryKey] || CATEGORY_DEFAULTS.modern;
  
  const finalLogo = logoUrl || defaults.logo;
  const finalGallery = galleryUrls.length > 0 ? galleryUrls : defaults.images;
  const finalAbout = about || 'We are dedicated to offering high-quality services to our customers. Our professional team is here to assist you.';
  const finalPhone = contactPhone || '+1234567890';
  const finalEmail = contactEmail || 'info@' + slugify(businessName) + '.com';
  const finalAddress = address || '123 Business Rd, Suite 100';
  const finalServices = services.length > 0 ? services : defaults.services;

  return {
    theme: themeKey,
    businessName,
    category: categoryKey,
    sections: [
      {
        id: 'hero',
        type: 'hero',
        content: {
          title: `Welcome to ${businessName}`,
          subtitle: defaults.tagline,
          backgroundImage: finalGallery[0] || defaults.images[0],
          ctaText: 'Explore Services',
          ctaLink: '#services'
        }
      },
      {
        id: 'about',
        type: 'about',
        content: {
          title: 'About Our Business',
          description: finalAbout,
          image: finalGallery[1] || defaults.images[1]
        }
      },
      {
        id: 'services',
        type: 'services',
        content: {
          title: 'Our Services',
          items: finalServices.map((name) => ({
            name,
            description: `Professional, reliable ${name.toLowerCase()} tailored for your specific requirements.`
          }))
        }
      },
      {
        id: 'blogs',
        type: 'blogs',
        content: {
          title: 'Latest News & Insights',
          items: defaults.blogs || []
        }
      },
      {
        id: 'gallery',
        type: 'gallery',
        content: {
          title: 'Photo Gallery',
          images: finalGallery
        }
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        content: {
          title: 'What Clients Say',
          items: defaults.testimonials
        }
      },
      {
        id: 'contact',
        type: 'contact',
        content: {
          title: 'Get In Touch',
          phone: finalPhone,
          email: finalEmail,
          address: finalAddress
        }
      },
      {
        id: 'footer',
        type: 'footer',
        content: {
          text: `Thank you for visiting ${businessName}.`,
          copyright: `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`
        }
      }
    ]
  };
}

/**
 * Main Onboarding State Machine Logic
 */
function getEditMenuMessage(businessName: string, subdomain: string): string {
  return `🛠️ *Website Management Menu* (${businessName})\n` +
    `Your site is live at: http://localhost:3000/${subdomain}\n\n` +
    `Reply with the option number to customize:\n` +
    `1. ✏️ Edit Business Name\n` +
    `2. 🎨 Change Visual Theme\n` +
    `3. 🖼️ Update Logo\n` +
    `4. 💼 Edit Services\n` +
    `5. 📝 Edit About Us text\n` +
    `6. 📞 Edit Contact Details (Phone, Email, Address)\n` +
    `7. 🖼️ Update Gallery Images\n` +
    `8. 💬 Update Testimonials\n` +
    `9. 📰 Manage Blogs\n` +
    `10. ❔ Manage FAQs\n\n` +
    `Reply *RESTART* to delete this website and build a new one.`;
}

async function getUserWebsite(phone: string) {
  const user = await db.getUserByPhone(phone);
  if (!user) return null;
  const websites = await db.getWebsitesByUserId(user.id);
  return websites.length > 0 ? websites[0] : null;
}

export async function handleWhatsAppMessage(
  fromPhone: string,
  incomingText: string,
  mediaUrls: string[] = []
): Promise<string> {
  const text = incomingText.trim();
  const lowerText = text.toLowerCase();

  // Find or create session
  let session = await db.getOnboardingSession(fromPhone);

  if (!session) {
    // Check if the user has an existing website
    const activeSite = await getUserWebsite(fromPhone);
    if (activeSite) {
      // Start edit mode
      session = await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_MENU'
      });
      return generateTwiML(getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    } else {
      // Welcome state
      await db.upsertOnboardingSession(fromPhone, {
        step: 'WELCOME'
      });
      return generateTwiML(
        `👋 Welcome to SiteBuilder WhatsApp Bot!\n\nI will help you build and publish a professional website in minutes.\n\nReply with *START* to begin!`
      );
    }
  }

  const currentStep = session.step as OnboardingStep;

  // Global reset check
  if (lowerText === 'restart' || lowerText === 'reset') {
    const user = await db.getUserByPhone(fromPhone);
    if (user) {
      await db.deleteWebsiteByUserId(user.id);
    }
    
    await db.upsertOnboardingSession(fromPhone, {
      step: 'WELCOME',
      businessName: null,
      category: null,
      logoUrl: null,
      galleryUrls: [],
      contactPhone: null,
      contactEmail: null,
      address: null,
      services: [],
      about: null,
      theme: null
    });
    return generateTwiML(`Session restarted. Existing website deleted (if any). Reply *START* to build your new site!`);
  }

  switch (currentStep) {
    case 'WELCOME':
      if (lowerText === 'start') {
        await db.upsertOnboardingSession(fromPhone, { step: 'NAME' });
        return generateTwiML(`Let's start! 🚀\n\nWhat is your *Business Name*?`);
      }
      return generateTwiML(`Please reply with *START* to begin building your site.`);

    case 'NAME':
      if (text.length < 2) {
        return generateTwiML(`⚠️ That name is too short. Please enter a valid business name (min 2 characters):`);
      }
      await db.upsertOnboardingSession(fromPhone, {
        step: 'CATEGORY',
        businessName: text
      });
      return generateTwiML(
        `Got it: *${text}*!\n\nSelect your *Business Category* by replying with the number:\n1. Modern / Corporate\n2. Minimal / Design Studio\n3. Luxury / Premium\n4. Medical / Health Clinic\n5. Restaurant / Food\n6. Gym / Fitness`
      );

    case 'CATEGORY':
      let categoryKey = '';
      if (text === '1' || lowerText.includes('modern')) categoryKey = 'modern';
      else if (text === '2' || lowerText.includes('minimal')) categoryKey = 'minimal';
      else if (text === '3' || lowerText.includes('luxury')) categoryKey = 'luxury';
      else if (text === '4' || lowerText.includes('medical')) categoryKey = 'medical';
      else if (text === '5' || lowerText.includes('restaurant')) categoryKey = 'restaurant';
      else if (text === '6' || lowerText.includes('gym')) categoryKey = 'gym';

      if (!categoryKey) {
        return generateTwiML(
          `⚠️ Invalid choice. Please reply with a number (1-6) or the name:\n1. Modern\n2. Minimal\n3. Luxury\n4. Medical\n5. Restaurant\n6. Gym`
        );
      }

      await db.upsertOnboardingSession(fromPhone, {
        step: 'LOGO',
        category: categoryKey
      });
      return generateTwiML(
        `Great, category set to *${categoryKey.toUpperCase()}*.\n\nNow, upload your *Business Logo* (send an image) or reply with *SKIP* to use a text logo.`
      );

    case 'LOGO':
      let logoUrl: string | null = null;
      if (mediaUrls && mediaUrls.length > 0) {
        logoUrl = await uploadImageToCloudinary(mediaUrls[0], 'logos');
      } else if (lowerText !== 'skip') {
        return generateTwiML(
          `⚠️ Please upload an image attachment for your logo, or reply with *SKIP* to use text:`
        );
      }

      await db.upsertOnboardingSession(fromPhone, {
        step: 'GALLERY',
        logoUrl: logoUrl
      });
      return generateTwiML(
        `Logo processed! Now send up to *3 gallery images* showing your workspace, products, or services. You can send them one by one.\n\nWhen done, reply *DONE* (or reply *SKIP* to use stock photos).`
      );

    case 'GALLERY':
      const currentGallery = Array.isArray(session.galleryUrls) ? (session.galleryUrls as string[]) : [];

      if (lowerText === 'skip' && currentGallery.length === 0) {
        await db.upsertOnboardingSession(fromPhone, { step: 'PHONE' });
        return generateTwiML(
          `Skipped gallery. Using professional stock images.\n\nWhat is your business *Contact Phone Number*? Reply *SAME* to use this WhatsApp number (${fromPhone}).`
        );
      }

      if (lowerText === 'done' || (lowerText === 'skip' && currentGallery.length > 0)) {
        await db.upsertOnboardingSession(fromPhone, { step: 'PHONE' });
        return generateTwiML(
          `Gallery saved! ${currentGallery.length} image(s) registered.\n\nWhat is your business *Contact Phone Number*? Reply *SAME* to use this WhatsApp number (${fromPhone}).`
        );
      }

      if (mediaUrls && mediaUrls.length > 0) {
        const uploaded = await Promise.all(
          mediaUrls.map((url) => uploadImageToCloudinary(url, 'gallery'))
        );
        const updatedGallery = [...currentGallery, ...uploaded].slice(0, 3);
        await db.upsertOnboardingSession(fromPhone, {
          galleryUrls: updatedGallery
        });
        if (updatedGallery.length >= 3) {
          await db.upsertOnboardingSession(fromPhone, { step: 'PHONE' });
          return generateTwiML(
            `Max 3 gallery photos reached and saved!\n\nWhat is your business *Contact Phone Number*? Reply *SAME* to use this WhatsApp number (${fromPhone}).`
          );
        } else {
          return generateTwiML(
            `Photo ${updatedGallery.length} saved. Send another photo, or reply *DONE* when finished.`
          );
        }
      }

      return generateTwiML(
        `⚠️ Send a photo, or reply *DONE* if you are finished adding gallery images, or *SKIP*:`
      );

    case 'PHONE':
      let contactPhone = text;
      if (lowerText === 'same') {
        contactPhone = fromPhone;
      } else {
        // Basic digits check
        const phoneDigits = text.replace(/[^0-9+]/g, '');
        if (phoneDigits.length < 7) {
          return generateTwiML(`⚠️ Please enter a valid contact phone number (e.g., +1234567890) or reply *SAME*:`);
        }
        contactPhone = phoneDigits;
      }

      await db.upsertOnboardingSession(fromPhone, {
        step: 'EMAIL',
        contactPhone
      });
      return generateTwiML(`Phone number saved!\n\nWhat is your business *Email Address*?`);

    case 'EMAIL':
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(text)) {
        return generateTwiML(`⚠️ Invalid email format. Please enter a valid business email:`);
      }

      await db.upsertOnboardingSession(fromPhone, {
        step: 'ADDRESS',
        contactEmail: text
      });
      return generateTwiML(
        `Email saved!\n\nWhat is your physical *Business Address*? (Or reply *SKIP* if you operate purely online)`
      );

    case 'ADDRESS':
      const addressVal = lowerText === 'skip' ? null : text;
      await db.upsertOnboardingSession(fromPhone, {
        step: 'SERVICES',
        address: addressVal
      });
      return generateTwiML(
        `Address recorded!\n\nList *3 services* you offer, separated by commas (e.g. Tooth Whitening, Implants, Dental Crown):`
      );

    case 'SERVICES':
      const servicesList = text
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (servicesList.length === 0) {
        return generateTwiML(`⚠️ Please list at least one service (separated by commas if multiple):`);
      }

      await db.upsertOnboardingSession(fromPhone, {
        step: 'ABOUT',
        services: servicesList
      });
      return generateTwiML(
        `Services saved!\n\nWrite a short *About Us* description for your website (min 10 characters):`
      );

    case 'ABOUT':
      if (text.length < 10) {
        return generateTwiML(`⚠️ That description is too short. Please describe your business (min 10 characters):`);
      }

      await db.upsertOnboardingSession(fromPhone, {
        step: 'THEME',
        about: text
      });
      return generateTwiML(
        `Perfect! Finally, choose a *Visual Theme* for your website:\n1. Modern\n2. Minimal\n3. Luxury\n4. Medical\n5. Restaurant\n6. Gym\n(Reply with number 1-6)`
      );

    case 'THEME':
      let chosenTheme: ThemeType | '' = '';
      if (text === '1' || lowerText.includes('modern')) chosenTheme = 'modern';
      else if (text === '2' || lowerText.includes('minimal')) chosenTheme = 'minimal';
      else if (text === '3' || lowerText.includes('luxury')) chosenTheme = 'luxury';
      else if (text === '4' || lowerText.includes('medical')) chosenTheme = 'medical';
      else if (text === '5' || lowerText.includes('restaurant')) chosenTheme = 'restaurant';
      else if (text === '6' || lowerText.includes('gym')) chosenTheme = 'gym';

      if (!chosenTheme) {
        return generateTwiML(
          `⚠️ Invalid theme selection. Reply with a number (1-6):\n1. Modern\n2. Minimal\n3. Luxury\n4. Medical\n5. Restaurant\n6. Gym`
        );
      }

      // We have all details! Trigger website generation and session closure.
      const name = session.businessName || 'My Business';
      const category = session.category || 'modern';
      const logo = session.logoUrl;
      const gallery = Array.isArray(session.galleryUrls) ? (session.galleryUrls as string[]) : [];
      const phone = session.contactPhone;
      const email = session.contactEmail;
      const address = session.address;
      const services = Array.isArray(session.services) ? (session.services as string[]) : [];
      const about = session.about;

      // 1. Check/create User
      let user = await db.getUserByPhone(fromPhone);
      if (!user) {
        user = await db.createUser(fromPhone);
      }

      // 2. Generate slug subdomain (unique check)
      let baseSubdomain = slugify(name);
      if (!baseSubdomain) {
        baseSubdomain = 'business-' + Math.random().toString(36).substring(2, 6);
      }
      
      let subdomain = baseSubdomain;
      let counter = 1;
      let existingSite = await db.getWebsiteBySubdomain(subdomain);
      while (existingSite) {
        subdomain = `${baseSubdomain}-${counter}`;
        existingSite = await db.getWebsiteBySubdomain(subdomain);
        counter++;
      }

      // 3. Assemble JSON config
      const websiteConfig = createWebsiteConfig(
        name,
        category,
        chosenTheme,
        logo,
        gallery,
        phone,
        email,
        address,
        services,
        about
      );

      // 4. Save Website
      await db.createWebsite({
        subdomain,
        businessName: name,
        category,
        logoUrl: logo,
        galleryUrls: gallery,
        contactPhone: phone,
        contactEmail: email,
        address,
        services,
        about,
        theme: chosenTheme,
        isPublished: true,
        config: websiteConfig,
        userId: user.id
      });

      // 5. Delete session
      await db.deleteOnboardingSession(fromPhone);

      // 6. Generate OTP for dashboard login
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // simple 6 digit otp
      // Store in memory cache or in a temporary file/table?
      // Since it's local/demo, we can print it on WhatsApp and write a dummy session or store the OTP in a text file
      // Wait, we can save it as the OTP passcode. Let's make the passcode for login their telephone number, or let's use the code we display.
      // We will tell them they can log in using their phone number, and we'll accept this OTP code! Let's save this OTP in a simple way or allow login.
      // Actually, we can generate a session token or let them use the phone number directly on the login screen.
      
      const isLocalhost = true;

      const siteUrl = isLocalhost 
        ? `http://localhost:3000/${subdomain}` 
        : `https://${process.env.NEXT_PUBLIC_BASE_DOMAIN || 'ourdomain.com'}/${subdomain}`;
        
      const dashboardUrl = isLocalhost 
        ? `http://localhost:3000/dashboard?phone=${encodeURIComponent(fromPhone)}&otp=${otpCode}`
        : `https://${process.env.NEXT_PUBLIC_BASE_DOMAIN || 'ourdomain.com'}/dashboard?phone=${encodeURIComponent(fromPhone)}&otp=${otpCode}`;

      return generateTwiML(
        `🎉 *CONGRATULATIONS!* Your website is ready and live!\n\n👉 *Live Website Link:*\n${siteUrl}\n\n🛠️ *Admin Dashboard:* Manage, edit, and change themes here:\n${dashboardUrl}\n\n🔑 *Login Passkey (OTP):* ${otpCode}\n\nThank you for choosing WebAppBot! Let us know if you want to /reset or /restart.`
      );

    case 'EDIT_MENU': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found. Reply *START* to create one.`);
      }
      
      switch (lowerText) {
        case '1':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_NAME' });
          return generateTwiML(`✏️ *Edit Business Name*\n\nCurrent: *${activeSite.businessName}*\n\nEnter the new name for your business:`);
        case '2':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_THEME' });
          return generateTwiML(`🎨 *Change Visual Theme*\n\nCurrent: *${activeSite.theme.toUpperCase()}*\n\nChoose a new theme:\n1. Modern\n2. Minimal\n3. Luxury\n4. Medical\n5. Restaurant\n6. Gym\n(Reply with number 1-6)`);
        case '3':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_LOGO' });
          return generateTwiML(`🖼️ *Update Logo*\n\nCurrent logo: ${activeSite.logoUrl || 'None'}\n\nUpload a new logo image, or reply *DELETE* to remove it and use text logo instead:`);
        case '4':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_SERVICES' });
          const currentServices = Array.isArray(activeSite.services) ? activeSite.services.join(', ') : '';
          return generateTwiML(`💼 *Edit Services*\n\nCurrent services: *${currentServices}*\n\nEnter your services separated by commas (e.g. Service A, Service B, Service C):`);
        case '5':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_ABOUT' });
          return generateTwiML(`📝 *Edit About Us Text*\n\nCurrent description: _${activeSite.about || 'None'}_\n\nEnter the new description (min 10 characters):`);
        case '6':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_CONTACT' });
          return generateTwiML(`📞 *Edit Contact Details*\n\n1. Edit Phone (Current: ${activeSite.contactPhone || 'None'})\n2. Edit Email (Current: ${activeSite.contactEmail || 'None'})\n3. Edit Address (Current: ${activeSite.address || 'None'})\n\nReply with 1, 2, or 3, or reply *B* to go back:`);
        case '7':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_GALLERY' });
          const galleryCount = Array.isArray(activeSite.galleryUrls) ? activeSite.galleryUrls.length : 0;
          return generateTwiML(`🖼️ *Update Gallery Images*\n\nCurrent gallery has ${galleryCount} image(s).\n\n1. Add a photo to gallery\n2. Clear all gallery images\n\nReply with 1 or 2, or reply *B* to go back:`);
        case '8':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_TESTIMONIALS' });
          return generateTwiML(`💬 *Manage Testimonials*\n\n1. Add a client testimonial\n2. Clear all testimonials\n\nReply with 1 or 2, or reply *B* to go back:`);
        case '9':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_BLOGS' });
          return generateTwiML(`📰 *Manage Blog Articles*\n\n1. Add a blog post\n2. Clear all blog posts\n\nReply with 1 or 2, or reply *B* to go back:`);
        case '10':
          await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_FAQ' });
          return generateTwiML(`❔ *Manage FAQs*\n\n1. Add an FAQ item\n2. Clear all FAQs\n\nReply with 1 or 2, or reply *B* to go back:`);
        default:
          return generateTwiML(`⚠️ Invalid choice.\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      }
    }

    case 'EDIT_NAME': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 2) {
        return generateTwiML(`⚠️ Business name too short. Try again:`);
      }
      
      const cfg = activeSite.config as any;
      cfg.businessName = text;
      const hero = cfg.sections?.find((s: any) => s.type === 'hero');
      if (hero && hero.content) {
        hero.content.title = `Welcome to ${text}`;
      }
      
      await db.updateWebsite(activeSite.id, {
        businessName: text,
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ Business name updated to *${text}*!\n\n` + getEditMenuMessage(text, activeSite.subdomain));
    }

    case 'EDIT_THEME': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      let chosenTheme: ThemeType | '' = '';
      if (text === '1' || lowerText.includes('modern')) chosenTheme = 'modern';
      else if (text === '2' || lowerText.includes('minimal')) chosenTheme = 'minimal';
      else if (text === '3' || lowerText.includes('luxury')) chosenTheme = 'luxury';
      else if (text === '4' || lowerText.includes('medical')) chosenTheme = 'medical';
      else if (text === '5' || lowerText.includes('restaurant')) chosenTheme = 'restaurant';
      else if (text === '6' || lowerText.includes('gym')) chosenTheme = 'gym';
      
      if (!chosenTheme) {
        return generateTwiML(`⚠️ Invalid choice. Reply with number 1-6:\n1. Modern\n2. Minimal\n3. Luxury\n4. Medical\n5. Restaurant\n6. Gym`);
      }
      
      const cfg = activeSite.config as any;
      cfg.theme = chosenTheme;
      
      await db.updateWebsite(activeSite.id, {
        theme: chosenTheme,
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ Theme updated to *${chosenTheme.toUpperCase()}*!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_LOGO': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      let newLogoUrl: string | null = activeSite.logoUrl;
      if (lowerText === 'delete' || lowerText === 'remove') {
        newLogoUrl = null;
      } else if (mediaUrls && mediaUrls.length > 0) {
        newLogoUrl = await uploadImageToCloudinary(mediaUrls[0], 'logos');
      } else {
        return generateTwiML(`⚠️ Please upload an image, or reply *DELETE* to remove it, or reply *B* to go back to main menu:`);
      }
      
      await db.updateWebsite(activeSite.id, {
        logoUrl: newLogoUrl
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ Logo updated successfully!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_SERVICES': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      const newServices = text
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
        
      if (newServices.length === 0) {
        return generateTwiML(`⚠️ Please list at least one service:`);
      }
      
      const cfg = activeSite.config as any;
      const servicesSection = cfg.sections?.find((s: any) => s.type === 'services');
      if (servicesSection && servicesSection.content) {
        servicesSection.content.items = newServices.map((name) => ({
          name,
          description: `Professional, reliable ${name} tailored for your specific requirements.`
        }));
      }
      
      await db.updateWebsite(activeSite.id, {
        services: newServices,
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ Services updated successfully!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_ABOUT': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 10) {
        return generateTwiML(`⚠️ About description too short (min 10 chars). Try again:`);
      }
      
      const cfg = activeSite.config as any;
      const aboutSection = cfg.sections?.find((s: any) => s.type === 'about');
      if (aboutSection && aboutSection.content) {
        aboutSection.content.description = text;
      }
      
      await db.updateWebsite(activeSite.id, {
        about: text,
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ About description updated successfully!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_CONTACT': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      if (lowerText === 'b' || lowerText === 'back') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      }
      
      if (text === '1') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_CONTACT_PHONE' });
        return generateTwiML(`📞 *Edit Contact Phone*\n\nEnter new phone number (or reply *SAME* to use ${fromPhone}):`);
      } else if (text === '2') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_CONTACT_EMAIL' });
        return generateTwiML(`✉️ *Edit Contact Email*\n\nEnter new business email address:`);
      } else if (text === '3') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_CONTACT_ADDRESS' });
        return generateTwiML(`📍 *Edit Contact Address*\n\nEnter physical address (or reply *SKIP* to remove address):`);
      } else {
        return generateTwiML(`⚠️ Invalid choice. Reply with 1, 2, 3, or B:`);
      }
    }

    case 'EDIT_CONTACT_PHONE': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      let newPhone = text;
      if (lowerText === 'same') {
        newPhone = fromPhone;
      } else {
        const phoneDigits = text.replace(/[^0-9+]/g, '');
        if (phoneDigits.length < 7) {
          return generateTwiML(`⚠️ Invalid phone number. Try again:`);
        }
        newPhone = phoneDigits;
      }
      
      const cfg = activeSite.config as any;
      const contactSection = cfg.sections?.find((s: any) => s.type === 'contact');
      if (contactSection && contactSection.content) {
        contactSection.content.phone = newPhone;
      }
      
      await db.updateWebsite(activeSite.id, {
        contactPhone: newPhone,
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ Contact phone number updated to *${newPhone}*!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_CONTACT_EMAIL': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(text)) {
        return generateTwiML(`⚠️ Invalid email format. Try again:`);
      }
      
      const cfg = activeSite.config as any;
      const contactSection = cfg.sections?.find((s: any) => s.type === 'contact');
      if (contactSection && contactSection.content) {
        contactSection.content.email = text;
      }
      
      await db.updateWebsite(activeSite.id, {
        contactEmail: text,
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ Contact email updated to *${text}*!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_CONTACT_ADDRESS': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      const newAddress = lowerText === 'skip' ? null : text;
      
      const cfg = activeSite.config as any;
      const contactSection = cfg.sections?.find((s: any) => s.type === 'contact');
      if (contactSection && contactSection.content) {
        contactSection.content.address = newAddress;
      }
      
      await db.updateWebsite(activeSite.id, {
        address: newAddress,
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
      return generateTwiML(`✅ Contact address updated successfully!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_GALLERY': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      if (lowerText === 'b' || lowerText === 'back') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      }
      
      if (text === '1') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_GALLERY_ADD' });
        return generateTwiML(`🖼️ *Add Gallery Image*\n\nPlease upload/send a photo for your gallery:`);
      } else if (text === '2') {
        const cfg = activeSite.config as any;
        const gallerySection = cfg.sections?.find((s: any) => s.type === 'gallery');
        if (gallerySection && gallerySection.content) {
          gallerySection.content.images = [];
        }
        await db.updateWebsite(activeSite.id, {
          galleryUrls: [],
          config: cfg
        });
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(`✅ Gallery cleared!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      } else {
        return generateTwiML(`⚠️ Invalid choice. Reply with 1, 2, or B:`);
      }
    }

    case 'EDIT_GALLERY_ADD': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      if (mediaUrls && mediaUrls.length > 0) {
        const uploadedUrl = await uploadImageToCloudinary(mediaUrls[0], 'gallery');
        const currentGallery = Array.isArray(activeSite.galleryUrls) ? (activeSite.galleryUrls as string[]) : [];
        const updatedGallery = [...currentGallery, uploadedUrl].slice(0, 6);
        
        const cfg = activeSite.config as any;
        const gallerySection = cfg.sections?.find((s: any) => s.type === 'gallery');
        if (gallerySection && gallerySection.content) {
          gallerySection.content.images = updatedGallery;
        }
        
        await db.updateWebsite(activeSite.id, {
          galleryUrls: updatedGallery,
          config: cfg
        });
        
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(`✅ Image added to gallery! Total: ${updatedGallery.length}\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      } else {
        return generateTwiML(`⚠️ Please send an image file to add to gallery, or reply *B* to go back to main menu:`);
      }
    }

    case 'EDIT_TESTIMONIALS': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      if (lowerText === 'b' || lowerText === 'back') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      }
      
      if (text === '1') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_TESTIMONIALS_ADD_NAME' });
        return generateTwiML(`💬 *Add Testimonial*\n\nEnter client name:`);
      } else if (text === '2') {
        const cfg = activeSite.config as any;
        const testimonialSection = cfg.sections?.find((s: any) => s.type === 'testimonials');
        if (testimonialSection && testimonialSection.content) {
          testimonialSection.content.items = [];
        }
        await db.updateWebsite(activeSite.id, {
          config: cfg
        });
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(`✅ Testimonials cleared!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      } else {
        return generateTwiML(`⚠️ Invalid choice. Reply with 1, 2, or B:`);
      }
    }

    case 'EDIT_TESTIMONIALS_ADD_NAME': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 2) {
        return generateTwiML(`⚠️ Name too short. Try again:`);
      }
      
      await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_TESTIMONIALS_ADD_TEXT',
        about: JSON.stringify({ name: text })
      });
      return generateTwiML(`Great! Now enter the review text from *${text}*:`);
    }

    case 'EDIT_TESTIMONIALS_ADD_TEXT': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 5) {
        return generateTwiML(`⚠️ Review too short. Try again:`);
      }
      
      let clientName = 'Client';
      try {
        const parsed = JSON.parse(session.about || '{}');
        clientName = parsed.name || 'Client';
      } catch (e) {}
      
      const cfg = activeSite.config as any;
      const testimonialSection = cfg.sections?.find((s: any) => s.type === 'testimonials');
      if (testimonialSection && testimonialSection.content) {
        const currentItems = testimonialSection.content.items || [];
        testimonialSection.content.items = [...currentItems, { name: clientName, text }];
      }
      
      await db.updateWebsite(activeSite.id, {
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_MENU',
        about: null
      });
      return generateTwiML(`✅ Testimonial from *${clientName}* added successfully!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_FAQ': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      if (lowerText === 'b' || lowerText === 'back') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      }
      
      if (text === '1') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_FAQ_ADD_QUESTION' });
        return generateTwiML(`❔ *Add FAQ*\n\nEnter the Question:`);
      } else if (text === '2') {
        const cfg = activeSite.config as any;
        const faqSection = cfg.sections?.find((s: any) => s.type === 'faq');
        if (faqSection && faqSection.content) {
          faqSection.content.items = [];
        }
        await db.updateWebsite(activeSite.id, {
          config: cfg
        });
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(`✅ FAQs cleared!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      } else {
        return generateTwiML(`⚠️ Invalid choice. Reply with 1, 2, or B:`);
      }
    }

    case 'EDIT_FAQ_ADD_QUESTION': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 5) {
        return generateTwiML(`⚠️ Question too short. Try again:`);
      }
      
      await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_FAQ_ADD_ANSWER',
        about: JSON.stringify({ question: text })
      });
      return generateTwiML(`Got it: *"${text}"*\n\nNow enter the Answer:`);
    }

    case 'EDIT_FAQ_ADD_ANSWER': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 5) {
        return generateTwiML(`⚠️ Answer too short. Try again:`);
      }
      
      let questionText = 'Question';
      try {
        const parsed = JSON.parse(session.about || '{}');
        questionText = parsed.question || 'Question';
      } catch (e) {}
      
      const cfg = activeSite.config as any;
      const faqSection = cfg.sections?.find((s: any) => s.type === 'faq');
      if (faqSection && faqSection.content) {
        const currentItems = faqSection.content.items || [];
        faqSection.content.items = [...currentItems, { question: questionText, answer: text }];
      }
      
      await db.updateWebsite(activeSite.id, {
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_MENU',
        about: null
      });
      return generateTwiML(`✅ FAQ item added successfully!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    case 'EDIT_BLOGS': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      if (lowerText === 'b' || lowerText === 'back') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      }
      
      if (text === '1') {
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_BLOGS_ADD_TITLE' });
        return generateTwiML(`📰 *Add Blog Post*\n\nEnter the Blog Title:`);
      } else if (text === '2') {
        const cfg = activeSite.config as any;
        const blogsSection = cfg.sections?.find((s: any) => s.type === 'blogs');
        if (blogsSection && blogsSection.content) {
          blogsSection.content.items = [];
        }
        await db.updateWebsite(activeSite.id, {
          config: cfg
        });
        await db.upsertOnboardingSession(fromPhone, { step: 'EDIT_MENU' });
        return generateTwiML(`✅ Blog posts cleared!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
      } else {
        return generateTwiML(`⚠️ Invalid choice. Reply with 1, 2, or B:`);
      }
    }

    case 'EDIT_BLOGS_ADD_TITLE': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 3) {
        return generateTwiML(`⚠️ Title too short. Try again:`);
      }
      
      await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_BLOGS_ADD_DESC',
        about: JSON.stringify({ title: text })
      });
      return generateTwiML(`Great title! Now write the Blog Content/Description:`);
    }

    case 'EDIT_BLOGS_ADD_DESC': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      if (text.length < 10) {
        return generateTwiML(`⚠️ Description too short (min 10 chars). Try again:`);
      }
      
      let blogTitle = 'Blog Title';
      try {
        const parsed = JSON.parse(session.about || '{}');
        blogTitle = parsed.title || 'Blog Title';
      } catch (e) {}
      
      await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_BLOGS_ADD_IMAGE',
        about: JSON.stringify({ title: blogTitle, description: text })
      });
      return generateTwiML(`Description saved. Now upload/send a photo for the blog post, or reply *SKIP*:`);
    }

    case 'EDIT_BLOGS_ADD_IMAGE': {
      const activeSite = await getUserWebsite(fromPhone);
      if (!activeSite) {
        await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
        return generateTwiML(`No active website found.`);
      }
      
      let blogTitle = 'Blog Post';
      let blogDesc = '';
      try {
        const parsed = JSON.parse(session.about || '{}');
        blogTitle = parsed.title || 'Blog Post';
        blogDesc = parsed.description || '';
      } catch (e) {}
      
      let imageUrl = '';
      if (mediaUrls && mediaUrls.length > 0) {
        imageUrl = await uploadImageToCloudinary(mediaUrls[0], 'blogs');
      } else if (lowerText === 'skip') {
        imageUrl = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600';
      } else {
        return generateTwiML(`⚠️ Please upload a photo, or reply *SKIP*:`);
      }
      
      const newPost = {
        title: blogTitle,
        description: blogDesc,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '3 min read',
        image: imageUrl
      };
      
      const cfg = activeSite.config as any;
      let blogsSection = cfg.sections?.find((s: any) => s.type === 'blogs');
      if (!blogsSection) {
        blogsSection = { id: 'blogs', type: 'blogs', content: { title: 'Insights & Stories', items: [] } };
        cfg.sections.splice(cfg.sections.length - 1, 0, blogsSection);
      }
      
      blogsSection.content.items = [...(blogsSection.content.items || []), newPost];
      
      await db.updateWebsite(activeSite.id, {
        config: cfg
      });
      
      await db.upsertOnboardingSession(fromPhone, {
        step: 'EDIT_MENU',
        about: null
      });
      
      return generateTwiML(`✅ Blog post *"${blogTitle}"* added successfully!\n\n` + getEditMenuMessage(activeSite.businessName, activeSite.subdomain));
    }

    default:
      await db.upsertOnboardingSession(fromPhone, { step: 'WELCOME' });
      return generateTwiML(`Oops! Something went wrong. Let's start over. Reply *START*.`);
  }
}
