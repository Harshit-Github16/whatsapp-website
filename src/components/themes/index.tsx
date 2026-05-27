'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp,
  Dumbbell, Heart, Stethoscope, Coffee, Utensils, Layout, Shield, Cpu,
  Sparkles, Code, Crown, Award, Star, TrendingUp, Users, Zap, Flame,
  Activity, Quote, ArrowRight
} from 'lucide-react';
import { THEME_CONFIGS } from './config';
import { ThemeType, SectionType } from '@/types';

interface SectionProps<T> {
  content: T;
  theme: ThemeType;
}

// Animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
} as const;

/**
 * Service dynamic icon mapper helper
 */
const getServiceIcon = (name: string, theme: ThemeType) => {
  const n = name.toLowerCase();
  
  if (n.includes('dent') || n.includes('tooth') || n.includes('teeth') || n.includes('medical') || n.includes('doctor') || n.includes('clinic') || n.includes('health') || n.includes('care') || n.includes('consult')) {
    if (n.includes('diagnos') || n.includes('test')) return <Activity size={20} />;
    if (n.includes('tooth') || n.includes('teeth') || n.includes('dent') || n.includes('whiten')) return <Sparkles size={20} />;
    return <Stethoscope size={20} />;
  }
  
  if (n.includes('food') || n.includes('dine') || n.includes('dining') || n.includes('eat') || n.includes('restaur') || n.includes('cook') || n.includes('chef') || n.includes('meal') || n.includes('dish') || n.includes('lunch') || n.includes('dinner')) {
    if (n.includes('coffee') || n.includes('tea') || n.includes('cafe') || n.includes('drink')) return <Coffee size={20} />;
    return <Utensils size={20} />;
  }
  
  if (n.includes('gym') || n.includes('fit') || n.includes('train') || n.includes('workout') || n.includes('strength') || n.includes('body') || n.includes('muscle')) {
    if (n.includes('coach') || n.includes('personal')) return <Users size={20} />;
    return <Dumbbell size={20} />;
  }

  if (n.includes('vip') || n.includes('luxury') || n.includes('gold') || n.includes('event') || n.includes('premium') || n.includes('crown') || n.includes('royal')) {
    if (n.includes('concierge') || n.includes('service')) return <Crown size={20} />;
    return <Award size={20} />;
  }

  if (n.includes('code') || n.includes('web') || n.includes('design') || n.includes('software') || n.includes('saas') || n.includes('tech') || n.includes('app') || n.includes('develop') || n.includes('cloud')) {
    if (n.includes('design') || n.includes('ui') || n.includes('ux')) return <Layout size={20} />;
    if (n.includes('cloud') || n.includes('api') || n.includes('saas') || n.includes('hardware')) return <Cpu size={20} />;
    return <Code size={20} />;
  }

  // Fallbacks by theme
  switch (theme) {
    case 'gym':
      return <Flame size={20} />;
    case 'luxury':
      return <Star size={20} />;
    case 'medical':
      return <Heart size={20} />;
    case 'restaurant':
      return <Coffee size={20} />;
    case 'modern':
      return <Zap size={20} />;
    default:
      return <CheckCircle2 size={20} />;
  }
};

/**
 * 1. HERO SECTION
 */
