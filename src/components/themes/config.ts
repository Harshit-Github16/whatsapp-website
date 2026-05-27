import { ThemeType } from '../../types';

export interface ThemeColors {
  background: string;
  sectionBg: string;
  cardBg: string;
  text: string;
  textTitle: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  accentText: string;
  border: string;
  overlay: string;
}

export interface ThemeConfig {
  name: string;
  fontHeading: string;
  fontBody: string;
  colors: ThemeColors;
  containerClass: string;
  headingClass: string;
  subheadingClass: string;
  cardClass: string;
  buttonClass: string;
  inputClass: string;
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  modern: {
    name: 'Modern Tech SaaS',
    fontHeading: 'font-sans tracking-tight',
    fontBody: 'font-sans',
    colors: {
      background: 'bg-[#090d16] text-slate-100 bg-grid-slate-900',
      sectionBg: 'bg-[#0b132b]/50 border-t border-b border-[#1c2541]/40 backdrop-blur-sm',
      cardBg: 'bg-[#0b132b]/80 border-slate-800/80 backdrop-blur-md shadow-lg shadow-black/10',
      text: 'text-slate-300',
      textTitle: 'text-white font-extrabold',
      textMuted: 'text-slate-400',
      primary: 'bg-indigo-600 shadow-indigo-600/30 shadow-lg',
      primaryHover: 'hover:bg-indigo-500 hover:shadow-indigo-600/50 hover:-translate-y-0.5',
      primaryText: 'text-white font-medium',
      accentText: 'text-indigo-400 font-semibold',
      border: 'border-slate-850',
      overlay: 'bg-[#090d16]/80',
    },
    containerClass: 'max-w-6xl mx-auto px-6 py-24 md:py-32',
    headingClass: 'text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight',
    subheadingClass: 'text-sm md:text-lg text-slate-400 max-w-2xl font-light leading-relaxed',
    cardClass: 'rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5',
    buttonClass: 'px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer',
    inputClass: 'w-full bg-[#0b132b] border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none text-white placeholder-slate-500 transition duration-150',
  },
  minimal: {
    name: 'Minimalist Studio',
    fontHeading: 'font-sans tracking-widest uppercase font-semibold',
    fontBody: 'font-sans',
    colors: {
      background: 'bg-[#fafafa] text-stone-850 bg-grid-slate-200',
      sectionBg: 'bg-[#f4f4f5] border-t border-b border-stone-200/50',
      cardBg: 'bg-white border-stone-200 shadow-sm',
      text: 'text-stone-600 font-light',
      textTitle: 'text-stone-900 font-bold uppercase tracking-wider',
      textMuted: 'text-stone-400',
      primary: 'bg-stone-900 shadow-sm',
      primaryHover: 'hover:bg-black hover:-translate-y-0.5',
      primaryText: 'text-white tracking-widest uppercase text-xs font-semibold',
      accentText: 'text-stone-900 font-semibold underline underline-offset-4',
      border: 'border-stone-200',
      overlay: 'bg-white/90',
    },
    containerClass: 'max-w-5xl mx-auto px-6 py-20',
    headingClass: 'text-2xl md:text-4xl font-bold tracking-widest text-stone-900 mb-3 uppercase leading-snug',
    subheadingClass: 'text-xs md:text-sm text-stone-500 max-w-xl tracking-wide font-light leading-relaxed',
    cardClass: 'rounded-none border border-stone-200 p-6 transition duration-300 hover:bg-stone-100/50 hover:shadow-md',
    buttonClass: 'px-6 py-3 rounded-none font-semibold text-[11px] tracking-widest uppercase transition-all duration-200 active:scale-[0.98] border border-stone-900 flex items-center justify-center gap-2 cursor-pointer',
    inputClass: 'w-full bg-white border border-stone-300 focus:border-stone-900 rounded-none px-4 py-3 text-xs focus:outline-none text-stone-950 placeholder-stone-450 transition duration-150',
  },
  luxury: {
    name: 'Luxury & Gold',
    fontHeading: 'font-serif tracking-wide',
    fontBody: 'font-serif',
    colors: {
      background: 'bg-[#0f0e0c] text-[#ece8e2]/90',
      sectionBg: 'bg-[#181613] border-t border-b border-[#2b251d]/40',
      cardBg: 'bg-[#151411]/90 border-[#322c23]/60 backdrop-blur-md shadow-xl',
      text: 'text-[#cbc4b9] font-light leading-relaxed',
      textTitle: 'text-[#e5d4bc] font-medium tracking-wide',
      textMuted: 'text-[#7e7669]',
      primary: 'bg-[#c39b62] shadow-md shadow-[#c39b62]/10',
      primaryHover: 'hover:bg-[#d5ad73] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#c39b62]/20',
      primaryText: 'text-[#0f0e0c] font-bold tracking-widest uppercase text-xs',
      accentText: 'text-[#c39b62] tracking-wider font-semibold',
      border: 'border-[#231e18]',
      overlay: 'bg-[#0f0e0c]/90',
    },
    containerClass: 'max-w-5xl mx-auto px-6 py-24 md:py-36',
    headingClass: 'text-3xl md:text-5xl font-medium tracking-wide text-[#e5d4bc] mb-4 font-serif italic leading-tight',
    subheadingClass: 'text-xs md:text-base text-[#cbc4b9] max-w-xl italic leading-relaxed font-light',
    cardClass: 'rounded-lg border p-8 transition duration-500 hover:border-[#c39b62]/40 hover:shadow-2xl hover:shadow-[#c39b62]/[0.03]',
    buttonClass: 'px-8 py-3.5 rounded-full font-serif tracking-widest uppercase text-[10px] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 border border-[#c39b62]/50 cursor-pointer',
    inputClass: 'w-full bg-[#151411]/60 border border-[#322c23]/60 focus:border-[#c39b62] rounded-lg px-4 py-3 text-sm focus:outline-none text-[#ece8e2] font-serif placeholder-[#7e7669] transition duration-150',
  },
  medical: {
    name: 'Medical Clean Care',
    fontHeading: 'font-sans tracking-normal',
    fontBody: 'font-sans',
    colors: {
      background: 'bg-[#f8fafc] text-slate-800',
      sectionBg: 'bg-white border-t border-b border-slate-200/60 shadow-sm',
      cardBg: 'bg-white border-slate-200 shadow-md shadow-slate-100/50',
      text: 'text-slate-600 font-normal',
      textTitle: 'text-slate-900 font-semibold',
      textMuted: 'text-slate-400',
      primary: 'bg-teal-600 shadow-md shadow-teal-600/10',
      primaryHover: 'hover:bg-teal-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-600/20',
      primaryText: 'text-white font-semibold',
      accentText: 'text-teal-600 font-bold',
      border: 'border-slate-100',
      overlay: 'bg-slate-900/40',
    },
    containerClass: 'max-w-6xl mx-auto px-6 py-20',
    headingClass: 'text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-snug',
    subheadingClass: 'text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed',
    cardClass: 'rounded-2xl border p-6 transition duration-300 hover:border-teal-500/30 hover:shadow-xl hover:shadow-slate-250/50',
    buttonClass: 'px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer',
    inputClass: 'w-full bg-white border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900 placeholder-slate-400 transition duration-150',
  },
  restaurant: {
    name: 'Warm Culinary',
    fontHeading: 'font-sans tracking-tight',
    fontBody: 'font-sans',
    colors: {
      background: 'bg-[#1c1917] text-stone-200',
      sectionBg: 'bg-[#151312] border-t border-b border-stone-800/40',
      cardBg: 'bg-[#1c1917] border-stone-850 shadow-lg shadow-black/10',
      text: 'text-stone-300 font-light',
      textTitle: 'text-[#f5ebd6] font-bold',
      textMuted: 'text-stone-500',
      primary: 'bg-[#eab308] shadow-md shadow-[#eab308]/10',
      primaryHover: 'hover:bg-[#facc15] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#eab308]/20',
      primaryText: 'text-stone-950 font-bold tracking-tight',
      accentText: 'text-[#eab308] font-bold',
      border: 'border-stone-900',
      overlay: 'bg-[#151312]/90',
    },
    containerClass: 'max-w-6xl mx-auto px-6 py-24',
    headingClass: 'text-3xl md:text-5xl font-black text-[#f5ebd6] mb-3 leading-tight font-serif italic',
    subheadingClass: 'text-sm md:text-base text-stone-400 max-w-2xl italic leading-relaxed font-light',
    cardClass: 'rounded-2xl border p-6 transition duration-300 hover:shadow-2xl hover:shadow-[#eab308]/[0.03] hover:-translate-y-1 hover:border-[#eab308]/20',
    buttonClass: 'px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer',
    inputClass: 'w-full bg-[#151312] border border-stone-800 focus:border-[#eab308] focus:ring-2 focus:ring-[#eab308]/20 rounded-xl px-4 py-3 text-sm focus:outline-none text-white placeholder-stone-600 transition duration-150',
  },
  gym: {
    name: 'Gym High-Energy',
    fontHeading: 'font-sans tracking-wide uppercase',
    fontBody: 'font-sans',
    colors: {
      background: 'bg-[#0a0a0a] text-neutral-100',
      sectionBg: 'bg-[#111111] border-t border-b border-neutral-900',
      cardBg: 'bg-[#161616] border-neutral-850 shadow-md',
      text: 'text-neutral-350 font-normal leading-relaxed',
      textTitle: 'text-white font-black italic tracking-wide',
      textMuted: 'text-neutral-550',
      primary: 'bg-[#ea580c] shadow-lg shadow-[#ea580c]/20',
      primaryHover: 'hover:bg-[#f97316] hover:-translate-y-0.5 hover:shadow-orange-600/30',
      primaryText: 'text-white font-black tracking-wider uppercase text-xs',
      accentText: 'text-[#ea580c] font-black italic',
      border: 'border-neutral-900',
      overlay: 'bg-[#0a0a0a]/90',
    },
    containerClass: 'max-w-6xl mx-auto px-6 py-20 md:py-28',
    headingClass: 'text-3xl md:text-6xl font-black italic tracking-wide text-white mb-4 uppercase leading-none',
    subheadingClass: 'text-xs md:text-sm text-neutral-400 max-w-xl font-medium tracking-normal normal-case leading-relaxed',
    cardClass: 'rounded-none border-l-4 border-l-[#ea580c] border bg-[#161616] border-neutral-850 p-6 transition duration-200 hover:bg-[#1f1f1f] hover:shadow-lg',
    buttonClass: 'px-7 py-4 rounded-none font-bold text-xs tracking-widest uppercase transition-all duration-250 active:scale-95 flex items-center justify-center gap-2 cursor-pointer',
    inputClass: 'w-full bg-[#111111] border border-neutral-855 focus:border-[#ea580c] rounded-none px-4 py-3.5 text-xs focus:outline-none text-white uppercase placeholder-neutral-700 transition duration-150',
  }
};
