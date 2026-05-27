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
      a: "Absolutely! We provide a free subdomain (e.g., yourname.siteonwhatsapp.com), and you can connect your own domain (e.g., www.yourbusiness.com) easily from our dashboard."
    },
    {
      q: "How do I edit or update my website?",
      a: "You can update your website details directly through WhatsApp! Just chat with the bot to add new services, change timings, or upload new images, and it will sync instantly."
    },
    {
      q: "Are the websites mobile responsive?",
      a: "Yes, every website built by SiteOnWhatsApp is fully optimized for mobile devices, tablets, and desktop computers to ensure a seamless experience."
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
              <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-green/20">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.86.001-2.638-1.024-5.117-2.884-6.979C16.587 1.91 14.113.887 11.483.887c-5.443 0-9.866 4.418-9.868 9.861-.001 1.737.457 3.432 1.328 4.931l-1.008 3.682 3.771-.989z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                SiteOn<span className="text-brand-green">WhatsApp</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
              <a href="#how-it-works" className="hover:text-brand-green transition-colors">How It Works</a>
              <a href="#features" className="hover:text-brand-green transition-colors">Features</a>
              <a href="#themes" className="hover:text-brand-green transition-colors">Themes</a>
              <a href="#pricing" className="hover:text-brand-green transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-brand-green transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-brand-green transition-colors">Contact</a>
            </nav>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-5">
              <a href="#" className="text-[15px] font-semibold text-slate-700 hover:text-brand-green transition-colors">
                Log in
              </a>
              <Link
                href="/onboarding"
                className="bg-brand-green hover:bg-brand-green-hover text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-brand-green/20 hover:scale-[1.02]"
              >
                Get Started
              </Link>
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
              Themes
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
              <a
                href="#"
                className="text-center font-bold py-3 text-slate-700 hover:text-brand-green transition-colors"
              >
                Log in
              </a>
              <Link
                href="/onboarding"
                className="bg-brand-green hover:bg-brand-green-hover text-white text-center py-3.5 rounded-full font-bold shadow-lg shadow-brand-green/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40 pointer-events-none -translate-x-1/2"></div>
        <div className="absolute bottom-10 right-0 w-[40rem] h-[40rem] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-brand-green-dark text-[13px] font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Website Builder on WhatsApp</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] lg:leading-[1.15] font-extrabold text-slate-900 tracking-tight mb-6">
                Get Your Business Website Live{" "}
                <span className="text-brand-green">in 5 Minutes</span>, Right on WhatsApp!
              </h1>

              {/* Description */}
              <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                No coding. No hassle. Just chat with our bot, send your business details, and we'll build your professional website instantly.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                <Link
                  href="/onboarding"
                  className="bg-brand-green hover:bg-brand-green-hover text-white px-8 py-4.5 rounded-full font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-brand-green/30 hover:shadow-brand-green/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-[16px]"
                >
                  <Phone className="w-5 h-5 fill-current" />
                  Start Onboarding
                </Link>
                <a
                  href="#themes"
                  className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 px-8 py-4.5 rounded-full font-bold flex items-center justify-center gap-2 hover:border-slate-300 transition-all duration-300 text-[16px]"
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

            {/* Hero Right Visuals (CSS mockups with interactive theme engine) */}
            <div className="lg:col-span-6 relative w-full h-[540px] sm:h-[600px] md:h-[640px] mt-10 lg:mt-0 select-none">

              {/* Desktop Browser Mockup (Fades/changes based on activeTheme) */}
              <div className="absolute right-0 top-6 w-[88%] sm:w-[82%] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden transition-all duration-500 z-10 hover:shadow-emerald-950/10">
                {/* Browser top bar */}
                <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
                  </div>
                  <div className="bg-white/80 text-[11px] text-slate-400 font-medium px-4 py-1.5 rounded-md flex-1 text-center max-w-[260px] mx-auto truncate flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></span>
                    sharma-clinic.siteonwhatsapp.com
                  </div>
                </div>

                {/* Simulated Generated Page Website Preview */}
                <div className="p-0 select-none">
                  {/* Website Header */}
                  <div className="border-b border-slate-100 py-3.5 px-5 bg-white flex justify-between items-center">
                    <span className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                      <span className={`w-3.5 h-3.5 rounded-full ${currentThemeData.accent} flex items-center justify-center text-[8px] text-white font-extrabold`}>
                        {currentThemeData.name[0]}
                      </span>
                      {currentThemeData.businessName}
                    </span>
                    <div className="flex gap-3 text-[10px] font-bold text-slate-500">
                      <span className={`${currentThemeData.textAccent} cursor-pointer`}>Home</span>
                      <span className="hover:text-slate-800">About</span>
                      <span className="hover:text-slate-800">Services</span>
                      <span className="hover:text-slate-800">Contact</span>
                    </div>
                  </div>

                  {/* Website Hero Container */}
                  <div className={`p-5 sm:p-7 ${currentThemeData.lightBg} grid grid-cols-12 gap-4 items-center`}>

                    {/* Website Hero Text Left */}
                    <div className="col-span-7 pr-1">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight mb-1.5">
                        {currentThemeData.heading}
                      </h4>
                      <p className="text-[9px] text-slate-500 leading-relaxed mb-3.5 font-medium">
                        {currentThemeData.subheading}
                      </p>
                      <button className={`${currentThemeData.accent} text-white font-bold text-[9px] px-3.5 py-1.5 rounded-md hover:brightness-95 shadow-sm`}>
                        {currentThemeData.btnText}
                      </button>
                    </div>

                    {/* Website Hero Image/Preview Right */}
                    <div className="col-span-5 relative w-full h-[90px] sm:h-[120px] rounded-lg overflow-hidden bg-slate-200 border border-slate-100 flex items-center justify-center">
                      {activeTheme === "medical" && (
                        <Image
                          src="/dentist.png"
                          alt="Dentist Preview"
                          fill
                          sizes="(max-w-700px) 150px, 200px"
                          style={{ objectFit: "cover" }}
                          priority
                        />
                      )}
                      {activeTheme === "gym" && (
                        <div className="flex flex-col items-center justify-center text-center p-2 h-full w-full bg-slate-950 text-white relative">
                          <span className="text-[20px] mb-0.5">🏋️‍♂️</span>
                          <span className="text-[9px] font-black tracking-wide uppercase text-red-500">FitZone Premium</span>
                          <span className="text-[6px] text-slate-400 font-medium">Work Hard, Dream Big</span>
                        </div>
                      )}
                      {activeTheme === "restaurant" && (
                        <div className="flex flex-col items-center justify-center text-center p-2 h-full w-full bg-amber-950 text-white relative">
                          <span className="text-[20px] mb-0.5">☕</span>
                          <span className="text-[9px] font-bold tracking-wide uppercase text-amber-400">The Royal Cafe</span>
                          <span className="text-[6px] text-amber-200/60 font-medium">Brewed Fresh Daily</span>
                        </div>
                      )}
                      {activeTheme === "salon" && (
                        <div className="flex flex-col items-center justify-center text-center p-2 h-full w-full bg-pink-900 text-white relative">
                          <span className="text-[20px] mb-0.5">✨</span>
                          <span className="text-[9px] font-bold tracking-wide uppercase text-pink-200">Elegance Salon</span>
                          <span className="text-[6px] text-pink-300/70 font-medium">Style & Comfort</span>
                        </div>
                      )}
                      {activeTheme === "realestate" && (
                        <div className="flex flex-col items-center justify-center text-center p-2 h-full w-full bg-teal-950 text-white relative">
                          <span className="text-[20px] mb-0.5">🏢</span>
                          <span className="text-[9px] font-bold tracking-wide uppercase text-teal-300">Urban Realty</span>
                          <span className="text-[6px] text-teal-100/60 font-medium">Premium Living</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Website Services Section */}
                  <div className="p-5 sm:p-6 bg-white">
                    <h5 className="text-[11px] font-extrabold text-center text-slate-700 mb-4">Our Services</h5>

                    <div className="grid grid-cols-4 gap-2">
                      {currentThemeData.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-100 p-1.5 sm:p-2 rounded-lg text-center flex flex-col items-center justify-center hover:scale-[1.03] transition-transform duration-300"
                        >
                          {/* Service Dot */}
                          <div className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full ${currentThemeData.lightBg} flex items-center justify-center mb-1`}>
                            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${currentThemeData.dotColor}`}></span>
                          </div>
                          <span className="text-[6.5px] sm:text-[8px] font-extrabold text-slate-800 leading-snug truncate max-w-full">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Smartphone WhatsApp Chat Simulator Mockup */}
              <div className="absolute left-0 bottom-6 w-[240px] sm:w-[260px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl z-20 border-[4px] border-slate-800 scale-[0.9] sm:scale-100 transform -translate-x-2 sm:-translate-x-6 hover:-translate-y-1 transition-transform duration-300">
                {/* Phone Notch/Speaker */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-2xl flex justify-center items-center gap-1 z-30">
                  <span className="w-8 h-1 bg-slate-700 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-slate-800 rounded-full border border-slate-700"></span>
                </div>

                {/* Internal Screen Container */}
                <div className="bg-[#efeae2] rounded-[2rem] overflow-hidden flex flex-col h-[480px] w-full border border-slate-950 relative">

                  {/* WhatsApp Top Status Bar */}
                  <div className="bg-[#075E54] text-white px-3.5 pt-6 pb-3.5 flex items-center justify-between shadow-sm relative">
                    <div className="flex items-center gap-2">
                      <div className="w-7.5 h-7.5 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20">
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.86.001-2.638-1.024-5.117-2.884-6.979C16.587 1.91 14.113.887 11.483.887c-5.443 0-9.866 4.418-9.868 9.861-.001 1.737.457 3.432 1.328 4.931l-1.008 3.682 3.771-.989z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[11px] font-extrabold flex items-center gap-1">
                          SiteOnWhatsApp Bot
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                        </div>
                        <span className="text-[8px] text-emerald-200/90 font-medium">Online</span>
                      </div>
                    </div>

                    {/* Phone/Options Icons */}
                    <div className="flex gap-2.5 text-white/80">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </div>
                  </div>

                  {/* Chat Message Thread area */}
                  <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 text-[9.5px]">

                    {/* Bot Message 1 */}
                    <div className="bg-white text-slate-800 p-2 rounded-r-lg rounded-bl-lg max-w-[85%] self-start shadow-sm border border-white/50">
                      <p className="leading-normal font-medium">Hi there! 👋 Let's build your business website.</p>
                      <span className="block text-[7px] text-slate-400 text-right mt-1">10:30 AM</span>
                    </div>

                    {/* Bot Message 2 */}
                    <div className="bg-white text-slate-800 p-2 rounded-r-lg rounded-bl-lg max-w-[85%] self-start shadow-sm border border-white/50">
                      <p className="leading-normal font-medium">Great! What's your business name?</p>
                      <span className="block text-[7px] text-slate-400 text-right mt-1">10:30 AM</span>
                    </div>

                    {/* User Reply 1 */}
                    <div className="bg-[#dcf8c6] text-slate-800 p-2 rounded-l-lg rounded-br-lg max-w-[85%] self-end shadow-sm border border-[#dcf8c6]/50">
                      <p className="leading-normal font-medium">Sharma Dental Clinic</p>
                      <span className="text-[7px] text-slate-400 flex items-center justify-end gap-0.5 mt-1">
                        10:31 AM
                        <Check className="w-2.5 h-2.5 text-blue-500" />
                      </span>
                    </div>

                    {/* Bot Message 3 */}
                    <div className="bg-white text-slate-800 p-2 rounded-r-lg rounded-bl-lg max-w-[85%] self-start shadow-sm border border-white/50">
                      <p className="leading-normal font-medium">Awesome! Please send me your logo.</p>
                      <span className="block text-[7px] text-slate-400 text-right mt-1">10:32 AM</span>
                    </div>

                    {/* User Reply 2 (Logo bubble) */}
                    <div className="bg-[#dcf8c6] text-slate-800 p-2.5 rounded-l-lg rounded-br-lg max-w-[85%] self-end shadow-sm border border-[#dcf8c6]/50">
                      <div className="border border-emerald-200/50 bg-white p-2.5 rounded-lg flex flex-col items-center justify-center gap-1.5 shadow-inner">
                        <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                          🦷
                        </span>
                        <span className="text-[8px] font-extrabold tracking-wide uppercase text-blue-700">SHARMA</span>
                        <span className="text-[6px] text-slate-400 font-bold -mt-1.5">DENTAL CLINIC</span>
                      </div>
                      <span className="text-[7px] text-slate-400 flex items-center justify-end gap-0.5 mt-1">
                        10:32 AM
                        <Check className="w-2.5 h-2.5 text-blue-500" />
                      </span>
                    </div>

                    {/* Bot Message 4 */}
                    <div className="bg-white text-slate-800 p-2 rounded-r-lg rounded-bl-lg max-w-[85%] self-start shadow-sm border border-white/50">
                      <p className="leading-normal font-medium">Perfect! Choose a theme for your website.</p>
                      <span className="block text-[7px] text-slate-400 text-right mt-1">10:32 AM</span>
                    </div>

                    {/* Interactive Active Theme status on WhatsApp */}
                    <div className="bg-white text-slate-800 rounded-lg max-w-[85%] self-start shadow-md border border-slate-100 overflow-hidden">
                      <div className="bg-slate-50 border-b border-slate-150 p-2 font-extrabold text-[8px] uppercase tracking-wider text-slate-500 flex justify-between items-center">
                        <span>Interactive Prompt</span>
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      </div>
                      <div className="p-2.5 flex flex-col gap-2">
                        <span className="text-[9px] text-slate-600">Click a theme option to update the preview:</span>

                        <div className="grid grid-cols-2 gap-1.5">
                          {themes.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setActiveTheme(t.id)}
                              className={`text-[8.5px] font-bold py-1.5 px-2 rounded border text-left flex items-center justify-between transition-all ${activeTheme === t.id
                                  ? "bg-emerald-50 border-brand-green text-brand-green-dark shadow-sm"
                                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                              {t.name}
                              {activeTheme === t.id && <Check className="w-2.5 h-2.5 text-brand-green" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Bar bottom */}
                  <div className="p-2.5 bg-[#f0f0f0] border-t border-slate-200 flex items-center gap-2">
                    <div className="bg-white rounded-full flex-1 px-3 py-2 flex items-center justify-between border border-slate-100">
                      <span className="text-slate-400 text-[9px] font-semibold">Type a message</span>
                      <div className="flex gap-2 text-slate-400">
                        <span>📎</span>
                        <span>📷</span>
                      </div>
                    </div>
                    <div className="w-7.5 h-7.5 bg-[#008f6c] rounded-full flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200">
                      🎙️
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "How It Works" Section */}
      <section id="how-it-works" className="py-20 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Three Simple Steps
            </h2>
            <p className="text-slate-500 text-base font-semibold">
              From chat to website in just 3 easy steps.
            </p>
          </div>

          {/* Three steps container */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

            {/* Connecting lines on Desktop */}
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 pointer-events-none z-0">
              <svg className="w-full h-4" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                  className="opacity-20"
                />
                <circle cx="50" cy="50" r="3" fill="#10b981" className="opacity-40 animate-ping" />
              </svg>
              {/* Arrows */}
              <div className="absolute top-1/2 left-[30%] -translate-y-1/2 text-brand-green opacity-40 font-bold">➔</div>
              <div className="absolute top-1/2 left-[70%] -translate-y-1/2 text-brand-green opacity-40 font-bold">➔</div>
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 hover:scale-[1.02] transition-transform duration-300">
              {/* Step Circle */}
              <div className="w-[104px] h-[104px] rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shadow-inner mb-6 relative">
                <div className="w-[84px] h-[84px] rounded-full bg-emerald-100/40 flex items-center justify-center">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.86.001-2.638-1.024-5.117-2.884-6.979C16.587 1.91 14.113.887 11.483.887c-5.443 0-9.866 4.418-9.868 9.861-.001 1.737.457 3.432 1.328 4.931l-1.008 3.682 3.771-.989z" />
                  </svg>
                </div>
                {/* Step Number Tag */}
                <span className="absolute bottom-0 right-1 w-6.5 h-6.5 rounded-full bg-brand-green text-white text-[11px] font-bold flex items-center justify-center shadow">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">Chat on WhatsApp</h3>
              <p className="text-slate-500 text-sm max-w-[270px] leading-relaxed">
                Start a conversation with our bot and share your business details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 hover:scale-[1.02] transition-transform duration-300">
              {/* Step Circle */}
              <div className="w-[104px] h-[104px] rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shadow-inner mb-6 relative">
                <div className="w-[84px] h-[84px] rounded-full bg-emerald-100/40 flex items-center justify-center">
                  <Wand2 className="w-10 h-10" />
                </div>
                <span className="absolute bottom-0 right-1 w-6.5 h-6.5 rounded-full bg-brand-green text-white text-[11px] font-bold flex items-center justify-center shadow">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">We Build Your Website</h3>
              <p className="text-slate-500 text-sm max-w-[270px] leading-relaxed">
                Our system creates a beautiful, professional website instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 hover:scale-[1.02] transition-transform duration-300">
              {/* Step Circle */}
              <div className="w-[104px] h-[104px] rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shadow-inner mb-6 relative">
                <div className="w-[84px] h-[84px] rounded-full bg-emerald-100/40 flex items-center justify-center">
                  <Globe className="w-10 h-10" />
                </div>
                <span className="absolute bottom-0 right-1 w-6.5 h-6.5 rounded-full bg-brand-green text-white text-[11px] font-bold flex items-center justify-center shadow">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">Go Live Instantly</h3>
              <p className="text-slate-500 text-sm max-w-[270px] leading-relaxed">
                Your website is live on our domain. Share it with the world!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Beautiful Themes Section (Interactive Showcase) */}
      <section id="themes" className="py-20 bg-slate-50 border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              Beautiful Themes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Pick a Theme That Suits You
            </h2>
            <p className="text-slate-500 text-base font-semibold">
              Find layouts engineered for conversions, customized dynamically by AI.
            </p>
          </div>

          {/* Grid of Theme Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {themes.map((t) => {
              const isSelected = activeTheme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setActiveTheme(t.id);
                    // Smooth scroll to top visual mockup on desktop
                    const targetEl = document.getElementById("how-it-works");
                    if (targetEl) {
                      targetEl.scrollIntoView({ behavior: "smooth", block: "end" });
                    }
                  }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border-2 transition-all duration-300 flex flex-col group ${isSelected ? "border-brand-green ring-2 ring-emerald-500/20 scale-[1.03]" : "border-transparent hover:border-slate-350 hover:shadow-lg"
                    }`}
                >

                  {/* Miniature CSS layout screenshot */}
                  <div className={`h-36 ${t.lightBg} p-3 flex flex-col justify-between select-none relative overflow-hidden border-b border-slate-100`}>

                    {/* Header bar mock */}
                    <div className="flex justify-between items-center opacity-70">
                      <span className="text-[8px] font-extrabold text-slate-700">{t.businessName}</span>
                      <div className="flex gap-1.5 text-[5px] font-bold text-slate-400">
                        <span className="text-brand-green">●</span>
                        <span>●</span>
                        <span>●</span>
                      </div>
                    </div>

                    {/* Content mock */}
                    <div className="py-2 pr-4">
                      <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight mb-1">
                        {t.heading}
                      </h4>
                      <button className={`text-[6px] font-bold text-white px-2 py-0.5 rounded ${t.accent}`}>
                        Action
                      </button>
                    </div>

                    {/* Absolute visual circle representing image */}
                    <div className={`absolute bottom-2 right-2 w-12 h-12 rounded-lg bg-slate-300 border border-white/60 flex items-center justify-center text-[10px]`}>
                      💼
                    </div>
                  </div>

                  {/* Description Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2.5 h-2.5 rounded-full ${t.dotColor}`}></span>
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand-green transition-colors">{t.name}</h3>
                      </div>
                      <p className="text-[11.5px] text-slate-400 leading-normal line-clamp-2">{t.desc}</p>
                    </div>

                    {/* Select Badge/Status */}
                    <div className="mt-4 pt-2.5 border-t border-slate-50 flex items-center justify-between">
                      <span className={`text-[9.5px] font-bold ${isSelected ? "text-brand-green" : "text-slate-400"}`}>
                        {isSelected ? "Active Preview" : "Try Theme"}
                      </span>
                      <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-colors ${isSelected ? "bg-brand-green text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                        }`}>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* View All Themes button */}
          <div className="text-center">
            <a
              href="https://wa.me/15709898569?text=THEMES"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-dark hover:text-brand-green transition-colors border-b border-emerald-200 hover:border-brand-green pb-0.5"
            >
              View All Themes <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 5. Feature Highlights Bar */}
      <section id="features" className="bg-emerald-950 text-white py-12 relative overflow-hidden">
        {/* Absolute subtle background element */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">

            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-green shrink-0 shadow-inner">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[16px] mb-1 flex items-center gap-1.5">
                  Custom Domain
                  <span className="text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">Soon</span>
                </h4>
                <p className="text-[13px] text-slate-300 leading-normal">
                  Connect your own domain name and build your brand.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-green shrink-0 shadow-inner">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[16px] mb-1">SEO Ready</h4>
                <p className="text-[13px] text-slate-300 leading-normal">
                  All websites are SEO friendly and fully mobile responsive.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-green shrink-0 shadow-inner">
                <Settings2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[16px] mb-1">Easy to Edit</h4>
                <p className="text-[13px] text-slate-300 leading-normal">
                  Edit anytime directly from WhatsApp, no tech skills needed.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-green shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[16px] mb-1">24/7 Support</h4>
                <p className="text-[13px] text-slate-300 leading-normal">
                  Our team is available round the clock to help resolve questions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section (Interactive & Sleek) */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-base font-semibold">
              Everything you need to know about starting your website.
            </p>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? "border-brand-green bg-emerald-50/10 shadow-sm" : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left py-5 px-6 font-bold text-[16px] text-slate-800 flex justify-between items-center focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "transform rotate-180 text-brand-green" : ""}`} />
                  </button>

                  {/* Expandable Panel */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[200px] border-t border-slate-150 py-5 px-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6.3. Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[12px] font-bold text-brand-green uppercase tracking-widest block mb-3.5">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-500 text-base font-semibold">
              No hidden fees. Pay once, own your website forever.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">

            {/* Single Plan Card */}
            <div className="bg-white rounded-2xl p-8 border-2 border-brand-green shadow-xl flex flex-col justify-between relative overflow-hidden hover:scale-[1.01] transition-transform duration-300">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-extrabold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                Limited Offer
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Full Access Plan</h3>
                <p className="text-slate-400 text-xs mb-6 text-center">Get everything you need to grow your business online.</p>

                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-slate-900">₹199</span>
                    <span className="text-slate-500 text-sm font-semibold">/ website</span>
                  </div>
                  <span className="text-[10px] text-brand-green font-bold bg-emerald-50 px-2 py-0.5 rounded mt-2">One-time payment</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0" />
                    Connect your own Custom Domain (e.g. business.com)
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0" />
                    Unlock all Premium themes (Clinic, Gym, Restaurant, Salon)
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0" />
                    100% Ad-Free (No watermarks or branding)
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0" />
                    Unlimited edits directly from WhatsApp
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0" />
                    Advanced SEO tags & mobile responsive layout
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0" />
                    Priority 24/7 customer support
                  </li>
                </ul>
              </div>

              <Link
                href="/onboarding"
                className="w-full text-center bg-brand-green hover:bg-brand-green-hover text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-green/20 block text-[15px]"
              >
                Create Your Website
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. Contact Us Section */}
      <section id="contact" className="py-20 bg-white border-t border-slate-100">
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
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-8 border border-slate-150 flex flex-col justify-between">
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
                  href="https://wa.me/15709898569?text=SUPPORT"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-green hover:bg-brand-green-hover text-white text-center py-3.5 px-6 rounded-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 w-full"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Chat with Support Bot
                </a>
              </div>

              {/* Direct Info Details */}
              <div className="bg-slate-50 rounded-2xl p-8 shadow-md border border-slate-150 flex-1 flex flex-col gap-6 justify-center">

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/40 text-brand-green flex items-center justify-center shrink-0">
                    📧
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Email Support</h4>
                    <a href="mailto:support@siteonwhatsapp.com" className="text-slate-500 text-sm hover:text-brand-green transition-colors">
                      support@siteonwhatsapp.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/40 text-brand-green flex items-center justify-center shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">Twilio Sandbox Line</h4>
                    <span className="text-slate-500 text-sm">
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
                    <span className="text-slate-500 text-sm leading-relaxed">
                      Silicon Valley, CA, USA / New Delhi, India
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA (Grow your business) */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-emerald-50/40 border-t border-slate-100 relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-slate-600 font-semibold mb-8 text-base max-w-md mx-auto leading-relaxed">
            Start on WhatsApp and get your website live today!
          </p>

          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2.5 bg-brand-green hover:bg-brand-green-hover text-white px-9 py-5 rounded-full font-extrabold shadow-xl shadow-brand-green/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-[16px]"
          >
            <Phone className="w-5 h-5 fill-current" />
            Start Onboarding
          </Link>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Footer Links & Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">

            {/* Logo/About column */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4 cursor-pointer">
                <div className="w-9 h-9 bg-brand-green rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.86.001-2.638-1.024-5.117-2.884-6.979C16.587 1.91 14.113.887 11.483.887c-5.443 0-9.866 4.418-9.868 9.861-.001 1.737.457 3.432 1.328 4.931l-1.008 3.682 3.771-.989z" />
                  </svg>
                </div>
                <span>SiteOn<span className="text-brand-green">WhatsApp</span></span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Building digital presence for small businesses, one chat at a time.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2.5">
              <h4 className="text-white font-bold text-[14px] uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2.5 text-sm font-semibold">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#themes" className="hover:text-white transition-colors">Themes</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="lg:col-span-2.5">
              <h4 className="text-white font-bold text-[14px] uppercase tracking-wider mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5 text-sm font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold text-[14px] uppercase tracking-wider mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-9.5 h-9.5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-green hover:text-white hover:scale-105 transition-all shadow-md">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
                </a>
                <a href="#" className="w-9.5 h-9.5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-green hover:text-white hover:scale-105 transition-all shadow-md">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="#" className="w-9.5 h-9.5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-green hover:text-white hover:scale-105 transition-all shadow-md">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.5 6.163C0 8.017 0 12 0 12s0 3.983.5 5.837a3.003 3.003 0 002.11 2.108c1.858.555 9.388.555 9.388.555s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.983 24 12 24 12s0-3.983-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="#" className="w-9.5 h-9.5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-green hover:text-white hover:scale-105 transition-all shadow-md">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom copyright */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-semibold gap-4">
            <span>© 2024 SiteOnWhatsApp. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