export function HeroSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const isModern = theme === 'modern';
  const isLuxury = theme === 'luxury';
  const isGym = theme === 'gym';
  const isRestaurant = theme === 'restaurant';
  const isMedical = theme === 'medical';

  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${cfg.colors.background}`}>
      {/* Dynamic Background Overlays & Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {isModern && (
          <>
            <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
          </>
        )}
        {isGym && (
          <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[12rem] font-black opacity-[0.02] uppercase tracking-tighter select-none font-sans italic">
            FITNESS GOALS
          </div>
        )}
        {isLuxury && (
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#c39b62_1px,transparent_1px)] [background-size:24px_24px]" />
        )}
        {isRestaurant && (
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px]"></div>
        )}
      </div>

      {/* Background Image with Overlay (Centred / Traditional Fallbacks) */}
      {!isModern && !isRestaurant && !isMedical && content.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={content.backgroundImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${cfg.colors.overlay}`}></div>
        </div>
      )}

      <div className={`relative z-10 w-full ${cfg.containerClass}`}>
        {/* Dynamic Split Layouts */}
        {(isModern || isRestaurant || isMedical) ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* Badge element */}
              <motion.div variants={fadeInUp} className="mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
                  isModern ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
                  isRestaurant ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                  'bg-teal-500/10 border-teal-500/30 text-teal-600'
                }`}>
                  <Sparkles size={12} className="animate-pulse" />
                  <span>Welcome to Our Official Website</span>
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className={cfg.headingClass}
              >
                {content.title}
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className={`${cfg.subheadingClass} mb-8`}
              >
                {content.subtitle}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <a
                  href={content.ctaLink || '#services'}
                  className={`${cfg.buttonClass} ${cfg.colors.primary} ${cfg.colors.primaryText} ${cfg.colors.primaryHover}`}
                >
                  {content.ctaText || 'Get Started'}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </motion.div>

            {/* Right side: Mockup visual preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center z-10"
            >
              <div className="w-full max-w-md relative animate-float">
                {isModern && (
                  <div className="bg-[#0b132b]/80 border border-slate-800 rounded-3xl p-3 shadow-2xl backdrop-blur-md">
                    <div className="bg-[#090d16] rounded-2xl overflow-hidden aspect-[4/3] relative flex flex-col">
                      <div className="bg-[#0b132b] px-4 py-2 border-b border-slate-850 flex items-center gap-1.5 text-slate-500 text-[10px] select-none">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
                        <span className="ml-2 font-mono text-[9px] text-indigo-400 bg-[#090d16] px-2 py-0.5 rounded border border-slate-850">
                          active-services
                        </span>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between text-xs">
                        <div className="space-y-2">
                          <div className="w-1/3 h-2 bg-indigo-500/20 rounded"></div>
                          <div className="w-3/4 h-4 bg-white/10 rounded"></div>
                          <div className="w-5/6 h-3 bg-white/5 rounded"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500">Uptime</span>
                            <span className="font-bold text-emerald-400">100.0%</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500">Security</span>
                            <span className="font-bold text-indigo-400">Ssl Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isRestaurant && content.backgroundImage && (
                  <div className="relative p-2 bg-[#1c1917] border border-stone-800 rounded-3xl shadow-2xl">
                    <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                      <img src={content.backgroundImage} alt="Food mock" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-[#eab308] text-stone-950 px-4 py-2.5 rounded-2xl shadow-lg border border-[#eab308] text-xs font-black flex items-center gap-1.5">
                      <Star size={14} className="fill-stone-950" />
                      Voted Best Local Cuisine
                    </div>
                  </div>
                )}

                {isMedical && content.backgroundImage && (
                  <div className="relative p-2.5 bg-white border border-slate-200 rounded-[2rem] shadow-xl">
                    <div className="rounded-[1.6rem] overflow-hidden aspect-[4/3]">
                      <img src={content.backgroundImage} alt="Medical clinic" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-teal-600 text-white px-4 py-3 rounded-2xl shadow-lg border border-teal-500 text-xs font-semibold flex items-center gap-1.5">
                      <Shield size={14} />
                      100% Certified Care
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Centered theme hero layout (Minimal, Luxury, Gym) */
          <div className="text-center relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {isLuxury && (
              <div className="absolute inset-0 border-2 border-[#c39b62]/30 m-[-20px] rounded-xl pointer-events-none">
                <div className="absolute inset-0 border border-[#c39b62]/10 m-[4px] rounded-lg"></div>
              </div>
            )}
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center justify-center py-8"
            >
              {isLuxury && (
                <motion.span variants={fadeInUp} className="text-[#c39b62] text-2xl mb-2 font-serif">
                  ✨
                </motion.span>
              )}

              <motion.h1 
                variants={fadeInUp}
                className={`${cfg.headingClass} ${isGym ? 'italic font-black text-shadow-orange' : ''}`}
              >
                {content.title}
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className={`${cfg.subheadingClass} mb-8 mx-auto`}
              >
                {content.subtitle}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <a
                  href={content.ctaLink || '#services'}
                  className={`${cfg.buttonClass} ${cfg.colors.primary} ${cfg.colors.primaryText} ${cfg.colors.primaryHover}`}
                >
                  {content.ctaText || 'Get Started'}
                  {isGym ? <Zap size={14} /> : <ArrowRight size={14} />}
                </a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Decorative arrow down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce cursor-pointer z-10">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}

/**
 * 2. ABOUT SECTION
 */
export function AboutSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const isMinimal = theme === 'minimal';
  const isLuxury = theme === 'luxury';
  const isGym = theme === 'gym';
  const isModern = theme === 'modern';

  return (
    <section id="about" className={`${cfg.colors.sectionBg} py-24 relative overflow-hidden`}>
      {isModern && (
        <div className="absolute -left-20 top-1/3 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      )}
      <div className={cfg.containerClass}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Text Content Column */}
          <motion.div variants={fadeInUp} className={`lg:col-span-7 ${isMinimal ? 'order-2 lg:order-1' : ''}`}>
            <span className={`text-[10px] uppercase tracking-widest ${cfg.colors.accentText} font-bold mb-2 block`}>
              Who We Are
            </span>
            <h2 className={cfg.headingClass}>{content.title || 'About Us'}</h2>
            <div className={`w-12 h-1 mb-6 ${isMinimal ? 'bg-stone-900' : isLuxury ? 'bg-[#c39b62]' : isGym ? 'bg-[#ea580c]' : 'bg-indigo-600'}`} />
            
            <p className={`${cfg.colors.text} leading-relaxed text-sm md:text-base mb-8`}>
              {content.description}
            </p>

            {/* Embedded Premium Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-500/10">
              <div className="flex flex-col gap-1">
                <span className={`text-2xl font-bold font-mono ${isLuxury ? 'text-[#c39b62]' : isGym ? 'text-[#ea580c]' : isModern ? 'text-indigo-400' : ''}`}>
                  100%
                </span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Quality Guarantee</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-2xl font-bold font-mono ${isLuxury ? 'text-[#c39b62]' : isGym ? 'text-[#ea580c]' : isModern ? 'text-indigo-400' : ''}`}>
                  5+ Yrs
                </span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Proven Experience</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`text-2xl font-bold font-mono ${isLuxury ? 'text-[#c39b62]' : isGym ? 'text-[#ea580c]' : isModern ? 'text-indigo-400' : ''}`}>
                  24/7
                </span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Support Active</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Image Column */}
          {content.image && (
            <motion.div 
              variants={fadeInUp} 
              className={`lg:col-span-5 ${isMinimal ? 'order-1 lg:order-2' : ''} flex justify-center`}
            >
              <div className="relative group">
                {/* Decorative background framing */}
                {isLuxury && (
                  <div className="absolute inset-0 border border-[#c39b62] m-2 translate-x-4 translate-y-4 rounded transition-transform group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none" />
                )}
                {isGym && (
                  <div className="absolute inset-0 bg-[#ea580c] -translate-x-3 translate-y-3 pointer-events-none" />
                )}
                {isModern && (
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-lg scale-95 group-hover:scale-100 transition-all pointer-events-none" />
                )}

                <div className={`overflow-hidden aspect-[4/3] w-full max-w-sm relative ${
                  isMinimal ? 'border border-stone-250' : 
                  isLuxury ? 'border border-[#322c23] p-1.5 bg-[#151411]' : 
                  isGym ? 'border-2 border-white' : 'rounded-2xl shadow-2xl'
                }`}>
                  <img
                    src={content.image}
                    alt="About visual representation"
                    className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${
                      isMinimal ? '' : isLuxury ? 'rounded-sm' : isGym ? '' : 'rounded-xl'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 3. SERVICES SECTION
 */
export function ServicesSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const isRestaurant = theme === 'restaurant';
  const isLuxury = theme === 'luxury';
  const isGym = theme === 'gym';
  const isModern = theme === 'modern';

  return (
    <section id="services" className={`py-24 ${cfg.colors.background}`}>
      <div className={cfg.containerClass}>
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className={`text-[10px] uppercase tracking-widest ${cfg.colors.accentText} font-bold mb-2 block`}>
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-black">{content.title || 'Our Services'}</h2>
          <div className={`w-12 h-1 mx-auto mt-5 ${
            isGym ? 'bg-[#ea580c]' : 
            isLuxury ? 'bg-[#c39b62]' : 
            isRestaurant ? 'bg-[#eab308]' : 
            theme === 'minimal' ? 'bg-stone-900' : 'bg-indigo-600'
          }`} />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className={isRestaurant ? "max-w-3xl mx-auto space-y-8" : "grid grid-cols-1 md:grid-cols-3 gap-8"}
        >
          {content.items?.map((service: any, index: number) => {
            if (isRestaurant) {
              // Upgraded Restaurant Menu Style Layout
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex flex-col gap-1 border-b border-stone-800/80 pb-4 group"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-stone-100 group-hover:text-[#eab308] transition duration-200 flex items-center gap-2">
                      <span className="text-[#eab308]">{getServiceIcon(service.name, theme)}</span>
                      {service.name}
                    </h3>
                    <div className="flex-1 border-b border-dotted border-stone-700/60 mx-3 h-1"></div>
                    <span className="text-[#eab308] font-mono text-sm font-bold bg-[#eab308]/5 px-2 py-0.5 rounded border border-[#eab308]/20">
                      Premium Selection
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 pl-7 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            }

            // Cards layout with dynamic icons, glassmorphism, and glows
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${cfg.cardClass} ${cfg.colors.cardBg} flex flex-col items-start`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm border transition duration-300 ${
                  isModern ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white' :
                  isLuxury ? 'border-[#c39b62]/30 bg-[#c39b62]/5 text-[#c39b62]' :
                  isGym ? 'border-[#ea580c]/30 bg-[#ea580c]/10 text-[#ea580c]' :
                  theme === 'minimal' ? 'bg-stone-100 border-stone-250 text-stone-900' : 'bg-teal-500/10 border-teal-500/20 text-teal-600'
                }`}>
                  {getServiceIcon(service.name, theme)}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${cfg.colors.textTitle}`}>
                  {service.name}
                </h3>
                
                <p className={`text-sm leading-relaxed ${cfg.colors.text}`}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 4. GALLERY SECTION
 */
export function GallerySection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const isMinimal = theme === 'minimal';
  const isLuxury = theme === 'luxury';
  const isGym = theme === 'gym';

  return (
    <section id="gallery" className={`py-24 ${cfg.colors.sectionBg}`}>
      <div className={cfg.containerClass}>
        <div className="text-center mb-20">
          <span className={`text-[10px] uppercase tracking-widest ${cfg.colors.accentText} font-bold mb-2 block`}>
            Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-black">{content.title || 'Photo Gallery'}</h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {content.images?.map((url: string, index: number) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`group overflow-hidden aspect-[4/3] relative shadow-lg cursor-pointer ${
                isMinimal ? 'border border-stone-200' : 
                isLuxury ? 'border border-[#322c23] p-1.5 bg-[#151411] rounded' : 
                isGym ? 'border-2 border-white' : 'rounded-2xl'
              }`}
            >
              <img
                src={url}
                alt={`Gallery visual ${index + 1}`}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                  isMinimal ? '' : isLuxury ? 'rounded-sm' : isGym ? '' : 'rounded-xl'
                }`}
              />
              {/* Overlay with zoom lens styling */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-semibold tracking-wider uppercase bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform duration-300">
                  Zoom Photo
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 5. TESTIMONIALS SECTION
 */
export function TestimonialsSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const isLuxury = theme === 'luxury';
  const isGym = theme === 'gym';
  const isModern = theme === 'modern';

  return (
    <section id="testimonials" className={`py-24 ${cfg.colors.background} relative overflow-hidden`}>
      {isModern && (
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      )}
      <div className={cfg.containerClass}>
        <div className="text-center mb-20">
          <span className={`text-[10px] uppercase tracking-widest ${cfg.colors.accentText} font-bold mb-2 block`}>
            Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-black">{content.title || 'Client Testimonials'}</h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {content.items?.map((item: any, index: number) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`p-8 border relative overflow-hidden ${cfg.cardClass} ${cfg.colors.cardBg} flex flex-col justify-between`}
            >
              {/* Massive background quote watermark */}
              <Quote className="absolute right-6 top-6 w-16 h-16 opacity-[0.03] text-slate-400 rotate-180" />

              <div className="flex flex-col gap-4">
                {/* 5-Star Indicator */}
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>

                <p className={`italic ${cfg.colors.text} text-sm md:text-base leading-relaxed relative z-10`}>
                  "{item.text}"
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3.5 border-t border-slate-500/10 pt-5">
                {/* Visual Avatar block */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                  isLuxury ? 'bg-[#c39b62]/10 text-[#c39b62] border border-[#c39b62]/20' :
                  isGym ? 'bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/20' :
                  'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                }`}>
                  {item.name[0]}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${cfg.colors.textTitle}`}>{item.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Verified Client</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 6. CONTACT SECTION
 */
export function ContactSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const [submitted, setSubmitted] = React.useState(false);
  const isMinimal = theme === 'minimal';
  const isLuxury = theme === 'luxury';
  const isGym = theme === 'gym';
  const isModern = theme === 'modern';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className={`py-24 ${cfg.colors.sectionBg}`}>
      <div className={cfg.containerClass}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          {/* Info Details Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-8">
            <div>
              <span className={`text-[10px] uppercase tracking-widest ${cfg.colors.accentText} font-bold mb-2 block`}>
                Location
              </span>
              <h2 className={cfg.headingClass}>{content.title || 'Contact Us'}</h2>
            </div>
            
            <div className="space-y-6 pt-4">
              {content.phone && (
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm border ${
                    isMinimal ? 'border-stone-300 text-stone-900 bg-white' : 
                    isLuxury ? 'border-[#c39b62]/35 text-[#c39b62] bg-[#c39b62]/5' : 
                    isGym ? 'border-[#ea580c]/35 text-[#ea580c] bg-[#ea580c]/10' : 
                    'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Phone Line</span>
                    <a href={`tel:${content.phone}`} className="text-sm font-semibold hover:underline mt-0.5 block">
                      {content.phone}
                    </a>
                  </div>
                </div>
              )}

              {content.email && (
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm border ${
                    isMinimal ? 'border-stone-300 text-stone-900 bg-white' : 
                    isLuxury ? 'border-[#c39b62]/35 text-[#c39b62] bg-[#c39b62]/5' : 
                    isGym ? 'border-[#ea580c]/35 text-[#ea580c] bg-[#ea580c]/10' : 
                    'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Email Address</span>
                    <a href={`mailto:${content.email}`} className="text-sm font-semibold hover:underline mt-0.5 block">
                      {content.email}
                    </a>
                  </div>
                </div>
              )}

              {content.address && (
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm border ${
                    isMinimal ? 'border-stone-300 text-stone-900 bg-white' : 
                    isLuxury ? 'border-[#c39b62]/35 text-[#c39b62] bg-[#c39b62]/5' : 
                    isGym ? 'border-[#ea580c]/35 text-[#ea580c] bg-[#ea580c]/10' : 
                    'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Headquarters</span>
                    <address className="text-sm font-semibold not-italic mt-0.5 block leading-relaxed">{content.address}</address>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Interactive Form Column */}
          <motion.div variants={fadeInUp} className={`lg:col-span-7 p-8 ${
            isMinimal ? 'bg-[#f4f4f5] border border-stone-250' : 
            isLuxury ? 'bg-[#151411] border border-[#322c23] rounded-2xl' : 
            isGym ? 'bg-[#111111] border-2 border-white' : 'bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-md shadow-2xl'
          }`}>
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 flex flex-col items-center justify-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white">Message Dispatched!</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. A client relations specialist will follow up shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Name</label>
                    <input type="text" required className={cfg.inputClass} placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Email</label>
                    <input type="email" required className={cfg.inputClass} placeholder="john@example.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Message Details</label>
                  <textarea
                    required
                    rows={4}
                    className={`${cfg.inputClass} resize-none leading-relaxed`}
                    placeholder="Enter your message details here..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full ${cfg.buttonClass} ${cfg.colors.primary} ${cfg.colors.primaryText} ${cfg.colors.primaryHover}`}
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 7. FAQ SECTION (Interactive Accordions Overhaul)
 */
export function FAQSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = content.items || [
    { question: "What are your business hours?", answer: "We are open Monday through Friday, 9:00 AM to 6:00 PM." },
    { question: "Do we need an appointment?", answer: "Appointments are recommended, but we do accommodate walk-ins when possible." }
  ];

  return (
    <section id="faq" className={`py-24 ${cfg.colors.background}`}>
      <div className={cfg.containerClass}>
        <div className="text-center mb-20">
          <span className={`text-[10px] uppercase tracking-widest ${cfg.colors.accentText} font-bold mb-2 block`}>
            Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-black">{content.title || 'Frequently Asked Questions'}</h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item: any, index: number) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`border overflow-hidden transition-all duration-300 ${cfg.colors.cardBg} ${
                  isOpen ? 'border-indigo-500/40 shadow-lg' : 'border-slate-800/10'
                } ${theme === 'minimal' ? 'rounded-none' : theme === 'gym' ? 'rounded-none border-l-4 border-l-[#ea580c]' : 'rounded-2xl'}`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className={`text-base font-bold transition-colors ${isOpen ? cfg.colors.accentText.split(' ')[0] : cfg.colors.textTitle}`}>
                    {item.question}
                  </span>
                  <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </span>
                </button>

                {/* Accordion Content Box (Framer Motion) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className={`px-6 pb-6 pt-1 text-sm leading-relaxed border-t border-slate-500/5 ${cfg.colors.text}`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 7.5. BLOGS SECTION
 */
export function BlogsSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const isMinimal = theme === 'minimal';
  const isLuxury = theme === 'luxury';
  const isGym = theme === 'gym';

  const blogItems = content.items || [];

  if (blogItems.length === 0) return null;

  return (
    <section id="blogs" className={`py-24 ${cfg.colors.sectionBg}`}>
      <div className={cfg.containerClass}>
        <div className="text-center mb-20">
          <span className={`text-[10px] uppercase tracking-widest ${cfg.colors.accentText} font-bold mb-2 block`}>
            Insights
          </span>
          <h2 className="text-3xl md:text-5xl font-black">{content.title || 'Latest News & Blogs'}</h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {blogItems.map((blog: any, index: number) => (
            <motion.article
              key={index}
              variants={fadeInUp}
              className={`group overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isMinimal ? 'bg-white border border-stone-250 p-6' : 
                isLuxury ? 'bg-[#151411] border border-[#322c23] p-5 rounded-lg' : 
                isGym ? 'bg-[#161616] border-l-4 border-l-[#ea580c] border border-neutral-850 p-6 rounded-none' : 
                'bg-[#0b132b]/80 border border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-sm'
              }`}
            >
              <div className="space-y-4">
                {/* Blog Image */}
                {blog.image && (
                  <div className={`overflow-hidden aspect-video relative ${isMinimal ? '' : isLuxury ? 'rounded' : isGym ? '' : 'rounded-xl'}`}>
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </div>
                )}
                
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold leading-snug group-hover:text-indigo-455 transition duration-200 ${
                  isLuxury ? 'group-hover:text-[#c39b62]' : 
                  isGym ? 'group-hover:text-[#ea580c]' : 
                  theme === 'restaurant' ? 'group-hover:text-[#eab308]' : 
                  theme === 'medical' ? 'group-hover:text-teal-650' : 'group-hover:text-indigo-400'
                } ${cfg.colors.textTitle}`}>
                  {blog.title}
                </h3>

                {/* Description snippet */}
                <p className={`text-sm leading-relaxed ${cfg.colors.text}`}>
                  {blog.description}
                </p>
              </div>

              {/* Read more button link */}
              <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  isLuxury ? 'text-[#c39b62]' : 
                  isGym ? 'text-[#ea580c]' : 
                  theme === 'restaurant' ? 'text-[#eab308]' : 
                  theme === 'medical' ? 'text-teal-600' : 'text-indigo-400'
                }`}>
                  Read Article
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 8. CTA SECTION
 */
export function CTASection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  const isGym = theme === 'gym';

  return (
    <section className={`py-20 ${cfg.colors.primary} text-center relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200 via-red-300 to-indigo-900 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-grid-slate-900 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        <h2 className={`text-3xl md:text-5xl font-black mb-4 leading-tight ${cfg.colors.primaryText}`}>
          {content.title || 'Ready to experience our service?'}
        </h2>
        <p className={`text-sm md:text-lg opacity-90 max-w-xl mb-8 leading-relaxed ${cfg.colors.primaryText} font-light`}>
          {content.description || 'Contact us today and find out how we can help your business succeed.'}
        </p>
        <a
          href={content.buttonLink || '#contact'}
          className={`bg-white hover:bg-slate-50 text-slate-950 font-bold px-8 py-4 rounded-full text-xs md:text-sm tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl active:scale-95 duration-200 flex items-center gap-2`}
        >
          {content.buttonText || 'Contact Us Now'}
          {isGym ? <Zap size={14} /> : <ArrowRight size={14} />}
        </a>
      </div>
    </section>
  );
}

/**
 * 9. FOOTER SECTION
 */
export function FooterSection({ content, theme }: SectionProps<any>) {
  const cfg = THEME_CONFIGS[theme];
  return (
    <footer className={`py-12 border-t border-slate-500/10 ${cfg.colors.background}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Navigation Quicklinks anchors */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <a href="#about" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>About</a>
          <a href="#services" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Services</a>
          <a href="#gallery" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Gallery</a>
          <a href="#testimonials" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Reviews</a>
          <a href="#blogs" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Blogs</a>
          <a href="#faq" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>FAQ</a>
          <a href="#contact" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Contact</a>
        </div>

        <hr className="w-16 border-slate-500/15" />

        <div className="text-center">
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {content.text || 'Thank you for visiting.'}
          </p>
          <p className="text-[10px] text-slate-600 mt-2.5 font-mono">
            {content.copyright || `© ${new Date().getFullYear()} Business. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * DYNAMIC SECTION RENDERER
 */
export function SectionRenderer({ type, content, theme }: { type: SectionType; content: any; theme: ThemeType }) {
  switch (type) {
    case 'hero':
      return <HeroSection content={content} theme={theme} />;
    case 'about':
      return <AboutSection content={content} theme={theme} />;
    case 'services':
      return <ServicesSection content={content} theme={theme} />;
    case 'gallery':
      return <GallerySection content={content} theme={theme} />;
    case 'testimonials':
      return <TestimonialsSection content={content} theme={theme} />;
    case 'contact':
      return <ContactSection content={content} theme={theme} />;
    case 'faq':
      return <FAQSection content={content} theme={theme} />;
    case 'blogs':
      return <BlogsSection content={content} theme={theme} />;
    case 'cta':
      return <CTASection content={content} theme={theme} />;
    case 'footer':
      return <FooterSection content={content} theme={theme} />;
    default:
      return null;
  }
}
