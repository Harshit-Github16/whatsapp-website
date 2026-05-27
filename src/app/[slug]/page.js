"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Phone,
  Check,
  Globe,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  MapPin,
  Mail,
  Star,
  Clock,
  Send,
  Menu,
  X,
  Sparkles,
  Info
} from "lucide-react";

export default function LiveWebsite() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mock form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Pre-configured fallback profiles for common slugs
  const fallbacks = {
    "sharma-dental": {
      businessName: "Sharma Dental Clinic",
      category: "Dental Clinic",
      about: "At Sharma Dental Clinic, we are committed to providing exceptional dental care in a friendly and comfortable environment. Our state-of-the-art facility is equipped with the latest technology to ensure you receive the best treatments for a healthy, beautiful smile.",
      services: ["Dental Checkups", "Teeth Whitening", "Cosmetic Dentistry", "Root Canal Therapy", "Dental Implants", "Orthodontic Braces"],
      phone: "+91 98765 43210",
      email: "info@sharmadental.com",
      address: "12, Ring Road, Lajpat Nagar, New Delhi, 110024",
      theme: "medical",
      logoUrl: "",
      heroImageUrl: "",
      galleryUrls: []
    },
    "fitzone-gym": {
      businessName: "FitZone Gym",
      category: "Fitness Center",
      about: "FitZone Gym is your ultimate fitness destination. We offer premium workout space, advanced strength training equipment, group fitness classes, and certified personal trainers to help you unlock your strength, burn calories, and live a healthier lifestyle.",
      services: ["Strength & Conditioning", "Cardio Training Zone", "Zumba & Yoga Sessions", "Personal Fitness Coaching", "Diet & Nutrition Plans", "Steam & Shower Rooms"],
      phone: "+91 98765 55432",
      email: "join@fitzonegym.com",
      address: "45, Active Plaza, Connaught Place, New Delhi, 110001",
      theme: "gym",
      logoUrl: "",
      heroImageUrl: "",
      galleryUrls: []
    },
    "royal-cafe": {
      businessName: "The Royal Cafe",
      category: "Coffee & Bistro",
      about: "Welcome to The Royal Cafe, where every cup tells a story. We serve handcrafted espresso drinks, delicious artisanal pastries, and healthy breakfast bowls made from locally sourced organic ingredients. Experience cozy seating, free high-speed Wi-Fi, and a soothing acoustic ambiance.",
      services: ["Handcrafted Specialty Coffee", "Fresh Bakery & Pastries", "Gourmet All-Day Breakfast", "Weekend Acoustic Evenings", "Catering & Private Parties", "Takeaway & Home Delivery"],
      phone: "+91 98765 88765",
      email: "hello@royalcafe.com",
      address: "Shop 4, Market Complex, Greater Kailash 2, New Delhi, 110048",
      theme: "restaurant",
      logoUrl: "",
      heroImageUrl: "",
      galleryUrls: []
    },
    "elegance-salon": {
      businessName: "Elegance Salon & Spa",
      category: "Beauty Salon",
      about: "Elegance Salon & Spa is a luxury beauty sanctuary dedicated to highlighting your natural charm. From premium hair coloring and styling to revitalizing facials and therapeutic massages, our seasoned stylists treat you to an unforgettable self-care experience.",
      services: ["Designer Haircuts & Styling", "Organic Facials & Skin Care", "Bridal Makeovers & Nail Art", "Luxury Body Massage Therapy", "Hygienic Waxing & Threading", "Hair Spa & Smoothing"],
      phone: "+91 98765 99887",
      email: "book@elegancesalon.com",
      address: "18, Inner Circle, Defence Colony, New Delhi, 110024",
      theme: "salon",
      logoUrl: "",
      heroImageUrl: "",
      galleryUrls: []
    },
    "urban-realty": {
      businessName: "Urban Realty",
      category: "Real Estate Brokerage",
      about: "Urban Realty makes finding your dream property effortless. Specializing in luxury residential apartments, premium plots, and commercial leasing, our agents combine local market expertise and legal transparency to offer a seamless buying, selling, or renting journey.",
      services: ["Residential Home Sales", "Commercial Office Leasing", "Property Investment Consulting", "Legal Documentation Support", "Premium Plot Brokering", "Accurate Property Valuations"],
      phone: "+91 98765 11223",
      email: "deals@urbanrealty.com",
      address: "Penthouse A, Skyline Towers, Sector 62, Noida, 201301",
      theme: "realestate",
      logoUrl: "",
      heroImageUrl: "",
      galleryUrls: []
    }
  };

  useEffect(() => {
    if (!slug) return;

    // 1. Try reading from localStorage
    const saved = localStorage.getItem(`whatssite_site_${slug}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure default structures are present
        if (!parsed.galleryUrls) parsed.galleryUrls = [];
        if (!parsed.services) parsed.services = [];
        setSiteData(parsed);
        setLoading(false);
        return;
      } catch (e) {
        console.error("Error parsing saved site:", e);
      }
    }

    // 2. Try matching pre-configured fallback profile
    const fallback = fallbacks[slug];
    if (fallback) {
      setSiteData(fallback);
    } else {
      // 3. Generate dynamic fallback profile based on the slug name
      const cleanName = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setSiteData({
        businessName: cleanName,
        category: "Local Business",
        about: `Welcome to ${cleanName}. We are dedicated to offering exceptional value to our customers. Backed by years of experience and specialized skills, our goal is to deliver top-notch services suited perfectly to your style and targets.`,
        services: ["Premium Service A", "Premium Service B", "Custom Consultancy", "24/7 Urgent Assistance"],
        phone: "+91 99999 88888",
        email: `contact@${slug}.com`,
        address: "New Delhi, India",
        theme: "medical", // default theme
        logoUrl: "",
        heroImageUrl: "",
        galleryUrls: []
      });
    }
    setLoading(false);
  }, [slug]);

  // Form submission handler
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormName("");
      setFormEmail("");
      setFormMessage("");
      setFormSubmitted(false);
    }, 4500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-500 font-bold text-sm">Loading your website...</span>
        </div>
      </div>
    );
  }

  // Theme Style Options Mapping (Supports complete color theme switches)
  const themeStyles = {
    medical: {
      bodyBg: "bg-white",
      textColor: "text-slate-650",
      headingColor: "text-slate-900",
      accent: "bg-blue-600 hover:bg-blue-700 text-white",
      accentText: "text-blue-650",
      lightBg: "bg-blue-50/50",
      cardBg: "bg-white",
      cardBorder: "border-blue-100 hover:border-blue-200 hover:shadow-blue-100/30",
      badge: "bg-blue-100 text-blue-800",
      footerBg: "bg-blue-950",
      footerText: "text-blue-200/60",
      heroGradient: "from-blue-50/80 via-white to-slate-50/20",
      dividerColor: "border-slate-100",
      ctaBg: "bg-blue-900 text-white",
      logoBadge: "bg-blue-600 text-white",
      btnText: "Book Appointment",
      bannerImage: "/dentist.png",
      bannerText: "🦷",
      servicesDefault: ["Dental Checkup", "Teeth Cleaning", "Cosmetic Dentistry", "Root Canal"]
    },
    gym: {
      bodyBg: "bg-slate-950",
      textColor: "text-slate-300",
      headingColor: "text-white",
      accent: "bg-red-600 hover:bg-red-700 text-white",
      accentText: "text-red-500",
      lightBg: "bg-slate-900",
      cardBg: "bg-slate-900/60",
      cardBorder: "border-red-950/30 hover:border-red-650/40 hover:shadow-red-950/80",
      badge: "bg-red-500/10 text-red-500 border border-red-500/20",
      footerBg: "bg-black",
      footerText: "text-slate-500",
      heroGradient: "from-red-950/20 via-slate-950 to-slate-950",
      dividerColor: "border-slate-900",
      ctaBg: "bg-slate-900 border border-red-950/40 text-white",
      logoBadge: "bg-red-600 text-white",
      btnText: "Join Fitness Club",
      bannerImage: null,
      bannerText: "🏋️‍♂️",
      servicesDefault: ["Strength Training", "Cardio Fitness", "Yoga & Pilates", "Personal Coaching"]
    },
    restaurant: {
      bodyBg: "bg-[#fdfbf7]", // Warm white
      textColor: "text-stone-600",
      headingColor: "text-stone-900",
      accent: "bg-amber-600 hover:bg-amber-700 text-white",
      accentText: "text-amber-650",
      lightBg: "bg-amber-50/30",
      cardBg: "bg-white",
      cardBorder: "border-amber-100 hover:border-amber-300 hover:shadow-amber-100/40",
      badge: "bg-amber-100 text-amber-800",
      footerBg: "bg-stone-950",
      footerText: "text-stone-400",
      heroGradient: "from-amber-50/50 via-[#fdfbf7] to-stone-50/30",
      dividerColor: "border-stone-200/60",
      ctaBg: "bg-amber-950 text-white",
      logoBadge: "bg-amber-600 text-white",
      btnText: "Order Online",
      bannerImage: null,
      bannerText: "☕",
      servicesDefault: ["Fine Dining", "Fast Delivery", "Event Catering", "Coffee Bar"]
    },
    salon: {
      bodyBg: "bg-[#fefbfc]", // Soft blush
      textColor: "text-pink-950/70",
      headingColor: "text-pink-950",
      accent: "bg-pink-600 hover:bg-pink-700 text-white",
      accentText: "text-pink-600",
      lightBg: "bg-pink-50/40",
      cardBg: "bg-white",
      cardBorder: "border-pink-100 hover:border-pink-200 hover:shadow-pink-100/30",
      badge: "bg-pink-100 text-pink-700",
      footerBg: "bg-pink-950",
      footerText: "text-pink-200/50",
      heroGradient: "from-pink-50/50 via-[#fefbfc] to-slate-50/20",
      dividerColor: "border-pink-100/60",
      ctaBg: "bg-pink-900 text-white",
      logoBadge: "bg-pink-600 text-white",
      btnText: "Book Slot",
      bannerImage: null,
      bannerText: "✨",
      servicesDefault: ["Hair Styling", "Facial Massage", "Bridal Makeup", "Nail Art"]
    },
    realestate: {
      bodyBg: "bg-white",
      textColor: "text-slate-600",
      headingColor: "text-slate-900",
      accent: "bg-teal-650 hover:bg-teal-700 text-white",
      accentText: "text-teal-650",
      lightBg: "bg-teal-50/40",
      cardBg: "bg-white",
      cardBorder: "border-teal-100 hover:border-teal-300 hover:shadow-teal-100/30",
      badge: "bg-teal-100 text-teal-800",
      footerBg: "bg-slate-900",
      footerText: "text-slate-400",
      heroGradient: "from-teal-50/50 via-white to-slate-50/20",
      dividerColor: "border-slate-100",
      ctaBg: "bg-teal-950 text-white",
      logoBadge: "bg-teal-650 text-white",
      btnText: "View Properties",
      bannerImage: null,
      bannerText: "🏢",
      servicesDefault: ["Property Sales", "Rental Agency", "Commercial Space", "Legal Consulting"]
    }
  };

  const style = themeStyles[siteData.theme] || themeStyles.medical;

  // Mock Testimonials Generator based on Category
  const getTestimonials = () => {
    const cat = (siteData.category || "business").toLowerCase();
    if (cat.includes("dent") || cat.includes("medic") || cat.includes("clin") || siteData.theme === "medical") {
      return [
        { name: "Amit Sharma", text: "Best treatment I have received! The clinic is exceptionally hygienic, and the doctor explains every single step. Highly professional staff.", role: "Patient" },
        { name: "Priya Patel", text: "Extremely gentle root canal procedure. I was very nervous, but they made me feel completely relaxed and safe. Strongly recommended for family visits!", role: "Teacher" },
        { name: "Rajesh Malhotra", text: "Got teeth whitening done here. Excellent results in just one session. Affordable prices and very transparent.", role: "Consultant" }
      ];
    }
    if (cat.includes("gym") || cat.includes("fit") || cat.includes("work") || siteData.theme === "gym") {
      return [
        { name: "Rahul Singh", text: "Amazing gym atmosphere and positive vibes. The equipment is brand new and well-maintained. The personal trainers are extremely helpful.", role: "Member" },
        { name: "Neha Dua", text: "Very neat locker rooms and washrooms. The yoga and Zumba sessions are lively and energizing. Love working out here daily!", role: "Athlete" },
        { name: "Sumit Rawat", text: "Best value-for-money gym in this area. Clean environment, and trainers correct your posture during workouts.", role: "Entrepreneur" }
      ];
    }
    if (cat.includes("cafe") || cat.includes("rest") || cat.includes("food") || cat.includes("coff") || siteData.theme === "restaurant") {
      return [
        { name: "Vikram Malhotra", text: "Absolutely loved the hand-drip coffee! The cozy interior and pleasant acoustic music make it the perfect place to work or read a book.", role: "Regular Visitor" },
        { name: "Sonal Gupta", text: "The pastries are freshly baked, and the blueberry cheesecake is heaven on a plate. Extremely polite service and pleasant hosts.", role: "Food Critic" },
        { name: "Arjun Dev", text: "A great place to hang out with friends. Their breakfast platter is filling, fresh, and tastes authentic. 10/10 recommendation.", role: "Tech Lead" }
      ];
    }
    if (cat.includes("salon") || cat.includes("spa") || cat.includes("hair") || cat.includes("beauty") || siteData.theme === "salon") {
      return [
        { name: "Karan Johar", text: "Top-notch haircut and beard grooming! They listen carefully to what style you want and deliver it precisely. Super hygienic tools.", role: "Creative Director" },
        { name: "Anjali Rao", text: "The herbal facial and body spa session were so relaxing. It completely rejuvenated my skin. A beautiful self-care session.", role: "Model" },
        { name: "Meera Nair", text: "Great wedding makeup trials. The artist was highly skilled and understood exactly what would look best on my skin tone.", role: "Bride-to-be" }
      ];
    }
    if (cat.includes("realestate") || cat.includes("property") || cat.includes("house") || cat.includes("realty") || siteData.theme === "realestate") {
      return [
        { name: "Rohan Mehra", text: "Helped me secure the perfect 3BHK flat within my budget in Delhi. Their brokerage was transparent, and they guided us through the entire process.", role: "Home Owner" },
        { name: "Simran Kaur", text: "Highly professional real estate agents. They filtered options based exactly on our preferences, saving us weeks of painful searching.", role: "Investor" },
        { name: "Gaurav Sen", text: "Smooth registration and paperwork handling. Very transparent communication. I would definitely buy my next commercial property through them.", role: "CEO" }
      ];
    }
    return [
      { name: "Rajesh Kumar", text: "Extremely professional service. Deliveries are always on schedule, and customer support is active 24/7. Value for money!", role: "Client" },
      { name: "Sneha Nair", text: "Highly recommend them to everyone. They customized the service to fit our specific deadlines. Wonderful experience working together.", role: "Manager" }
    ];
  };

  // Fallback Gallery Items Generator (Beautiful graphic placeholders)
  const getFallbackGalleryItems = () => {
    const items = {
      medical: [
        { title: "Dental Operatory", desc: "Hygienic treatment rooms equipped with modern dental chairs.", icon: "🏥" },
        { title: "Sterilization Unit", desc: "100% sterile tools following global safety protocols.", icon: "🛡️" },
        { title: "Consultation Lounge", desc: "Comfortable lounge to discuss treatment paths with specialists.", icon: "💬" },
        { title: "Advanced X-Ray", desc: "Digital low-radiation scans for precision diagnosis.", icon: "🔬" }
      ],
      gym: [
        { title: "Strength Zone", desc: "Heavy dumbbells, cages, and high-quality weight plates.", icon: "🏋️‍♂️" },
        { title: "Cardio Station", desc: "Treadmills, spin bikes, and cross trainers with monitors.", icon: "🏃‍♂️" },
        { title: "Yoga Studio", desc: "Peaceful group room with yoga mats and blocks.", icon: "🧘‍♀️" },
        { title: "Nutrition Bar", desc: "Pre/post workout shakes, protein snacks, and drinks.", icon: "🥤" }
      ],
      restaurant: [
        { title: "Bistro Seating", desc: "Cozy warm seating setups for couples and families.", icon: "🍽️" },
        { title: "Espresso Bar", desc: "Specialty Italian coffee machines operated by trained baristas.", icon: "☕" },
        { title: "Dessert Display", desc: "Fresh cakes, cookies, and croissants baked daily.", icon: "🍰" },
        { title: "Chef's Kitchen", desc: "Clean kitchen preparing gourmet meals from fresh produce.", icon: "👨‍🍳" }
      ],
      salon: [
        { title: "Styling Chairs", desc: "Ergonomic chairs with massive mirrors and vanity lightings.", icon: "💇‍♀️" },
        { title: "Spa Haven", desc: "Quiet dark therapy rooms for massage and facials.", icon: "💆‍♀️" },
        { title: "Nail Lounge", desc: "Modern manicure and nail extension customization stations.", icon: "💅" },
        { title: "Shampoo Station", desc: "Comfortable reclining seats for relaxing hair washes.", icon: "🚿" }
      ],
      realestate: [
        { title: "Premium Condos", desc: "Luxurious apartments in high-rise towers with amenities.", icon: "🏢" },
        { title: "Corporate Blocks", desc: "Prime commercial office spaces for growing businesses.", icon: "💼" },
        { title: "Suburban Plots", desc: "Approved residential land plots ready for construction.", icon: "🏡" },
        { title: "Villa Projects", desc: "Exclusive gated community duplex villas with security.", icon: "🏰" }
      ]
    };
    return items[siteData.theme] || items.medical;
  };

  return (
    <div className={`min-h-screen ${style.bodyBg} flex flex-col font-sans text-slate-800 scroll-smooth`}>
      
      {/* 1. Global AI Builder Floating Header Badge */}
      <div className="bg-[#075E54] text-white px-4 py-2.5 text-center text-xs font-bold flex items-center justify-center gap-2 select-none shadow-md sticky top-0 z-40 shrink-0">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
        <span className="opacity-95">Built with WhatsSite. Live Preview Mode.</span>
        <Link
          href="/onboarding"
          className="underline hover:text-emerald-100 flex items-center gap-1 ml-3 bg-white/10 px-2.5 py-0.5 rounded transition-all hover:scale-102 font-extrabold"
        >
          <MessageSquare className="w-3 h-3" /> Edit Website from WhatsApp
        </Link>
      </div>

      {/* 2. Brand Header / Navbar */}
      <header className={`border-b ${style.dividerColor} py-4.5 px-6 sm:px-12 bg-white sticky top-9 z-30 flex justify-between items-center transition-all shadow-sm`}>
        <span className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
          {siteData.logoUrl ? (
            <img src={siteData.logoUrl} alt="Logo" className="h-8 sm:h-9 w-auto object-contain rounded" />
          ) : (
            <span className={`w-8.5 h-8.5 rounded-xl ${style.logoBadge} flex items-center justify-center text-sm text-white font-black shadow-sm`}>
              {(siteData.businessName || "B")[0].toUpperCase()}
            </span>
          )}
          <span className="tracking-tight hover:text-slate-700 transition-colors">
            {siteData.businessName || "My Business"}
          </span>
        </span>
        
        {/* Desktop Navbar menu links */}
        <nav className="hidden md:flex items-center gap-6.5 text-xs font-extrabold tracking-wide uppercase text-slate-500">
          <a href="#home" className={`hover:${style.accentText} transition-colors`}>Home</a>
          <a href="#about" className={`hover:${style.accentText} transition-colors`}>About Us</a>
          <a href="#services" className={`hover:${style.accentText} transition-colors`}>Services</a>
          <a href="#gallery" className={`hover:${style.accentText} transition-colors`}>Gallery</a>
          <a href="#testimonials" className={`hover:${style.accentText} transition-colors`}>Reviews</a>
          <a href="#contact" className={`hover:${style.accentText} transition-colors`}>Contact Us</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteData.phone}`}
            className={`hidden sm:inline-flex items-center gap-1.5 ${style.accent} px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98] hover:scale-102`}
          >
            <Phone className="w-3.5 h-3.5" /> Call: {siteData.phone || "+91 99999 88888"}
          </a>
          
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[102px] left-0 w-full bg-white border-b border-slate-200 z-30 shadow-lg flex flex-col p-5 gap-4.5 font-bold text-sm text-slate-600">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:${style.accentText} pb-2 border-b border-slate-50`}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:${style.accentText} pb-2 border-b border-slate-50`}
          >
            About Us
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:${style.accentText} pb-2 border-b border-slate-50`}
          >
            Services
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:${style.accentText} pb-2 border-b border-slate-50`}
          >
            Gallery
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:${style.accentText} pb-2 border-b border-slate-50`}
          >
            Reviews
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:${style.accentText} pb-2`}
          >
            Contact Us
          </a>
          <a
            href={`tel:${siteData.phone}`}
            className={`w-full text-center flex items-center justify-center gap-2 ${style.accent} py-3.5 rounded-xl font-bold text-sm shadow`}
          >
            <Phone className="w-4 h-4" /> Call: {siteData.phone || "+91 99999 88888"}
          </a>
        </div>
      )}

      {/* 3. Hero Banner Section */}
      <section id="home" className={`py-16 sm:py-24 px-6 sm:px-12 bg-gradient-to-b ${style.heroGradient} relative overflow-hidden shrink-0`}>
        {/* Background glow graphics */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest ${style.badge} px-3.5 py-1.5 rounded-full mb-5 shadow-sm`}>
              <Sparkles className="w-3 h-3 text-current animate-pulse" />
              {siteData.category || "Local Business"}
            </span>
            <h1 className={`text-3xl sm:text-4.5xl lg:text-[52px] lg:leading-[1.12] font-extrabold ${style.headingColor} tracking-tight mb-5`}>
              {siteData.businessName ? `Welcome to ${siteData.businessName}` : "Your Premium Professional Destination"}
            </h1>
            <p className={`${siteData.theme === "gym" ? "text-slate-400" : "text-slate-500"} text-sm sm:text-base max-w-xl leading-relaxed mb-8 font-medium`}>
              {siteData.about ? siteData.about.substring(0, 160) + "..." : `Discover our premium ${siteData.category.toLowerCase()} services. We offer certified skills, quality guarantees, and customize everything to matches your preferences.`}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4.5 w-full sm:w-auto">
              <a
                href="#contact"
                className={`${style.accent} px-8 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-center shadow-lg transition-all hover:scale-102 active:scale-98`}
              >
                {style.btnText}
              </a>
              <a
                href="#services"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-8 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-center transition-colors shadow-sm"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className={`relative w-full max-w-[460px] aspect-[4/3] rounded-3xl overflow-hidden ${siteData.theme === "gym" ? "border-slate-800" : "border-slate-100"} border-2 flex items-center justify-center shadow-2xl transition-transform hover:rotate-1 duration-500`}>
              {siteData.heroImageUrl ? (
                <img src={siteData.heroImageUrl} alt="Hero Banner" className="w-full h-full object-cover" />
              ) : siteData.theme === "medical" ? (
                <Image
                  src="/dentist.png"
                  alt="Business Banner"
                  fill
                  sizes="460px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 h-full w-full bg-gradient-to-tr from-slate-900 to-slate-950 text-white relative">
                  <span className="text-[80px] mb-4 filter drop-shadow-md">{style.bannerText}</span>
                  <span className="text-xl font-black tracking-wide uppercase text-white">{siteData.businessName}</span>
                  <span className="text-xs text-brand-green font-bold uppercase tracking-widest mt-2">{siteData.category}</span>
                  <div className="absolute bottom-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    WhatsSite High-Fidelity Mockup
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 4. About Us Section (Dynamic custom message) */}
      <section id="about" className={`py-20 px-6 sm:px-12 border-t ${style.dividerColor} ${style.lightBg} shrink-0`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-1.5 mb-3">
              <span className={`w-6 h-0.5 ${style.accent.split(" ")[0]}`}></span>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest ${style.accentText}`}>About Us</span>
            </div>
            <h2 className={`text-2xl sm:text-3.5xl font-extrabold ${style.headingColor} tracking-tight mb-5`}>
              Our Story & Commitment
            </h2>
            <p className={`${siteData.theme === "gym" ? "text-slate-400" : "text-slate-550"} text-sm sm:text-base leading-relaxed mb-6 font-medium whitespace-pre-line`}>
              {siteData.about || "We are dedicated to offering exceptional value to our customers. Backed by expert experience and tools, our goal is to deliver top-notch services suited perfectly to your style and targets."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <span className={`w-5 h-5 rounded-full ${style.badge} flex items-center justify-center shrink-0`}>
                  <Check className="w-3 h-3 text-current" />
                </span>
                <span className={style.headingColor}>Certified Professionals</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <span className={`w-5 h-5 rounded-full ${style.badge} flex items-center justify-center shrink-0`}>
                  <Check className="w-3 h-3 text-current" />
                </span>
                <span className={style.headingColor}>Premium Quality Standard</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <span className={`w-5 h-5 rounded-full ${style.badge} flex items-center justify-center shrink-0`}>
                  <Check className="w-3 h-3 text-current" />
                </span>
                <span className={style.headingColor}>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <span className={`w-5 h-5 rounded-full ${style.badge} flex items-center justify-center shrink-0`}>
                  <Check className="w-3 h-3 text-current" />
                </span>
                <span className={style.headingColor}>Active Online Support</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-lg flex flex-col justify-between h-full relative overflow-hidden">
            {siteData.theme === "gym" && <div className="absolute inset-0 bg-slate-900 z-0"></div>}
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className={`text-md font-extrabold ${style.headingColor} mb-2`}>
                Why Choose Us?
              </h3>
              <p className={`text-xs ${siteData.theme === "gym" ? "text-slate-400" : "text-slate-500"} leading-relaxed mb-6 font-medium`}>
                We prioritize user expectations and make sure that every interaction is backed by verified business safety and premium client delivery models.
              </p>
            </div>

            <div className={`grid grid-cols-3 gap-2 border-t pt-5 relative z-10 ${siteData.theme === "gym" ? "border-slate-800" : "border-slate-100"}`}>
              <div className="text-center">
                <span className={`block text-xl font-black ${style.accentText}`}>99%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Success</span>
              </div>
              <div className="text-center border-x border-slate-100 dark:border-slate-800">
                <span className={`block text-xl font-black ${style.accentText}`}>100+</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Clients</span>
              </div>
              <div className="text-center">
                <span className={`block text-xl font-black ${style.accentText}`}>5 Star</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Reviews</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Services Grid Section */}
      <section id="services" className="py-20 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${style.accentText} bg-slate-100 px-3.5 py-1.5 rounded-full`}>
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 mb-3 tracking-tight mt-4">
              What We Do Best
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold">
              Explore premium solutions custom-designed for your operational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(siteData.services.length > 0 ? siteData.services : style.servicesDefault).map((service, idx) => (
              <div
                key={idx}
                className={`bg-white border rounded-2xl p-6 text-center flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${style.cardBorder}`}
              >
                <div className={`w-11 h-11 rounded-full ${style.lightBg} flex items-center justify-center mb-4`}>
                  <span className={`w-3.5 h-3.5 rounded-full ${style.accent.split(" ")[0]} shadow-inner`}></span>
                </div>
                <h3 className="text-sm sm:text-[14.5px] font-extrabold text-slate-850 leading-snug line-clamp-2">
                  {service}
                </h3>
                <p className="text-[10.5px] text-slate-400 font-semibold mt-2.5">
                  Premium Quality Standard
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Section (Base64 or Fallback placeholders) */}
      <section id="gallery" className={`py-20 px-6 sm:px-12 border-t ${style.dividerColor} ${siteData.theme === "gym" ? "bg-slate-950" : "bg-slate-50/50"} shrink-0`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${style.accentText} bg-slate-100 px-3.5 py-1.5 rounded-full`}>
              Visual Showcase
            </span>
            <h2 className={`text-2xl sm:text-3.5xl font-extrabold ${style.headingColor} mb-3 tracking-tight mt-4`}>
              Business Gallery
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold">
              Take a closer look at our premises, equipment, and recent works.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {siteData.galleryUrls.length > 0 ? (
              siteData.galleryUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 border border-slate-100 shadow-md group cursor-pointer"
                >
                  <img
                    src={url}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-slate-800 p-2.5 rounded-full shadow font-extrabold text-xs">
                      View Zoomed
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Default stylized gallery preview cards based on theme
              getFallbackGalleryItems().map((item, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-[4/3] rounded-2xl p-5 border ${style.cardBg} ${style.cardBorder} flex flex-col justify-between shadow-sm group hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[34px] filter drop-shadow">{item.icon}</span>
                    <span className={`text-[9px] font-extrabold uppercase tracking-wider ${style.accentText}`}>Mockup {idx + 1}</span>
                  </div>
                  <div>
                    <h4 className={`text-[13px] font-extrabold ${style.headingColor} mb-1 group-hover:${style.accentText} transition-colors`}>
                      {item.title}
                    </h4>
                    <p className={`text-[10px] ${siteData.theme === "gym" ? "text-slate-400" : "text-slate-500"} leading-relaxed font-semibold`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. Reviews / Testimonials Section */}
      <section id="testimonials" className={`py-20 px-6 sm:px-12 bg-white border-t ${style.dividerColor} shrink-0`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${style.accentText} bg-slate-100 px-3.5 py-1.5 rounded-full`}>
              Client Feedback
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 mb-3 tracking-tight mt-4">
              What Customers Say
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold">
              Read authentic evaluations left by regular visitors and verified clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5 max-w-6xl mx-auto">
            {getTestimonials().map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-100 rounded-2xl p-6.5 flex flex-col justify-between hover:shadow-md hover:border-slate-200 transition-all duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 italic leading-relaxed font-semibold mb-5">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-slate-200/50 pt-4.5">
                  <span className={`w-8.5 h-8.5 rounded-full ${style.lightBg} ${style.accentText} flex items-center justify-center font-extrabold text-xs shrink-0 shadow-inner`}>
                    {t.name[0]}
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{t.name}</h4>
                    <span className="text-[10px] text-slate-400 font-bold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact & Mock Inquiry Form Section */}
      <section id="contact" className={`py-20 px-6 sm:px-12 border-t ${style.dividerColor} ${siteData.theme === "gym" ? "bg-slate-900" : "bg-slate-50/50"} shrink-0`}>
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${style.accentText} bg-slate-100 px-3.5 py-1.5 rounded-full`}>
              Get In Touch
            </span>
            <h2 className={`text-2xl sm:text-3.5xl font-extrabold ${style.headingColor} mb-3 tracking-tight mt-4`}>
              Contact Us Today
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold">
              Reach out directly to ask questions, check availability, or book slots.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
            
            {/* Left Col - Address Cards */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              
              <div className={`p-5 rounded-2xl border bg-white ${style.cardBorder} flex gap-4 shadow-sm`}>
                <div className={`w-10 h-10 rounded-full ${style.lightBg} flex items-center justify-center shrink-0`}>
                  <Phone className={`w-4 h-4 ${style.accentText}`} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">Phone Number</h4>
                  <a href={`tel:${siteData.phone}`} className="text-sm font-black text-slate-800 hover:underline">
                    {siteData.phone || "+91 99999 88888"}
                  </a>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border bg-white ${style.cardBorder} flex gap-4 shadow-sm`}>
                <div className={`w-10 h-10 rounded-full ${style.lightBg} flex items-center justify-center shrink-0`}>
                  <Mail className={`w-4 h-4 ${style.accentText}`} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">Email Support</h4>
                  <a href={`mailto:${siteData.email}`} className="text-sm font-black text-slate-800 hover:underline">
                    {siteData.email || "support@company.com"}
                  </a>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border bg-white ${style.cardBorder} flex gap-4 shadow-sm`}>
                <div className={`w-10 h-10 rounded-full ${style.lightBg} flex items-center justify-center shrink-0`}>
                  <MapPin className={`w-4 h-4 ${style.accentText}`} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">Location Address</h4>
                  <span className="text-xs font-semibold text-slate-700 leading-relaxed block">
                    {siteData.address || "New Delhi, India"}
                  </span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border bg-white ${style.cardBorder} flex gap-4 shadow-sm`}>
                <div className={`w-10 h-10 rounded-full ${style.lightBg} flex items-center justify-center shrink-0`}>
                  <Clock className={`w-4 h-4 ${style.accentText}`} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">Business Hours</h4>
                  <span className="text-xs font-bold text-slate-700 block">
                    Monday - Saturday: 9:00 AM - 8:00 PM
                  </span>
                  <span className="text-[10px] text-red-500 font-bold block mt-0.5">
                    Sunday: Closed
                  </span>
                </div>
              </div>

            </div>

            {/* Right Col - Interactive Mock Form & Map */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
                <h3 className="text-md sm:text-lg font-black text-slate-900 mb-1.5 flex items-center gap-1">
                  Send Quick Inquiry
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                </h3>
                <p className="text-xs text-slate-400 font-bold mb-6">
                  Fill in your requirements and we will contact you directly via WhatsApp/Call.
                </p>

                {formSubmitted ? (
                  <div className="bg-emerald-55 border border-emerald-200 text-emerald-800 p-5 rounded-2xl flex items-center gap-3 animate-fade-in shadow-inner">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0 shadow">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-black">Inquiry Submitted!</h4>
                      <p className="text-[10.5px] text-emerald-700 font-bold mt-0.5">
                        Thank you for reaching out. We will get back to you shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Amit Sharma"
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="e.g. amit@gmail.com"
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Your Message / Requirement</label>
                      <textarea
                        required
                        rows="3"
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Tell us what services or consultation booking slot you are looking for..."
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`w-full flex items-center justify-center gap-2 ${style.accent} py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all hover:scale-101 cursor-pointer`}
                    >
                      Send Message <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

              {/* Styled Mock Map Frame */}
              <div className="relative rounded-3xl h-[160px] overflow-hidden bg-slate-200 border border-slate-300/40 shadow flex items-center justify-center text-slate-400 group">
                <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center gap-1.5 p-4 text-center z-10">
                  <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-1">
                    <MapPin className="w-5 h-5 fill-current text-red-500" />
                  </div>
                  <h4 className="text-xs font-black text-slate-800">Explore on Google Maps</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {siteData.address || "New Delhi, India"}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.address || "New Delhi, India")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 text-[10px] font-black bg-white hover:bg-slate-50 text-slate-800 px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-1 transition-all group-hover:scale-102"
                  >
                    Open Map <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. Footer */}
      <footer className={`${style.footerBg} ${style.footerText} py-14 px-6 sm:px-12 border-t border-white/5`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <span className="text-lg font-black text-white flex items-center gap-2">
              {siteData.logoUrl ? (
                <img src={siteData.logoUrl} alt="Logo" className="h-7 w-auto object-contain rounded bg-white/5 p-0.5" />
              ) : (
                <span className={`w-7.5 h-7.5 rounded-xl ${style.logoBadge} flex items-center justify-center text-xs text-white font-black`}>
                  {(siteData.businessName || "B")[0].toUpperCase()}
                </span>
              )}
              {siteData.businessName || "My Business"}
            </span>
            <span className="text-[10px] font-semibold opacity-80 uppercase tracking-widest text-slate-400">
              Generated by WhatsSite
            </span>
          </div>

          <div className="flex gap-4">
            {/* Custom SVG Social Icons (since lucide doesn't support them out-of-the-box in this package version) */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white shadow-sm" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6.5c0-.8.2-1.1 1-1.1h2V2h-3C9.5 2 9 3.5 9 5.5V8z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white shadow-sm" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white shadow-sm" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href={`https://wa.me/${siteData.phone}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white shadow-sm" aria-label="WhatsApp">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 0C5.393 0 .012 5.382.012 12.018c0 2.12.553 4.19 1.601 6.012L0 24l6.135-1.611c1.764.962 3.738 1.468 5.888 1.469 6.643 0 12.024-5.38 12.024-12.017C24.047 5.382 18.666 0 12.03 0zm-.008 22.002c-1.893 0-3.748-.508-5.37-1.467l-.384-.228-3.633.954.97-3.543-.251-.399c-1.053-1.678-1.609-3.626-1.608-5.637C1.78 6.357 6.38 1.758 12.03 1.758c2.736 0 5.308 1.066 7.24 2.999 1.933 1.933 2.997 4.507 2.996 7.245-.002 5.642-4.603 10.00-10.243 10.00zm5.617-7.702c-.308-.154-1.821-.9-2.1-.101-.278-.1-.481-.154-.702-.154-.221 0-.877.308-1.077.537-.2.231-.4.256-.708.102-.308-.154-1.3-.479-2.478-1.53-.916-.818-1.534-1.829-1.714-2.137-.18-.309-.018-.475.137-.629.139-.138.308-.359.462-.538.154-.18.206-.308.308-.513.102-.206.051-.385-.026-.538-.077-.154-.702-1.693-.962-2.32-.253-.61-.51-.527-.702-.537-.18-.01-.385-.012-.59-.012-.205 0-.538.077-.82.385-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.102 2.974 1.256 3.18.154.205 2.17 3.313 5.258 4.646.734.317 1.308.507 1.756.649.738.236 1.41.203 1.94.124.59-.087 1.821-.744 2.077-1.462.256-.718.256-1.334.18-1.462-.077-.128-.282-.205-.59-.359z"/>
              </svg>
            </a>
          </div>

          <div className="text-xs text-center md:text-right flex flex-col gap-1 opacity-80">
            <span>📍 {siteData.address || "New Delhi, India"}</span>
            <span>✉️ {siteData.email || "support@company.com"}</span>
            <span className="text-[10px] opacity-60 mt-2">© {new Date().getFullYear()} {siteData.businessName || "My Business"}. All rights reserved.</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
