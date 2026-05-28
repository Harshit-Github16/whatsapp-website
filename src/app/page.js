"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  Sparkles,
  Globe,
  Wand2,
  Check,
  ExternalLink,
  ShieldCheck,
  Layers,
  Settings2,
  MessageSquare,
  Menu,
  X,
  Clock,
  Zap,
  ChevronDown
} from "lucide-react";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState("medical");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll or sync active theme changes with user interactions
  const themes = [
    {
      id: "medical",
      name: "Medical",
      businessName: "Sharma Dental Clinic",
      color: "border-blue-500",
      accent: "bg-blue-600",
      textAccent: "text-blue-600",
      lightBg: "bg-blue-50",
      hoverBg: "hover:bg-blue-50",
      desc: "Perfect for clinics, doctors, and health professionals.",
      heading: "Your Smile, Our Priority",
      subheading: "Advanced dental care for a healthier and brighter smile.",
      btnText: "Book Appointment",
      services: ["Dental Checkup", "Teeth Cleaning", "Cosmetic Dentistry", "Root Canal"],
      dotColor: "bg-blue-500",
    },
    {
      id: "gym",
      name: "Gym",
      businessName: "FitZone Gym",
      color: "border-red-500",
      accent: "bg-red-600",
      textAccent: "text-red-600",
      lightBg: "bg-red-50",
      hoverBg: "hover:bg-red-50",
      desc: "Designed for fitness centers, personal trainers, and gyms.",
      heading: "Unleash Your Inner Strength",
      subheading: "State-of-the-art equipment, expert trainers, and customized workouts.",
      btnText: "Join Now",
      services: ["Strength Training", "Cardio Fitness", "Yoga & Pilates", "Personal Coaching"],
      dotColor: "bg-red-500",
    },
    {
      id: "restaurant",
      name: "Restaurant",
      businessName: "The Royal Cafe",
      color: "border-amber-500",
      accent: "bg-amber-500",
      textAccent: "text-amber-600",
      lightBg: "bg-amber-50",
      hoverBg: "hover:bg-amber-50",
      desc: "Great for cafes, bistros, food joints, and fine dining.",
      heading: "Savor the Authentic Flavors",
      subheading: "Delicious food crafted with love, served fresh in a cozy environment.",
      btnText: "Order Online",
      services: ["Fine Dining", "Fast Delivery", "Event Catering", "Artisanal Coffee"],
      dotColor: "bg-amber-500",
    },
    {
      id: "salon",
      name: "Salon",
      businessName: "Elegance Salon",
      color: "border-pink-500",
      accent: "bg-pink-500",
      textAccent: "text-pink-600",
      lightBg: "bg-pink-50",
      hoverBg: "hover:bg-pink-50",
      desc: "Perfect for beauty salons, spas, hair stylists, and nail salons.",
      heading: "Enhance Your Natural Beauty",
      subheading: "Premium hair, skincare, and bridal makeup treatments by specialists.",
      btnText: "Book Service",
      services: ["Hair Styling", "Facial Massages", "Bridal Makeover", "Nail Spa"],
      dotColor: "bg-pink-500",
    },
    {
      id: "realestate",
      name: "Real Estate",
      businessName: "Urban Realty",
      color: "border-teal-500",
      accent: "bg-teal-600",
      textAccent: "text-teal-600",
      lightBg: "bg-teal-50",
      hoverBg: "hover:bg-teal-50",
      desc: "Optimized for property agents, builders, and developers.",
      heading: "Find Your Dream Home",
      subheading: "Discover premium residential and commercial spaces in prime locations.",
      btnText: "View Properties",
      services: ["Property Sales", "Rental Brokerage", "Commercial Leasing", "Home Appraisal"],
      dotColor: "bg-teal-500",
    }
  ];

  const currentThemeData = themes.find((t) => t.id === activeTheme) || themes[0];

  const faqs = [
    {
      q: "How does the WhatsApp onboarding work?",
      a: "Simply click the 'Start on WhatsApp' button, which redirects you to our WhatsApp bot. Send 'START', and the bot will ask a few simple questions (business name, category, services, photos). Within 5 minutes, our AI system creates and publishes your responsive website."
    },
    {
      q: "Do I need to pay or enter credit card details?",
      a: "No credit card is required. You can build, preview, and test your website completely free. We only charge if you choose to upgrade to a custom domain or premium features."
    },
    {
      q: "Can I connect my own custom domain?",
      a: "Absolutely! We provide a free subdomain (e.g., yourname.whatssite.com), and you can connect your own domain (e.g., www.yourbusiness.com) easily from our dashboard."
    },
    {
      q: "How do I edit or update my website?",
      a: "You can update your website details directly through WhatsApp! Just chat with the bot to add new services, change timings, or upload new images, and it will sync instantly."
    },
    {
      q: "Are the websites mobile responsive?",
      a: "Yes, every website built by WhatsSite is fully optimized for mobile devices, tablets, and desktop computers to ensure a seamless experience."
    }
  ];

  const testimonialsRow1 = [
    {
      name: "Dr. Ananya Sharma",
      role: "Founder, Sharma Dental Clinic",
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=100&auto=format&fit=crop&q=60",
      content: "WhatsSite built my clinic website in 4 minutes! Clients are booking appointments online, and I update services via WhatsApp.",
      stars: 5,
    },
    {
      name: "Vikram Malhotra",
      role: "Owner, FitZone Gym",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&auto=format&fit=crop&q=60",
      content: "Absolutely amazing. I am a fitness coach and had no coding skills. Chatting with the bot was extremely simple and fast.",
      stars: 5,
    },
    {
      name: "Chef Rajat Kapoor",
      role: "Head Chef, The Royal Cafe",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=60",
      content: "Managing a restaurant is busy. Changing our food menu via WhatsApp takes less than 30 seconds. Highly recommended!",
      stars: 5,
    },
    {
      name: "Priya Sen",
      role: "Stylist, Elegance Salon",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
      content: "Stunning mobile layouts! My clients love the look, and my bookings have increased by 40% in just two weeks.",
      stars: 5,
    },
    {
      name: "Amit Verma",
      role: "Director, Urban Realty",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      content: "SEO optimization is top-notch. My property listings started ranking on Google maps search almost immediately.",
      stars: 5,
    }
  ];

  const testimonialsRow2 = [
    {
      name: "Neha Gupta",
      role: "Owner, Bloom Boutique",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
      content: "I uploaded my boutique collection straight from WhatsApp. My storefront was live immediately. Truly a game-changer.",
      stars: 5,
    },
    {
      name: "Kabir Singh",
      role: "Consultant, KS Partners",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      content: "Having an SSL certificate and custom domain pre-configured automatically saved me so much setup headache.",
      stars: 5,
    },
    {
      name: "Rohan Das",
      role: "Founder, QuickWash",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=60",
      content: "Best customer service and support. The sandbox line makes it super easy to try out everything for free first.",
      stars: 5,
    },
    {
      name: "Dr. Sarah D'Souza",
      role: "Owner, PetCare Clinic",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      content: "Setting up veterinary clinic services was quick. I just listed them on chat and they were instantly formatted nicely.",
      stars: 5,
    },
    {
      name: "Meera Nair",
      role: "Founder, Organic Kitchen",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=60",
      content: "Unbelievably simple to use. My organic bakery got a professional online menu and Google presence within minutes.",
      stars: 5,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden font-sans">

      {/* 1. Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/logo.png"
                alt="WhatsSite Logo"
                width={40}
                height={40}
                className="rounded-xl shadow-md"
              />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Whats<span className="text-brand-green">Site</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
              <a href="#how-it-works" className="hover:text-brand-green transition-colors">How It Works</a>
              <a href="#features" className="hover:text-brand-green transition-colors">Features</a>
              <a href="#themes" className="hover:text-brand-green transition-colors">Templates</a>
              <a href="#pricing" className="hover:text-brand-green transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-brand-green transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-brand-green transition-colors">Contact</a>
            </nav>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-4">

              <a
                href="https://wa.me/14155238886?text=join%20thee-unknown"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green hover:bg-brand-green-hover text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg shadow-brand-green/20 hover:scale-[1.02] text-center"
              >
                Get Started
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 flex flex-col gap-4">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-semibold py-2 border-b border-slate-50"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-semibold py-2 border-b border-slate-50"
            >
              Features
            </a>
            <a
              href="#themes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-semibold py-2 border-b border-slate-50"
            >
              Templates
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-semibold py-2 border-b border-slate-50"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-semibold py-2 border-b border-slate-50"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-semibold py-2 border-b border-slate-50"
            >
              Contact
            </a>
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 text-center font-bold py-2 border border-slate-200 rounded-full hover:bg-slate-50"
              >
                Login
              </Link>
              <a
                href="https://wa.me/14155238886?text=join%20thee-unknown"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-brand-green hover:bg-brand-green-hover text-white text-center py-3.5 rounded-full font-bold shadow-lg shadow-brand-green/20"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 overflow-hidden">
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 7s ease-in-out infinite;
            animation-delay: 2s;
          }
        `}</style>
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40 pointer-events-none -translate-x-1/2"></div>
        <div className="absolute bottom-10 right-0 w-[40rem] h-[40rem] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-brand-green-dark text-[13px] font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                <span>AI Website Builder on WhatsApp</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] lg:leading-[1.15] font-extrabold text-slate-900 tracking-tight mb-6">
                Get Your Business Website Live{" "}
                <span className="bg-gradient-to-r from-brand-green to-emerald-600 bg-clip-text text-transparent">in 5 Minutes</span>, Right on WhatsApp!
              </h1>

              {/* Description */}
              <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                No coding. No hassle. Just chat with our bot, send your business details, and we'll build your professional website instantly.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                <a
                  href="https://wa.me/14155238886?text=join%20thee-unknown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-brand-green-hover text-white px-8 py-4.5 rounded-full font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-brand-green/30 hover:shadow-brand-green/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-[16px]"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.86.001-2.638-1.024-5.117-2.884-6.979C16.587 1.91 14.113.887 11.483.887c-5.443 0-9.866 4.418-9.868 9.861-.001 1.737.457 3.432 1.328 4.931l-1.008 3.682 3.771-.989z" />
                  </svg>
                  Start on WhatsApp
                </a>
                <a
                  href="#themes"
                  className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 px-8 py-4.5 rounded-full font-bold flex items-center justify-center gap-2 hover:border-slate-300 transition-all duration-300 text-[16px] shadow-sm"
                >
                  <Globe className="w-5 h-5 text-slate-500" />
                  View Demo Website
                </a>
              </div>

              {/* Bullet Trust Points */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-y-3 gap-x-6 text-[14px] text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand-green border-2 border-brand-green rounded-full p-0.5" />
                  No Credit Card
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand-green border-2 border-brand-green rounded-full p-0.5" />
                  Instant Setup
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brand-green border-2 border-brand-green rounded-full p-0.5" />
                  Cancel Anytime
                </div>
              </div>
            </div>

            {/* Hero Right Visuals (Premium Mockup Wrapper - Stretched to the right edge) */}
            <div className="lg:col-span-6 relative w-full flex items-center justify-end mt-10 lg:mt-0 select-none">

              {/* Backglow layer */}
              <div className="absolute w-[90%] h-[90%] bg-gradient-to-br from-brand-green/20 via-teal-400/10 to-emerald-400/5 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse duration-[8000ms]"></div>

              {/* Mockup Image Container */}
              <div className="relative w-full aspect-[4/3] lg:w-[125%] lg:h-[580px] lg:-mr-28 hover:scale-[1.01] transition-transform duration-500 animate-float-slow">
                <Image
                  src="/hero_visual.png"
                  alt="WhatsSite Hero Mockup"
                  fill
                  sizes="(max-w-768px) 100vw, 750px"
                  className="object-contain mix-blend-multiply"
                  priority
                />
              </div>

              {/* Floating Badge A (Top Right) */}
              <div className="absolute -top-2 right-2 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg rounded-2xl p-3 flex items-center gap-2.5 z-20 animate-float-delayed">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-brand-green flex items-center justify-center text-sm font-bold shadow-inner">
                  💬
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">AI Website Gen</div>
                  <div className="text-[12px] font-black text-slate-800">100% Automatic</div>
                </div>
              </div>

              {/* Floating Badge B (Bottom Left) */}
              <div className="absolute -bottom-2 left-2 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg rounded-2xl p-3 flex items-center gap-2.5 z-20 animate-float-slow">
                <div className="w-8 h-8 rounded-lg bg-brand-green text-white flex items-center justify-center text-sm font-bold shadow-md shadow-brand-green/10">
                  ⭐
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">User Satisfaction</div>
                  <div className="text-[12px] font-black text-slate-800">4.9/5 Rating (10k+)</div>
                </div>
              </div>

            </div>
          </div>
        </div>      </section>

      {/* 3. "How It Works" Section */}
      <section id="how-it-works" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl opacity-40 pointer-events-none -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-teal-100/10 rounded-full blur-3xl opacity-40 pointer-events-none translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[12px] font-black text-brand-green uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-sm border border-emerald-100/50">
              SIMPLE ONBOARDING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              How WhatsApp Builder Works
            </h2>
            <p className="text-slate-550 text-base font-semibold leading-relaxed">
              No complex software, coding, or drag-and-drop builders. Just a simple WhatsApp chat creates your professional website.
            </p>
          </div>

          {/* Connected Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">

            {/* Left Column: Generated Phone Mockup Image */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Ambient glow behind phone */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>
              </div>
              <div className="relative w-full max-w-xs mx-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/whatsapp_onboarding_mockup.png"
                  alt="WhatsApp AI Bot onboarding chat on mobile phone"
                  width={400}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
                {/* Floating "Live" badge */}
                <div className="absolute top-6 -right-4 bg-white border border-emerald-100 shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse block"></span>
                  <span className="text-[11px] font-black text-slate-800">AI Bot Live</span>
                </div>
                {/* Floating "Generated" badge */}
                <div className="absolute bottom-10 -left-4 bg-white border border-slate-100 shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2">
                  <span className="text-base">🎉</span>
                  <div>
                    <p className="text-[10px] font-black text-slate-800 leading-tight">Website Ready!</p>
                    <p className="text-[9px] text-emerald-600 font-bold">In under 2 mins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Step-by-Step Flow List */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { num: "01", title: "Start Chat on WhatsApp", desc: "Scan our code or click START. The bot immediately registers your phone number to begin onboarding." },
                { num: "02", title: "Provide Basic Business Info", desc: "Answer simple questions regarding your business name, services, timings, and location address." },
                { num: "03", title: "Upload Media & Photos", desc: "Snap photos or attach catalog cards, logos, and testimonials directly in your chat screen." },
                { num: "04", title: "Auto-Generate Layout", desc: "Our engine maps your content into a clean, modern template tailored for your specific category." },
                { num: "05", title: "Publish & Edit Instantly", desc: "Get a free subdomain with SSL. Update content via WhatsApp or log in to the admin panel to adjust section ordering." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-5 group hover:scale-[1.01] transition-transform duration-300">
                  {/* Number bubble with connection line */}
                  <div className="flex flex-col items-center shrink-0">
                    <span className="w-10 h-10 rounded-full bg-emerald-55 text-brand-green flex items-center justify-center font-black text-sm border border-emerald-100 shadow-sm group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                      {step.num}
                    </span>
                    {idx < 4 && <div className="w-[2px] flex-1 bg-gradient-to-b from-emerald-100 to-transparent mt-2"></div>}
                  </div>
                  <div className="pb-4">
                    <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-brand-green transition-colors">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 3.5. Live Demo Section ("See Generated Websites") */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[35rem] h-[35rem] bg-emerald-150/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[12px] font-black text-brand-green uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-sm border border-emerald-100/50">
              LIVE SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              See Generated Websites
            </h2>
            <p className="text-slate-550 text-base font-semibold leading-relaxed">
              Real sites generated dynamically using our templates. Click to view high-fidelity previews.
            </p>
          </div>

          {/* High Fidelity Mockup Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Sharma Dental Clinic",
                slug: "sharma-dental",
                img: "/template_medical.png",
                badge: "Medical Theme",
                domain: "sharma-dental.whatssite.com"
              },
              {
                title: "FitZone CrossFit Gym",
                slug: "fitzone-gym",
                img: "/template_modern.png",
                badge: "Fitness Theme",
                domain: "fitzone-gym.whatssite.com"
              },
              {
                title: "The Royal Cafe & Bistro",
                slug: "royal-cafe",
                img: "/template_restaurant.png",
                badge: "Restaurant Theme",
                domain: "royal-cafe.whatssite.com"
              },
              {
                title: "Elegance Wellness Salon",
                slug: "elegance-salon",
                img: "/template_salon.png",
                badge: "Salon Theme",
                domain: "elegance-salon.whatssite.com"
              }
            ].map((demo, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-slate-350 transition-all duration-350 hover:-translate-y-1.5 group"
              >

                {/* Browser Mockup Container */}
                <div>
                  <div className="bg-slate-900 px-3.5 py-2.5 flex items-center gap-1.5 border-b border-slate-800">
                    {/* Dots */}
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                      <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                    </div>
                    {/* Mock URL bar */}
                    <div className="bg-slate-950 text-slate-500 text-[9px] px-3.5 py-0.5 rounded mx-auto truncate max-w-[150px] text-center border border-slate-800/40 font-bold">
                      {demo.domain}
                    </div>
                  </div>

                  {/* Template Image Preview */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                    <Image
                      src={demo.img}
                      alt={demo.title}
                      fill
                      sizes="(max-w-768px) 100vw, 280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card description details */}
                  <div className="p-5">
                    <span className="text-[9px] font-black text-brand-green bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-2.5 border border-emerald-100/50">
                      {demo.badge}
                    </span>
                    <h3 className="text-sm font-black text-slate-850 mb-1 leading-snug">{demo.title}</h3>
                    <p className="text-slate-400 text-[10px] font-bold">Generated instantly via chat</p>
                  </div>
                </div>

                {/* Visit button */}
                <div className="px-5 pb-5 pt-1">
                  <a
                    href={`/${demo.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-slate-900 hover:bg-brand-green hover:text-slate-950 text-white text-xs font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-slate-900/10"
                  >
                    Explore Live Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-40 pointer-events-none translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Packed with Everything You Need
            </h2>
            <p className="text-slate-500 text-base font-semibold">
              Get all the power of a custom-built website without any of the complexity.
            </p>
          </div>

          {/* Two-Column Features Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left: 3D Illustration (Proper aspect-ratio, no weird stretching) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                <Image
                  src={
                    [
                      "/feature_whatsapp_setup.png",
                      "/feature_no_coding.png",
                      "/feature_seo_domain.png",
                      "/feature_mobile_layouts.png",
                      "/feature_realtime_updates.png",
                      "/feature_secure_hosting.png"
                    ][activeFeature]
                  }
                  alt="WhatsSite Features Illustration"
                  fill
                  sizes="(max-w-768px) 100vw, 500px"
                  className="object-contain p-4 hover:scale-[1.01] transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            {/* Right: Premium Feature Carousel Slide */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full py-2">

              {/* Active Slide Card */}
              {[
                {
                  title: "Instant WhatsApp Setup",
                  desc: "No complex dashboards or forms. Simply start chatting with our WhatsApp bot, and your website is ready in under 5 minutes.",
                  icon: Zap,
                  bullets: [
                    "Start chatting with our bot in 1 click",
                    "Answers simple business details step-by-step",
                    "AI builds and deploys your website instantly"
                  ]
                },
                {
                  title: "Zero Coding Required",
                  desc: "If you can chat, you can build. No technical setup, hosting configurations, or HTML knowledge needed.",
                  icon: Wand2,
                  bullets: [
                    "No technical configurations or code files",
                    "Manage everything via chat conversations",
                    "AI handles all layout structure automatically"
                  ]
                },
                {
                  title: "SEO & Custom Domain",
                  desc: "Connect your custom domain (e.g. www.yourcompany.com) easily. All pages are pre-optimized to rank on Google.",
                  icon: Globe,
                  bullets: [
                    "Connect custom .com/.in domain in minutes",
                    "Optimized layout for Google searches",
                    "Fast static pre-rendering of pages"
                  ]
                },
                {
                  title: "Stunning Mobile Layouts",
                  desc: "Our templates are fully responsive and optimized for mobile users. Provide an exceptional experience on any device.",
                  icon: Layers,
                  bullets: [
                    "100% responsive on all mobile phone sizes",
                    "Optimized layout for fast mobile load times",
                    "Designed to drive customer conversions"
                  ]
                },
                {
                  title: "Real-time Updates",
                  desc: "Change pricing, hours, products, or services by simply messaging the WhatsApp bot. Updates go live instantly.",
                  icon: MessageSquare,
                  bullets: [
                    "Update pricing, products, or services on the go",
                    "Sync details directly from your WhatsApp chat",
                    "Edits apply instantly to your live page"
                  ]
                },
                {
                  title: "Secure Hosting & SSL",
                  desc: "Enjoy high-speed, enterprise-grade cloud hosting. Every website gets a free, automatic SSL certificate.",
                  icon: ShieldCheck,
                  bullets: [
                    "Free automatic SSL certificate (HTTPS)",
                    "Enterprise-grade secure cloud hosting",
                    "99.9% uptime SLA guarantee"
                  ]
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                const isActive = activeFeature === index;
                if (!isActive) return null;
                return (
                  <div key={index} className="flex flex-col gap-6 animate-fade-in transition-all duration-500">

                    {/* Header Slide Status */}
                    <div className="flex justify-between items-center border-b border-slate-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-green text-white flex items-center justify-center shadow-md shadow-brand-green/10">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest">
                          Feature {index + 1} of 6
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-400">
                        0{index + 1} / 06
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-550 text-base leading-relaxed font-semibold mb-6">
                        {feature.desc}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="flex flex-col gap-3 mb-8">
                      {feature.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                          <Check className="w-4 h-4 text-brand-green border-2 border-brand-green rounded-full p-0.5 mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                );
              })}

              {/* Slider Navigation Controls */}
              <div className="flex items-center justify-between border-t border-slate-200/80 pt-6 mt-2">

                {/* Dots indicators */}
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFeature(idx)}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${activeFeature === idx ? "bg-brand-green w-7" : "bg-slate-300 hover:bg-slate-400"
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveFeature((prev) => (prev - 1 + 6) % 6)}
                    className="w-11 h-11 rounded-full border-2 border-slate-200 hover:border-slate-400 hover:bg-white text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous Feature"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setActiveFeature((prev) => (prev + 1) % 6)}
                    className="w-11 h-11 rounded-full bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                    aria-label="Next Feature"
                  >
                    →
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Pick a Template That Suits You Section */}
      <section id="themes" className="py-20 bg-slate-50 border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              TEMPLATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Pick a Template That Suits You
            </h2>
            <p className="text-slate-550 text-base font-semibold">
              Beautiful, responsive templates for every business.
            </p>
          </div>

          {/* Grid of Template Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              {
                id: "modern",
                name: "Modern",
                desc: "Clean & Professional",
                img: "/template_modern.png",
                color: "bg-emerald-500",
                textColor: "text-emerald-500",
                stepNum: 1
              },
              {
                id: "restaurant",
                name: "Restaurant",
                desc: "Perfect for Food Business",
                img: "/template_restaurant.png",
                color: "bg-orange-500",
                textColor: "text-orange-500",
                stepNum: 2
              },
              {
                id: "medical",
                name: "Medical",
                desc: "Healthcare & Clinics",
                img: "/template_medical.png",
                color: "bg-blue-500",
                textColor: "text-blue-500",
                stepNum: 3
              },
              {
                id: "salon",
                name: "Salon",
                desc: "Beauty & Wellness",
                img: "/template_salon.png",
                color: "bg-pink-500",
                textColor: "text-pink-500",
                stepNum: 4
              },
              {
                id: "realestate",
                name: "Real Estate",
                desc: "Properties & Builders",
                img: "/template_realestate.png",
                color: "bg-indigo-500",
                textColor: "text-indigo-500",
                stepNum: 5
              }
            ].map((t) => {
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    // Update active theme in hero preview if matched
                    const themeMatch = themes.find(themeObj => themeObj.id === t.id);
                    if (themeMatch) {
                      setActiveTheme(t.id);
                    }
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-slate-200/60 hover:border-slate-350 hover:shadow-lg transition-all duration-350 flex flex-col group hover:-translate-y-1"
                >
                  {/* Template Preview Image */}
                  <div className="h-44 relative overflow-hidden bg-slate-100">
                    <Image
                      src={t.img}
                      alt={`${t.name} Template Preview`}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 25vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Template Card Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      {/* Step Circle with Number */}
                      <span className={`w-6 h-6 rounded-full ${t.color} text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                        {t.stepNum}
                      </span>
                      <div>
                        <h3 className="text-sm font-black text-slate-800">{t.name}</h3>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-normal">{t.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Templates button */}


        </div>
      </section>

      {/* 4.5. Premium Web Editor (Admin Panel) Section */}
      <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/3 right-0 w-[40rem] h-[40rem] bg-emerald-100/30 rounded-full blur-3xl opacity-60 pointer-events-none translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Visual mock Column */}
            <div className="lg:col-span-7 relative w-full aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-50 hover:scale-[1.01] transition-transform duration-500">
              <Image
                src="/admin_mockup_preview.png"
                alt="WhatsSite Premium Admin Web Editor Customizer Panel Mockup"
                fill
                sizes="(max-w-768px) 100vw, 750px"
                className="object-cover"
                priority
              />
            </div>

            {/* Explanation Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
              <div>
                <span className="text-[12px] font-black text-brand-green uppercase tracking-widest block mb-3.5">
                  Visual Customizer
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                  Premium Admin Panel for Complete Control
                </h2>
                <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
                  Login using your WhatsApp phone number to access our premium slate/emerald style admin dashboard. Fully customize your website details, layout order, logo, images, and website slug instantly.
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-4">
                {[
                  { title: "Drag & Drop Section Reordering", desc: "Easily shift the order of your Hero, About, Services, Gallery, Reviews, or Contact sections." },
                  { title: "Dynamic URL Address Slug Editor", desc: "Change your website's web slug address instantly in one click with built-in uniqueness check." },
                  { title: "Theme Layout Preset Picker", desc: "Select visual presets tailored perfectly for Clinics, Gyms, Restaurants, Salons, or Real Estate." },
                  { title: "Unlimited Cloud Image Uploads", desc: "Upload logos, header banners, and showcase your business gallery items directly via Cloudinary." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to action */}
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Access Admin Panel <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Stats & Client Showcase Section */}
      <section className="bg-[#0B0F19] text-white py-20 relative overflow-hidden border-t border-slate-900">
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>
        {/* Glowing background gradients */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-950/30 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 justify-items-center text-center">

            {/* Stat 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-center text-brand-green shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:border-brand-green/30 hover:scale-105 duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold mb-0.5 text-white tracking-tight">10K+</h4>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.15em]">Websites Live</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-center text-brand-green shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:border-brand-green/30 hover:scale-105 duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold mb-0.5 text-white tracking-tight">150+</h4>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.15em]">Business Categories</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-center text-brand-green shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:border-brand-green/30 hover:scale-105 duration-300">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold mb-0.5 text-white tracking-tight">99.9%</h4>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.15em]">Uptime SLA</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-center text-brand-green shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:border-brand-green/30 hover:scale-105 duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold mb-0.5 text-white tracking-tight">1.2M+</h4>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.15em]">Monthly Visitors</p>
            </div>

          </div>

          {/* Trusted Client Showcase Logos */}
          <div className="border-t border-slate-800/80 pt-12">
            <p className="text-center text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-8">
              Trusted by local leaders worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-12 sm:gap-x-16 opacity-75">
              <span className="text-slate-400 font-bold text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200 cursor-default">Sharma Dental</span>
              <span className="text-slate-400 font-bold text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200 cursor-default">The Royal Cafe</span>
              <span className="text-slate-400 font-bold text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200 cursor-default">FitZone Gym</span>
              <span className="text-slate-400 font-bold text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200 cursor-default">Bloom Boutique</span>
              <span className="text-slate-400 font-bold text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200 cursor-default">Urban Realty</span>
              <span className="text-slate-400 font-bold text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200 cursor-default">Elegance Salon</span>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section (2-Row Opposite Slider) */}
      <section className="py-20 bg-white border-t border-slate-100 overflow-hidden relative">
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-custom {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .animate-marquee-reverse-custom {
            display: flex;
            width: max-content;
            animation: marquee-reverse 40s linear infinite;
          }
        `}</style>

        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Loved by Thousands of Businesses
            </h2>
            <p className="text-slate-500 text-base font-semibold">
              Read how small businesses are scaling with WhatsSite.
            </p>
          </div>
        </div>

        {/* Marquee Rows Wrapper */}
        <div className="flex flex-col gap-6 w-full select-none">

          {/* Row 1: Left Scrolling */}
          <div className="relative w-full flex items-center overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

            <div className="animate-marquee-custom flex gap-6">
              {[...testimonialsRow1, ...testimonialsRow1].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[320px] sm:w-[360px] bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 shrink-0"
                >
                  <p className="text-slate-650 text-sm leading-relaxed mb-6 font-medium italic">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right Scrolling */}
          <div className="relative w-full flex items-center overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

            <div className="animate-marquee-reverse-custom flex gap-6">
              {[...testimonialsRow2, ...testimonialsRow2].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[320px] sm:w-[360px] bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 shrink-0"
                >
                  <p className="text-slate-650 text-sm leading-relaxed mb-6 font-medium italic">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6.2. Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 border-t border-b border-slate-100 relative overflow-hidden">
        {/* Decorative blur gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[12px] font-black text-brand-green uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-sm border border-emerald-100/50">
              PRICING PLANS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Simple, Transparent Premium Pricing
            </h2>
            <p className="text-slate-550 text-base font-semibold leading-relaxed">
              Create your website for free and upgrade when you need custom branding or a personal domain. No hidden charges.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">

            {/* Plan 1: Free */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-2">Free Starter</h3>
                  <p className="text-slate-450 text-xs font-bold leading-normal">Build your web presence instantly</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                  <span className="text-slate-400 text-xs font-bold">/ forever</span>
                </div>

                <hr className="border-slate-100 my-6" />

                <ul className="space-y-4">
                  {[
                    "1 AI-Generated Website",
                    "whatssite.com/slug subdomain",
                    "Edit info via WhatsApp bot",
                    "Fully mobile-responsive layout",
                    "Standard hosting with SSL",
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600">
                      <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {[
                    "No custom domain support",
                    "WhatsSite logo badge in footer"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-350">
                      <span className="text-slate-300 shrink-0 select-none mt-0.5 w-4 h-4 text-center">×</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/14155238886?text=join%20thee-unknown"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center bg-slate-900 hover:bg-slate-850 text-white py-3.5 rounded-full font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Get Started Free
                </a>
              </div>
            </div>

            {/* Plan 2: Pro (Premium Highlighted) */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5 transition-all duration-350">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-brand-green text-slate-950 text-[10px] font-black tracking-widest uppercase px-5 py-2 rounded-bl-2xl shadow-sm">
                MOST POPULAR
              </div>
              {/* Background glow inside */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    Premium Pro <Sparkles className="w-4.5 h-4.5 text-brand-green animate-pulse" />
                  </h3>
                  <p className="text-slate-450 text-xs font-bold leading-normal">The complete toolset for local businesses</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">$9</span>
                  <span className="text-slate-400 text-xs font-bold">/ month</span>
                </div>

                <hr className="border-slate-800 my-6" />

                <ul className="space-y-4">
                  {[
                    "Everything in Free starter",
                    "Connect Custom Domain (yourname.com)",
                    "Access Admin Web Editor Settings",
                    "Change slug & section ordering dynamically",
                    "Unlimited high-res cloud image uploads",
                    "Remove WhatsSite logo branding footer",
                    "Google Maps SEO priority indexing",
                    "Priority WhatsApp Bot customer service",
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-100">
                      <Check className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/14155238886?text=join%20thee-unknown"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center bg-brand-green hover:bg-brand-green-hover text-slate-950 py-4 rounded-full font-black text-xs shadow-lg shadow-brand-green/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-2">Agency Unlimited</h3>
                  <p className="text-slate-450 text-xs font-bold leading-normal">For web developers and agencies</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900">$29</span>
                  <span className="text-slate-400 text-xs font-bold">/ month</span>
                </div>

                <hr className="border-slate-100 my-6" />

                <ul className="space-y-4">
                  {[
                    "Up to 10 active business websites",
                    "Unlimited templates & layout changes",
                    "Dedicated support account manager",
                    "Custom script injections (Analytics/Chatbots)",
                    "Automatic domain configuration support",
                    "Client transfer capabilities",
                    "API access to lead sync triggers",
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600">
                      <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/14155238886?text=join%20thee-unknown"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center bg-slate-900 hover:bg-slate-850 text-white py-3.5 rounded-full font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Contact Sales Bot
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6.3. FAQ Section */}
      <section id="faq" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/3 left-0 w-[30rem] h-[30rem] bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">

            {/* Left side: Sticky info panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
              <div>
                <span className="text-[12px] font-black text-brand-green uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-sm border border-emerald-100/50">
                  FAQ
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-550 text-sm sm:text-base font-semibold leading-relaxed">
                  Got questions about how WhatsSite works, custom domains, or managing your account? Find your quick answers here.
                </p>
              </div>

              {/* Mini CTA card */}
              <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-900/40 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green rounded-full blur-2xl opacity-10 pointer-events-none"></div>
                <h3 className="font-bold text-sm text-brand-green mb-2">💬 Need live assistance?</h3>
                <p className="text-[11px] text-slate-350 font-semibold leading-relaxed mb-4">
                  Our friendly automated support bot on WhatsApp is online 24/7 to resolve queries. Click below to start chatting.
                </p>
                <a
                  href="https://wa.me/14155238886?text=Hi%20WhatsSite%20Support%20I%20have%20a%20question"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-hover text-slate-950 px-5 py-2.5 rounded-full font-extrabold text-[11px] transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" /> Chat Support Bot
                </a>
              </div>
            </div>

            {/* Right side: Accordion */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                        ? "bg-slate-50 border-slate-300 shadow-md"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                      }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-bold text-slate-800 text-sm sm:text-base leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "transform rotate-180 text-emerald-500" : ""
                          }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed border-t border-slate-200/50">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 6.4. See WhatsSite in Action Section */}
      <section className="py-20 bg-[#0B0F19] text-white relative overflow-hidden border-t border-slate-900">
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>
        {/* Glowing background gradients */}
        <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-emerald-950/20 rounded-full blur-3xl opacity-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            {/* Left side: Texts */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
                TRY DEMO
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                See WhatsSite in Action
              </h2>
              <p className="text-slate-400 text-base mb-8 max-w-md font-semibold">
                Experience the power of AI website builder.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/14155238886?text=join%20thee-unknown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-brand-green-hover text-white px-7 py-3 rounded-full font-bold shadow-md transition-all hover:scale-[1.02] text-center"
                >
                  Try Demo
                </a>
                <button
                  onClick={() => alert("Demo video is coming soon!")}
                  className="bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 px-7 py-3.5 rounded-full font-bold transition-all shadow-sm"
                >
                  Watch Video
                </button>
              </div>
            </div>

            {/* Right side: Mockup */}
            <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-850 overflow-hidden relative">
              {/* Browser bar */}
              <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-amber-500/80 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-emerald-500/80 rounded-full"></span>
                </div>
                <div className="bg-slate-950/80 text-[10px] text-slate-500 px-4 py-1.5 rounded mx-auto truncate max-w-[200px] text-center border border-slate-800/40">
                  sharma-clinic.whatssite.com
                </div>
              </div>

              {/* Website mock container */}
              <div className="p-0 select-none">
                {/* Header mock */}
                <div className="border-b border-slate-800/60 py-3.5 px-5 flex justify-between items-center bg-slate-900">
                  <span className="text-[12px] font-bold text-slate-200 flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-white font-extrabold">Y</span>
                    Your Business
                  </span>
                  <div className="flex gap-3 text-[9px] font-bold text-slate-400">
                    <span className="text-emerald-400">Home</span>
                    <span>About</span>
                    <span>Services</span>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Hero banner mock */}
                <div className="grid grid-cols-12 items-center bg-slate-950/40">
                  <div className="col-span-6 p-6">
                    <h3 className="text-base font-black text-slate-100 leading-snug mb-1">
                      Best Business Solutions
                    </h3>
                    <p className="text-[9px] text-slate-400 font-semibold mb-3 leading-normal">
                      We provide thermal solutions for your personal and business growth.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3.5 py-1.5 rounded shadow-sm">
                      Get Started
                    </button>
                  </div>
                  <div className="col-span-6 relative w-full h-[140px] bg-slate-900">
                    <Image
                      src="/demo_team.png"
                      alt="Business Team Collaborating"
                      fill
                      sizes="(max-w-768px) 100vw, 350px"
                      className="object-cover opacity-90"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. Contact Us Section */}
      <section id="contact" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              We'd Love to Hear From You
            </h2>
            <p className="text-slate-500 text-base font-semibold">
              Have questions? Our support team is here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
            {/* Contact Form Left */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-slate-200 shadow-md flex flex-col justify-between">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-green text-sm transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-green text-sm transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-green text-sm transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-green text-sm transition-all resize-none"
                    placeholder="Tell us about your business or question..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-4 rounded-lg font-bold shadow-lg shadow-brand-green/20 transition-all duration-300 hover:scale-[1.01]"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info Cards Right */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">

              {/* WhatsApp Quick CTA */}
              <div className="bg-emerald-950 text-white rounded-2xl p-8 shadow-md relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-36 h-36 bg-brand-green rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <span className="text-brand-green">💬</span> Instant Bot Support
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Connect directly to our onboarding bot on WhatsApp to clear your doubts, resolve account issues, or get website setup tips.
                  </p>
                </div>
                <a
                  href="https://wa.me/14155238886?text=join%20thee-unknown"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-green hover:bg-brand-green-hover text-white text-center py-3.5 px-6 rounded-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 w-full"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Chat with Support Bot
                </a>
              </div>

              {/* Direct Info Details */}
              <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200 flex-1 flex flex-col gap-6 justify-center">

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/40 text-brand-green flex items-center justify-center shrink-0">
                    📧
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Email Support</h4>
                    <a href="mailto:support@whatssite.com" className="text-slate-500 text-sm hover:text-brand-green transition-colors">
                      support@whatssite.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/40 text-brand-green flex items-center justify-center shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Twilio Sandbox Line</h4>
                    <span className="text-slate-550 text-sm font-semibold">
                      +1 (570) 989-8569
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/40 text-brand-green flex items-center justify-center shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Office Location</h4>
                    <span className="text-slate-550 text-sm leading-relaxed font-semibold">
                      Silicon Valley, CA, USA / New Delhi, India
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Newsletter/CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 via-teal-50/30 to-emerald-50 border-t border-b border-emerald-100/50 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Left Column: Icon + Text */}
            <div className="flex items-center gap-4 text-center lg:text-left flex-col sm:flex-row">
              <div className="w-14 h-14 bg-brand-green rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-green/25 shrink-0">
                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11h2v2H9v-2zm4 0h2v2h-2v-2zm-8 0h2v2H5v-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">
                  Ready to grow your business?
                </h3>
                <p className="text-slate-600 text-sm font-semibold mt-1">
                  Join thousands of businesses using WhatsSite
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full lg:w-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for subscribing!");
                }}
                className="w-full max-w-md bg-white p-1.5 rounded-full flex items-center shadow-lg border border-slate-200 focus-within:ring-2 focus-within:ring-brand-green/20 focus-within:border-brand-green transition-all"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-5 py-3 text-sm focus:outline-none text-slate-800 placeholder-slate-400 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-brand-green hover:bg-brand-green-hover text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  Join Now
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="relative bg-[#020d0a] text-slate-400 pt-20 pb-8 border-t border-emerald-950/60 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-emerald-950/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Main Footer Links & Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-emerald-950/50">

            {/* Column 1: Brand & Socials & WhatsApp Support Button */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-white font-bold text-2xl cursor-pointer">
                <Image
                  src="/logo.png"
                  alt="WhatsSite Logo"
                  width={40}
                  height={40}
                  className="rounded-xl shadow-md shadow-brand-green/20"
                />
                <span>Whats<span className="text-brand-green">Site</span></span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-medium">
                Empowering local businesses and creators to launch professional, lightning-fast websites directly through a simple WhatsApp conversation.
              </p>

              {/* WhatsApp Support Button */}
              <div>
                <a
                  href="https://wa.me/14155238886?text=join%20thee-unknown"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-slate-950 px-5 py-2.5 rounded-full font-black text-xs transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10"
                >
                  <Phone className="w-4 h-4 fill-current" /> WhatsApp Support
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-2">
                {[
                  { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>, url: "#" },
                  { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>, url: "#" },
                  { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.5 6.163C0 8.017 0 12 0 12s0 3.983.5 5.837a3.003 3.003 0 002.11 2.108c1.858.555 9.388.555 9.388.555s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.983 24 12 24 12s0-3.983-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>, url: "#" },
                  { icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, url: "#" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="w-9 h-9 rounded-full bg-emerald-950/50 border border-emerald-900/40 text-slate-350 flex items-center justify-center hover:bg-brand-green hover:border-brand-green hover:text-slate-950 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Product Links */}
            <div className="lg:col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-[13px] uppercase tracking-wider mb-5">Product</h4>
              <ul className="flex flex-col gap-3 text-sm font-semibold">
                <li><Link href="/admin" className="hover:text-brand-green transition-colors duration-200">Admin Login</Link></li>
                <li><Link href="/admin" className="hover:text-brand-green transition-colors duration-200">Web Editor Panel</Link></li>
                <li><a href="#themes" className="hover:text-brand-green transition-colors duration-200">Live Themes</a></li>
                <li><a href="https://wa.me/14155238886" target="_blank" rel="noreferrer" className="hover:text-brand-green transition-colors duration-200">WhatsApp Sandbox</a></li>
              </ul>
            </div>

            {/* Column 3: Theme Previews */}
            <div className="lg:col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-[13px] uppercase tracking-wider mb-5">Templates</h4>
              <ul className="flex flex-col gap-3 text-sm font-semibold">
                <li><a href="#themes" className="hover:text-brand-green transition-colors duration-200">Dental Clinic</a></li>
                <li><a href="#themes" className="hover:text-brand-green transition-colors duration-200">Fitness Gym</a></li>
                <li><a href="#themes" className="hover:text-brand-green transition-colors duration-200">Restaurant Cafe</a></li>
                <li><a href="#themes" className="hover:text-brand-green transition-colors duration-200">Beauty Salon</a></li>
                <li><a href="#themes" className="hover:text-brand-green transition-colors duration-200">Real Estate</a></li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="lg:col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-[13px] uppercase tracking-wider mb-5">Resources</h4>
              <ul className="flex flex-col gap-3 text-sm font-semibold">
                <li><a href="#how-it-works" className="hover:text-brand-green transition-colors duration-200">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-brand-green transition-colors duration-200">Pricing Plans</a></li>
                <li><a href="#faq" className="hover:text-brand-green transition-colors duration-200">FAQs & Help</a></li>
                <li><a href="#" className="hover:text-brand-green transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Column 5: Mini CTA */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h4 className="text-white font-bold text-[13px] uppercase tracking-wider mb-1">Create Now</h4>
              <div className="bg-emerald-950/40 border border-emerald-900/30 p-4 rounded-2xl">
                <p className="text-xs text-slate-350 font-bold leading-normal mb-3">
                  Send "START" on our WhatsApp bot line to build your professional site in 5 minutes!
                </p>
                <a
                  href="https://wa.me/14155238886?text=START"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-brand-green hover:bg-brand-green-hover text-slate-950 py-2.5 rounded-xl font-extrabold text-[11px] transition-all hover:scale-[1.02]"
                >
                  Message START
                </a>
              </div>
            </div>

          </div>

          {/* Bottom copyright & Links */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-semibold gap-4 relative z-20">
            <span>© 2026 WhatsSite. All rights reserved. Built for modern local businesses.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>

        </div>

      </footer>
    </div>
  );
}
