'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Zap, Globe, Sparkles, Layout, Smartphone, 
  ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, Play, RefreshCw,
  Award, Heart, Dumbbell, Shield, HelpCircle, Star, Image, FileText, CheckCircle, Clock
} from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function SaaSLandingPage() {
  // Interactive Simulator States
  const [theme, setTheme] = useState<'modern' | 'minimal' | 'luxury' | 'medical' | 'restaurant' | 'gym'>('luxury');
  const [businessName, setBusinessName] = useState('Shreeram Jewellers');
  const [hasBlogs, setHasBlogs] = useState(false);
  const [hasGallery, setHasGallery] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: '👋 Welcome to SiteBuilder! Let\'s build a gorgeous site.\nWhat is your *Business Name*?', time: '11:02 AM' },
    { sender: 'user', text: 'Shreeram Jewellers', time: '11:02 AM' },
    { sender: 'bot', text: 'Excellent! Business Name set to *Shreeram Jewellers*.\nSelect a theme number (1-6):\n1. Modern\n2. Minimal\n3. Luxury\n4. Medical\n5. Restaurant\n6. Gym', time: '11:03 AM' },
    { sender: 'user', text: '3', time: '11:03 AM' },
    { sender: 'bot', text: '🎉 Category set to *LUXURY*! Your premium site is live!\n👉 Live link: http://localhost:3000/shreeram-jewellers', time: '11:03 AM' }
  ]);

  const [activeChip, setActiveChip] = useState<string>('');

  const triggerSimulation = (action: string) => {
    setActiveChip(action);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (action === 'luxury') {
      setTheme('luxury');
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: 'Switch to Luxury Theme 🏆', time: timeStr },
        { sender: 'bot', text: '🎨 Swapped style to *LUXURY* theme! Added serif typography, golden accents, and luxury borders.', time: timeStr }
      ]);
    } else if (action === 'gym') {
      setTheme('gym');
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: 'Switch to Gym Theme ⚡', time: timeStr },
        { sender: 'bot', text: '🎨 Swapped style to *GYM* theme! Applied bold italic headers, energetic orange colors, and solid accent tags.', time: timeStr }
      ]);
    } else if (action === 'medical') {
      setTheme('medical');
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: 'Switch to Medical Theme 🩺', time: timeStr },
        { sender: 'bot', text: '🎨 Swapped style to *MEDICAL* theme! Configured soothing teal/slate palette and layout for patient confidence.', time: timeStr }
      ]);
    } else if (action === 'rename') {
      setBusinessName('Shreeram Gold & Diamonds');
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: '✏️ Edit Business Name to "Shreeram Gold & Diamonds"', time: timeStr },
        { sender: 'bot', text: '✅ Updated Business Name successfully! Headers and hero layout elements updated to *Shreeram Gold & Diamonds*.', time: timeStr }
      ]);
    } else if (action === 'blogs') {
      setHasBlogs(true);
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: '📰 Add Blogs section', time: timeStr },
        { sender: 'bot', text: '✅ Added blogs configuration. Inserts "Latest News & Insights" right above the footer.', time: timeStr }
      ]);
    } else if (action === 'reset') {
      setTheme('luxury');
      setBusinessName('Shreeram Jewellers');
      setHasBlogs(false);
      setMessages([
        { sender: 'bot', text: '👋 Welcome to SiteBuilder! Let\'s build a gorgeous site.\nWhat is your *Business Name*?', time: timeStr },
        { sender: 'user', text: 'Shreeram Jewellers', time: timeStr },
        { sender: 'bot', text: 'Category set to *LUXURY*! Your premium site is live!\n👉 Live link: http://localhost:3000/shreeram-jewellers', time: timeStr }
      ]);
    }
  };

  // Scroll chat list to bottom on updates
  useEffect(() => {
    const chatContainer = document.getElementById('chat-simulator-box');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  // Mini Theme Styles helper for the Live Preview Panel
  const getPreviewStyles = () => {
    switch (theme) {
      case 'luxury':
        return {
          bg: 'bg-[#0f0e0c]',
          card: 'bg-[#151411] border-[#322c23]',
          accentText: 'text-[#c39b62]',
          accentBg: 'bg-[#c39b62] text-[#0f0e0c]',
          font: 'font-serif',
          accentBorder: 'border-[#c39b62]'
        };
      case 'gym':
        return {
          bg: 'bg-[#0a0a0a]',
          card: 'bg-[#121212] border-neutral-850',
          accentText: 'text-[#ea580c]',
          accentBg: 'bg-[#ea580c] text-white font-black italic',
          font: 'font-sans font-extrabold uppercase tracking-tight',
          accentBorder: 'border-l-4 border-l-[#ea580c]'
        };
      case 'medical':
        return {
          bg: 'bg-slate-50',
          card: 'bg-white border-slate-100 shadow-sm',
          accentText: 'text-teal-650 text-teal-600',
          accentBg: 'bg-teal-600 text-white rounded-lg',
          font: 'font-sans',
          accentBorder: 'border-teal-500/20'
        };
      default:
        return {
          bg: 'bg-slate-950',
          card: 'bg-[#0b132b]/80 border-slate-800',
          accentText: 'text-indigo-400',
          accentBg: 'bg-indigo-600 text-white',
          font: 'font-sans',
          accentBorder: 'border-indigo-500'
        };
    }
  };

  const preview = getPreviewStyles();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-slate-950 overflow-hidden relative">
      {/* Glow backgrounds */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/30">
              S
            </div>
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              SiteBuilder <span className="text-[9px] tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-mono font-bold border border-emerald-500/25">WHATSAPP</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hidden md:block text-slate-400 hover:text-white text-xs font-semibold tracking-wide transition">
              How It Works
            </a>
            <a href="#features" className="hidden md:block text-slate-400 hover:text-white text-xs font-semibold tracking-wide transition">
              Features
            </a>
            <a href="#interactive-demo" className="hidden md:block text-slate-400 hover:text-white text-xs font-semibold tracking-wide transition text-indigo-400">
              Interactive Demo
            </a>
            <Link
              href="/onboarding"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Start Simulator
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles size={13} className="text-indigo-400" />
          <span>Complete customization via WhatsApp Chat</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Build & Edit a Premium Business Website via <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">WhatsApp</span>
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
          No builders, no dashboards, no coding needed. Create your site dynamically, change visual themes, edit about sections, add blogs, list services, and update contact info directly from WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl transition duration-150 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 text-sm active:scale-95 cursor-pointer"
          >
            Launch WhatsApp Simulator
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-slate-900 border border-white/5 hover:border-white/10 text-slate-200 font-bold px-8 py-4 rounded-2xl transition text-sm flex items-center justify-center gap-2"
          >
            Admin Control Center
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* INTERACTIVE SIMULATOR SHOWCASE */}
      <section id="interactive-demo" className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-extrabold mb-2 block">Product Interactive Experience</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Click WhatsApp options, watch your website change</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* WhatsApp Interface Mock (4 Cols) */}
          <div className="lg:col-span-5 bg-[#0e161e] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
            {/* Header */}
            <div className="bg-[#075e54] px-4 py-3.5 flex items-center justify-between border-b border-emerald-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#075e54] text-lg">
                  S
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">SiteBuilder Bot</h4>
                  <span className="text-[10px] text-emerald-100/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> online
                  </span>
                </div>
              </div>
              <div className="text-xs text-white/70 font-mono bg-black/10 px-2 py-0.5 rounded">Sandbox</div>
            </div>

            {/* Message History */}
            <div 
              id="chat-simulator-box" 
              className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto max-h-[360px] min-h-[300px] bg-[#0b141a] bg-grid-slate-900"
              style={{ backgroundImage: 'radial-gradient(circle, #0b141a 0%, #050b0e 100%)' }}
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-[#005c4b] text-white rounded-tr-none' 
                      : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text.split('\n').map((line, lIdx) => (
                      <p key={lIdx} className="mb-0.5">{line}</p>
                    ))}
                  </div>
                  <span className="text-[8px] text-slate-500 mt-1 mr-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Reply Chips Panel */}
            <div className="bg-[#111b21] p-4 border-t border-white/10 flex flex-col gap-2">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Simulate WhatsApp Replies:</span>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => triggerSimulation('luxury')} 
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition ${
                    theme === 'luxury' 
                      ? 'bg-amber-500 border-amber-400 text-slate-950' 
                      : 'bg-[#202c33] border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🏆 1. Choose Luxury Theme
                </button>
                <button 
                  onClick={() => triggerSimulation('gym')} 
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition ${
                    theme === 'gym' 
                      ? 'bg-orange-600 border-orange-500 text-white' 
                      : 'bg-[#202c33] border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ⚡ 2. Choose Gym Theme
                </button>
                <button 
                  onClick={() => triggerSimulation('medical')} 
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition ${
                    theme === 'medical' 
                      ? 'bg-teal-600 border-teal-500 text-white' 
                      : 'bg-[#202c33] border-white/5 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  🩺 3. Choose Medical Theme
                </button>
                <button 
                  onClick={() => triggerSimulation('rename')} 
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#202c33] border border-white/5 text-slate-300 hover:bg-slate-800 transition"
                >
                  ✏️ 4. Rename to "Shreeram Gold"
                </button>
                <button 
                  onClick={() => triggerSimulation('blogs')} 
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#202c33] border border-white/5 text-slate-300 hover:bg-slate-800 transition"
                >
                  📰 5. Add Blogs Section
                </button>
                <button 
                  onClick={() => triggerSimulation('reset')} 
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-rose-950 border border-rose-900 text-rose-200 hover:bg-rose-900 transition flex items-center gap-1"
                >
                  <RefreshCw size={9} /> Reset Demo
                </button>
              </div>
            </div>
          </div>

          {/* Website Live Preview Mock (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative min-h-[450px]">
            {/* Browser Tab Header */}
            <div className="bg-[#121829] px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
              </div>
              <div className="bg-[#0b0f19] px-4 py-1 rounded border border-white/5 font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                localhost:3000/shreeram-jewellers
              </div>
              <div className="text-[9px] text-indigo-400 uppercase tracking-widest font-black">Live Preview</div>
            </div>

            {/* Simulated Live Rendering */}
            <div className={`flex-1 p-6 overflow-y-auto ${preview.bg} ${preview.font} transition-colors duration-500 relative flex flex-col gap-6`}>
              {/* Logo / Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${preview.accentBg}`}>
                    {businessName[0]}
                  </div>
                  <span className="text-xs font-black text-white tracking-wide">{businessName}</span>
                </div>
                <div className="flex gap-4 text-[10px] text-slate-400 font-medium">
                  <span>About</span>
                  <span>Services</span>
                  {hasBlogs && <span>Blogs</span>}
                  <span>Contact</span>
                </div>
              </div>

              {/* Hero Banner Area */}
              <div className={`p-6 rounded-2xl relative overflow-hidden flex flex-col items-center text-center gap-2 ${preview.card} border transition-all duration-500`}>
                <span className={`text-[8px] uppercase tracking-widest ${preview.accentText} font-bold`}>Premium Collection</span>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight">Welcome to {businessName}</h3>
                <p className="text-[10px] text-slate-400 max-w-sm">
                  {theme === 'luxury' && 'Crafting timelines, memories, and exquisite fine gold jewelry for generations.'}
                  {theme === 'gym' && 'High-intensity fitness coaching, body transformation plans, and top tier training gear.'}
                  {theme === 'medical' && 'Pain-free, certified clinical care and health check-ups using modern medical standards.'}
                </p>
                <div className={`px-4 py-2 text-[10px] font-bold mt-2 ${preview.accentBg} rounded transition`}>
                  Book Appointment
                </div>
              </div>

              {/* Services block */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Our Core Services</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 ${preview.card} border ${preview.accentBorder} rounded-xl text-center flex flex-col items-center gap-1.5`}>
                    {theme === 'luxury' && <Award size={14} className={preview.accentText} />}
                    {theme === 'gym' && <Dumbbell size={14} className={preview.accentText} />}
                    {theme === 'medical' && <Shield size={14} className={preview.accentText} />}
                    <span className="text-[9px] font-bold text-white">
                      {theme === 'luxury' && 'Gold Valuation'}
                      {theme === 'gym' && 'HIIT Coaching'}
                      {theme === 'medical' && 'Routine Checkup'}
                    </span>
                  </div>
                  <div className={`p-3 ${preview.card} border ${preview.accentBorder} rounded-xl text-center flex flex-col items-center gap-1.5`}>
                    {theme === 'luxury' && <Star size={14} className={preview.accentText} />}
                    {theme === 'gym' && <Zap size={14} className={preview.accentText} />}
                    {theme === 'medical' && <Heart size={14} className={preview.accentText} />}
                    <span className="text-[9px] font-bold text-white">
                      {theme === 'luxury' && 'Diamond Cuts'}
                      {theme === 'gym' && 'Strength Training'}
                      {theme === 'medical' && 'Dental Care'}
                    </span>
                  </div>
                  <div className={`p-3 ${preview.card} border ${preview.accentBorder} rounded-xl text-center flex flex-col items-center gap-1.5`}>
                    {theme === 'luxury' && <Clock size={14} className={preview.accentText} />}
                    {theme === 'gym' && <Award size={14} className={preview.accentText} />}
                    {theme === 'medical' && <Award size={14} className={preview.accentText} />}
                    <span className="text-[9px] font-bold text-white">
                      {theme === 'luxury' && 'Custom Jewelry'}
                      {theme === 'gym' && 'Diet Plans'}
                      {theme === 'medical' && 'Emergency Care'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Blogs Section */}
              {hasBlogs && (
                <div className="space-y-3 animate-float-slow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Latest News & Insights</h4>
                    <span className={`text-[8px] font-bold ${preview.accentText}`}>View All</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 ${preview.card} border rounded-xl flex flex-col gap-1`}>
                      <span className="text-[7px] text-slate-500 font-mono">MAY 27, 2026</span>
                      <h5 className="text-[10px] font-bold text-white leading-tight">Trending Jewelry Styles</h5>
                      <p className="text-[8px] text-slate-400 mt-1 leading-snug">Discover the modern gold patterns dominating the market this season...</p>
                    </div>
                    <div className={`p-3 ${preview.card} border rounded-xl flex flex-col gap-1`}>
                      <span className="text-[7px] text-slate-500 font-mono">MAY 24, 2026</span>
                      <h5 className="text-[10px] font-bold text-white leading-tight">Investing in Pure Diamonds</h5>
                      <p className="text-[8px] text-slate-400 mt-1 leading-snug">Learn the key metrics for purchasing and storing certified gems safely...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Area */}
              <div className={`p-4 rounded-xl ${preview.card} border flex flex-col gap-1.5 text-[9px] text-slate-400`}>
                <span className="text-xs font-bold text-white mb-1">Get In Touch</span>
                <span>📞 Phone: +1 555-0199</span>
                <span>✉️ Email: contact@shreeram.com</span>
                <span>📍 Address: 102, Gold Palace Market, Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THE BOT WORKS */}
      <section id="how-it-works" className="bg-slate-900/30 border-t border-b border-white/5 py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2 block">Conversational Builder</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">How It Works in 3 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-slate-950/60 border border-white/5 p-8 rounded-3xl flex flex-col gap-5 relative hover:border-indigo-500/30 transition group">
              <span className="absolute top-6 right-8 text-5xl font-black text-slate-900 font-mono group-hover:text-indigo-950 transition duration-300">01</span>
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner">
                <MessageSquare size={26} />
              </div>
              <h3 className="text-xl font-bold text-white">Send "START" on WhatsApp</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect your number to our smart AI assistant. Send a message to wake the bot and launch the onboarding script.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/60 border border-white/5 p-8 rounded-3xl flex flex-col gap-5 relative hover:border-emerald-500/30 transition group">
              <span className="absolute top-6 right-8 text-5xl font-black text-slate-900 font-mono group-hover:text-emerald-950 transition duration-300">02</span>
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-inner">
                <Zap size={26} />
              </div>
              <h3 className="text-xl font-bold text-white">Share Business Details</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Upload your logo, gallery photos, select themes (1-6), list services, and describe your business in natural chat.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/60 border border-white/5 p-8 rounded-3xl flex flex-col gap-5 relative hover:border-sky-500/30 transition group">
              <span className="absolute top-6 right-8 text-5xl font-black text-slate-900 font-mono group-hover:text-sky-950 transition duration-300">03</span>
              <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 shadow-inner">
                <Globe size={26} />
              </div>
              <h3 className="text-xl font-bold text-white">Instantly Live & Customizable</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive your live URL (e.g. `localhost:3000/my-brand`). Manage, add blogs, edit quotes, or reset the site completely in WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED CORE FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2 block">Core Strengths</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
              A comprehensive styling engine, handled via chat
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-inner">
                  <Layout size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">6 Categorized Visual Layouts</h4>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                    Visual presets designed specifically for business niches (Modern, Minimal, Luxury, Medical, Restaurant, and Gym) featuring custom serif, gold, clean teal, and bold fitness color combinations.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Customizable Blogs & Insights Section</h4>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                    Engage users by uploading articles, blog headlines, and post headers directly. Select custom image highlights, publication dates, and read times.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 shadow-inner">
                  <Smartphone size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">WhatsApp Conversational Editors</h4>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                    Update titles, edit contact info, add testimonials, and manage FAQs directly via chat without ever visiting a dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Numerical feature summaries */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-white/5 p-8 rounded-3xl flex flex-col gap-3 relative hover:translate-y-[-4px] transition duration-300">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Themes Available</span>
              <span className="text-4xl font-black text-indigo-400">6 Presets</span>
              <p className="text-xs text-slate-400 leading-relaxed">Individually tailored spacing, colors, and layout templates.</p>
            </div>
            <div className="bg-slate-900/60 border border-white/5 p-8 rounded-3xl flex flex-col gap-3 relative hover:translate-y-[-4px] transition duration-300">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Setup Duration</span>
              <span className="text-4xl font-black text-emerald-400">&lt; 2 Mins</span>
              <p className="text-xs text-slate-400 leading-relaxed">Type, select, and publish. Zero technical knowledge required.</p>
            </div>
            <div className="bg-slate-900/60 border border-white/5 p-8 rounded-3xl flex flex-col gap-3 relative hover:translate-y-[-4px] transition duration-300">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Custom Sections</span>
              <span className="text-4xl font-black text-amber-500">Fully Modular</span>
              <p className="text-xs text-slate-400 leading-relaxed">Add blogs, gallery photos, testimonials, and FAQs on the fly.</p>
            </div>
            <div className="bg-slate-900/60 border border-white/5 p-8 rounded-3xl flex flex-col gap-3 relative hover:translate-y-[-4px] transition duration-300">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Dashboard Synced</span>
              <span className="text-4xl font-black text-teal-400">Real-Time</span>
              <p className="text-xs text-slate-400 leading-relaxed">Changes on WhatsApp sync automatically to web clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-indigo-950/40 border border-indigo-500/20 rounded-[3rem] p-12 text-center flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900/40 pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight max-w-xl leading-tight">
            Ready to launch your brand online today?
          </h2>
          
          <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
            Try our interactive local onboarding simulator. Simulate the WhatsApp chat and build a full business website in under two minutes!
          </p>

          <Link
            href="/onboarding"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-2xl text-sm transition shadow-lg shadow-emerald-500/10 active:scale-95 flex items-center gap-2 cursor-pointer mt-4"
          >
            Launch Free Sandbox Simulator
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-slate-950 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
              S
            </div>
            <span>© {new Date().getFullYear()} SiteBuilder. All rights reserved.</span>
          </div>
          <div className="flex gap-8 font-medium">
            <Link href="/onboarding" className="hover:text-slate-300 transition">Sandbox Simulator</Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition">Admin Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
