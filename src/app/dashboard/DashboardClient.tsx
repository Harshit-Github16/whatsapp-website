'use client';

import React, { useState } from 'react';
import { ThemeType, WebsiteConfig, SectionType } from '@/types';
import { THEME_CONFIGS } from '@/components/themes/config';
import { SectionRenderer } from '@/components/themes';
import {
  Globe,
  Settings,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Plus,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';

interface DashboardClientProps {
  user: { id: string; phoneNumber: string };
  initialWebsites: any[];
}

export default function DashboardClient({ user, initialWebsites }: DashboardClientProps) {
  const [websites, setWebsites] = useState<any[]>(initialWebsites);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'settings'>('content');
  const [activeSection, setActiveSection] = useState<string>('hero');

  const currentSite = websites[selectedIdx];

  // Client states for inputs
  const [businessName, setBusinessName] = useState(currentSite?.businessName || '');
  const [subdomain, setSubdomain] = useState(currentSite?.subdomain || '');
  const [logoUrl, setLogoUrl] = useState(currentSite?.logoUrl || '');
  const [isPublished, setIsPublished] = useState(currentSite?.isPublished ?? true);
  const [theme, setTheme] = useState<ThemeType>((currentSite?.theme || 'modern') as ThemeType);
  const [config, setConfig] = useState<WebsiteConfig>(() => {
    const cfg = currentSite?.config as unknown as WebsiteConfig;
    if (cfg && cfg.sections && !cfg.sections.some((s) => s.id === 'blogs')) {
      const defaultBlogs = [
        {
          title: 'Scaling Digital Products in 2026',
          description: 'Learn the core patterns used by top tier tech teams to build and scale SaaS applications globally.',
          date: 'May 12, 2026',
          readTime: '5 min read',
          image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600'
        }
      ];
      const newSec = { id: 'blogs', type: 'blogs' as any, content: { title: 'Latest News & Insights', items: defaultBlogs } };
      const sections = [...cfg.sections];
      const footerIdx = sections.findIndex((s) => s.id === 'footer');
      if (footerIdx !== -1) {
        sections.splice(footerIdx, 0, newSec);
      } else {
        sections.push(newSec);
      }
      return { ...cfg, sections };
    }
    return cfg;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // If no websites found
  if (websites.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-900/20 border border-slate-900 rounded-3xl my-12">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-4">
          <Globe size={32} className="animate-pulse" />
        </div>
        <h2 className="text-xl font-extrabold tracking-tight">No Active Websites Found</h2>
        <p className="text-sm text-slate-400 max-w-sm mt-2 leading-relaxed">
          You have not created a website yet. Please visit the WhatsApp Sandbox Simulator to set up your business site.
        </p>
        <Link
          href="/onboarding"
          className="mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
        >
          Open Onboarding Simulator
          <ArrowUpRight size={15} />
        </Link>
      </div>
    );
  }

  // Update specific section content in config JSON state
  const handleSectionContentChange = (sectionId: string, field: string, value: any) => {
    const updatedSections = config.sections.map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          content: {
            ...sec.content,
            [field]: value
          }
        };
      }
      return sec;
    });

    setConfig({
      ...config,
      sections: updatedSections
    });
  };

  // Add a service item
  const handleAddService = (sectionId: string) => {
    const serviceSection = config.sections.find((s) => s.id === sectionId);
    if (!serviceSection) return;

    const content = serviceSection.content as any;
    const currentItems = content.items || [];
    const updatedItems = [...currentItems, { name: 'New Service', description: 'Brief description of the service.' }];

    handleSectionContentChange(sectionId, 'items', updatedItems);
  };

  // Delete a service item
  const handleDeleteService = (sectionId: string, idxToDelete: number) => {
    const serviceSection = config.sections.find((s) => s.id === sectionId);
    if (!serviceSection) return;

    const content = serviceSection.content as any;
    const currentItems = content.items || [];
    const updatedItems = currentItems.filter((_: any, idx: number) => idx !== idxToDelete);

    handleSectionContentChange(sectionId, 'items', updatedItems);
  };

  // Modify a service item field
  const handleServiceChange = (sectionId: string, itemIdx: number, field: string, value: string) => {
    const serviceSection = config.sections.find((s) => s.id === sectionId);
    if (!serviceSection) return;

    const content = serviceSection.content as any;
    const currentItems = content.items || [];
    const updatedItems = currentItems.map((item: any, idx: number) => {
      if (idx === itemIdx) {
        return { ...item, [field]: value };
      }
      return item;
    });

    handleSectionContentChange(sectionId, 'items', updatedItems);
  };

  // Gallery handlers
  const handleAddGalleryItem = (sectionId: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.images || [];
    handleSectionContentChange(sectionId, 'images', [...current, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600']);
  };

  const handleDeleteGalleryItem = (sectionId: string, idxToDelete: number) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.images || [];
    handleSectionContentChange(sectionId, 'images', current.filter((_: any, idx: number) => idx !== idxToDelete));
  };

  const handleGalleryItemChange = (sectionId: string, itemIdx: number, value: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.images || [];
    const updated = current.map((url: string, idx: number) => idx === itemIdx ? value : url);
    handleSectionContentChange(sectionId, 'images', updated);
  };

  // Testimonials handlers
  const handleAddTestimonial = (sectionId: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    handleSectionContentChange(sectionId, 'items', [...current, { name: 'Client Name', text: 'Amazing service and great support!' }]);
  };

  const handleDeleteTestimonial = (sectionId: string, idxToDelete: number) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    handleSectionContentChange(sectionId, 'items', current.filter((_: any, idx: number) => idx !== idxToDelete));
  };

  const handleTestimonialChange = (sectionId: string, itemIdx: number, field: string, value: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    const updated = current.map((item: any, idx: number) => idx === itemIdx ? { ...item, [field]: value } : item);
    handleSectionContentChange(sectionId, 'items', updated);
  };

  // FAQ handlers
  const handleAddFAQ = (sectionId: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    handleSectionContentChange(sectionId, 'items', [...current, { question: 'New Question?', answer: 'Answer details here.' }]);
  };

  const handleDeleteFAQ = (sectionId: string, idxToDelete: number) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    handleSectionContentChange(sectionId, 'items', current.filter((_: any, idx: number) => idx !== idxToDelete));
  };

  const handleFAQChange = (sectionId: string, itemIdx: number, field: string, value: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    const updated = current.map((item: any, idx: number) => idx === itemIdx ? { ...item, [field]: value } : item);
    handleSectionContentChange(sectionId, 'items', updated);
  };

  // Blogs handlers
  const handleAddBlog = (sectionId: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    handleSectionContentChange(sectionId, 'items', [
      ...current,
      {
        title: 'New Blog Post',
        description: 'Brief overview of the blog article.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        readTime: '5 min read'
      }
    ]);
  };

  const handleDeleteBlog = (sectionId: string, idxToDelete: number) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    handleSectionContentChange(sectionId, 'items', current.filter((_: any, idx: number) => idx !== idxToDelete));
  };

  const handleBlogChange = (sectionId: string, itemIdx: number, field: string, value: string) => {
    const sec = config.sections.find((s) => s.id === sectionId);
    if (!sec) return;
    const content = sec.content as any;
    const current = content.items || [];
    const updated = current.map((item: any, idx: number) => idx === itemIdx ? { ...item, [field]: value } : item);
    handleSectionContentChange(sectionId, 'items', updated);
  };

  // Save changes to backend database
  const handleSaveWebsite = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    // Keep matching text fields synchronized
    const aboutSection = config.sections.find((s) => s.type === 'about')?.content as any;
    const aboutVal = aboutSection?.description || '';
    
    const contactSection = config.sections.find((s) => s.type === 'contact')?.content as any;
    
    const servicesSection = config.sections.find((s) => s.type === 'services')?.content as any;
    const servicesVal = servicesSection?.items?.map((s: any) => s.name) || [];

    try {
      const res = await fetch('/api/website/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentSite.id,
          subdomain,
          theme,
          isPublished,
          config,
          businessName,
          logoUrl,
          about: aboutVal,
          contactPhone: contactSection?.phone,
          contactEmail: contactSection?.email,
          address: contactSection?.address,
          services: servicesVal
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save changes');
      }

      setSaveStatus({ type: 'success', message: 'Website saved and updated successfully!' });
      
      // Update local websites collection state
      const updatedWebsites = [...websites];
      updatedWebsites[selectedIdx] = data.website;
      setWebsites(updatedWebsites);
    } catch (err: any) {
      setSaveStatus({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const getSectionById = (id: string): any => {
    return config?.sections?.find((s) => s.id === id);
  };

  // Local test link (path-based)
  const liveUrl = `http://localhost:3000/${subdomain}`;

  return (
    <div className="flex-1 flex flex-col gap-6 lg:h-[calc(100vh-120px)] overflow-hidden lg:overflow-visible">
      {/* Overview stats / link ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Globe size={18} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold">Live Website Link</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-semibold text-white font-mono">localhost:3000/{subdomain}</span>
              <span className={`w-2 h-2 rounded-full ${isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
          >
            Visit Live Site
            <ExternalLink size={13} />
          </a>
          
          <button
            onClick={handleSaveWebsite}
            disabled={isSaving}
            className="flex-1 sm:flex-initial bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/10 cursor-pointer"
          >
            {isSaving ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs leading-relaxed shrink-0 ${
          saveStatus.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {saveStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Workspace Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-y-auto lg:overflow-hidden pb-6">
        
        {/* Left Column: Editor Dashboard Controls */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900/30 border border-slate-900 rounded-3xl overflow-hidden min-h-[500px]">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-900 bg-slate-950/40 shrink-0">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-3 text-xs font-bold tracking-tight border-b-2 transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'content' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit size={14} />
              Editor
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-3 text-xs font-bold tracking-tight border-b-2 transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'theme' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid size={14} />
              Theme Engine
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 text-xs font-bold tracking-tight border-b-2 transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'settings' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings size={14} />
              Config
            </button>
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-track-transparent">
            {activeTab === 'content' && (
              <div className="flex flex-col gap-5">
                {/* Accordion selector for active section */}
                <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-850 mb-1">
                  {config.sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition cursor-pointer ${
                        activeSection === s.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>

                {/* Section Specific Input Forms */}
                {activeSection === 'hero' && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Hero Section Settings</h3>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Hero Title</label>
                      <input
                        type="text"
                        value={getSectionById('hero')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('hero', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Hero Tagline/Subtitle</label>
                      <textarea
                        rows={3}
                        value={getSectionById('hero')?.content.subtitle || ''}
                        onChange={(e) => handleSectionContentChange('hero', 'subtitle', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Hero Background Image URL</label>
                      <input
                        type="text"
                        value={getSectionById('hero')?.content.backgroundImage || ''}
                        onChange={(e) => handleSectionContentChange('hero', 'backgroundImage', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-slate-400 font-semibold">CTA Button Text</label>
                        <input
                          type="text"
                          value={getSectionById('hero')?.content.ctaText || ''}
                          onChange={(e) => handleSectionContentChange('hero', 'ctaText', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-slate-400 font-semibold">CTA Target Anchor</label>
                        <input
                          type="text"
                          value={getSectionById('hero')?.content.ctaLink || ''}
                          onChange={(e) => handleSectionContentChange('hero', 'ctaLink', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'about' && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">About Section Settings</h3>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Section Heading</label>
                      <input
                        type="text"
                        value={getSectionById('about')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('about', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">About Business Description</label>
                      <textarea
                        rows={6}
                        value={getSectionById('about')?.content.description || ''}
                        onChange={(e) => handleSectionContentChange('about', 'description', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">About Side Image URL</label>
                      <input
                        type="text"
                        value={getSectionById('about')?.content.image || ''}
                        onChange={(e) => handleSectionContentChange('about', 'image', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'services' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Services List Settings</h3>
                      <button
                        onClick={() => handleAddService('services')}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={10} />
                        Add Service
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Section Heading</label>
                      <input
                        type="text"
                        value={getSectionById('services')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('services', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {/* Services Loop */}
                    <div className="space-y-4 mt-2">
                      {getSectionById('services')?.content.items?.map((srv: any, idx: number) => (
                        <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-col gap-3 relative group">
                          <button
                            onClick={() => handleDeleteService('services', idx)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 p-1 hover:bg-rose-500/5 rounded transition cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>

                          <span className="text-[10px] text-indigo-400 font-mono font-bold">Service #{idx + 1}</span>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Service Name</label>
                            <input
                              type="text"
                              value={srv.name}
                              onChange={(e) => handleServiceChange('services', idx, 'name', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Description</label>
                            <textarea
                              rows={2}
                              value={srv.description}
                              onChange={(e) => handleServiceChange('services', idx, 'description', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'contact' && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Contact Details Settings</h3>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Heading Title</label>
                      <input
                        type="text"
                        value={getSectionById('contact')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('contact', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Contact Phone Number</label>
                      <input
                        type="text"
                        value={getSectionById('contact')?.content.phone || ''}
                        onChange={(e) => handleSectionContentChange('contact', 'phone', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Contact Email</label>
                      <input
                        type="email"
                        value={getSectionById('contact')?.content.email || ''}
                        onChange={(e) => handleSectionContentChange('contact', 'email', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Physical Address</label>
                      <textarea
                        rows={3}
                        value={getSectionById('contact')?.content.address || ''}
                        onChange={(e) => handleSectionContentChange('contact', 'address', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'gallery' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Gallery Settings</h3>
                      <button
                        onClick={() => handleAddGalleryItem('gallery')}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={10} />
                        Add Photo URL
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Section Heading</label>
                      <input
                        type="text"
                        value={getSectionById('gallery')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('gallery', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-3 mt-2">
                      {getSectionById('gallery')?.content.images?.map((url: string, idx: number) => (
                        <div key={idx} className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex items-center gap-2 relative">
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => handleGalleryItemChange('gallery', idx, e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                          <button
                            onClick={() => handleDeleteGalleryItem('gallery', idx)}
                            className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'testimonials' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Testimonials Settings</h3>
                      <button
                        onClick={() => handleAddTestimonial('testimonials')}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={10} />
                        Add Review
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Section Heading</label>
                      <input
                        type="text"
                        value={getSectionById('testimonials')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('testimonials', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-4 mt-2">
                      {getSectionById('testimonials')?.content.items?.map((item: any, idx: number) => (
                        <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col gap-2 relative">
                          <button
                            onClick={() => handleDeleteTestimonial('testimonials', idx)}
                            className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Author Name</label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleTestimonialChange('testimonials', idx, 'name', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Quote text</label>
                            <textarea
                              rows={2}
                              value={item.text}
                              onChange={(e) => handleTestimonialChange('testimonials', idx, 'text', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'faq' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">FAQ Accordions Settings</h3>
                      <button
                        onClick={() => handleAddFAQ('faq')}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={10} />
                        Add Question
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Section Heading</label>
                      <input
                        type="text"
                        value={getSectionById('faq')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('faq', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-4 mt-2">
                      {getSectionById('faq')?.content.items?.map((item: any, idx: number) => (
                        <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col gap-2 relative">
                          <button
                            onClick={() => handleDeleteFAQ('faq', idx)}
                            className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Question</label>
                            <input
                              type="text"
                              value={item.question}
                              onChange={(e) => handleFAQChange('faq', idx, 'question', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Answer text</label>
                            <textarea
                              rows={2}
                              value={item.answer}
                              onChange={(e) => handleFAQChange('faq', idx, 'answer', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'blogs' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Blogs List Settings</h3>
                      <button
                        onClick={() => handleAddBlog('blogs')}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={10} />
                        Add Article
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Section Heading</label>
                      <input
                        type="text"
                        value={getSectionById('blogs')?.content.title || ''}
                        onChange={(e) => handleSectionContentChange('blogs', 'title', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-4 mt-2">
                      {getSectionById('blogs')?.content.items?.map((item: any, idx: number) => (
                        <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col gap-2 relative">
                          <button
                            onClick={() => handleDeleteBlog('blogs', idx)}
                            className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Article Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleBlogChange('blogs', idx, 'title', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Description Overview</label>
                            <textarea
                              rows={3}
                              value={item.description}
                              onChange={(e) => handleBlogChange('blogs', idx, 'description', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none resize-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] text-slate-500 font-semibold uppercase">Image URL</label>
                            <input
                              type="text"
                              value={item.image || ''}
                              onChange={(e) => handleBlogChange('blogs', idx, 'image', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] text-slate-500 font-semibold uppercase">Publish Date</label>
                              <input
                                type="text"
                                value={item.date}
                                onChange={(e) => handleBlogChange('blogs', idx, 'date', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[9px] text-slate-500 font-semibold uppercase">Read Time</label>
                              <input
                                type="text"
                                value={item.readTime}
                                onChange={(e) => handleBlogChange('blogs', idx, 'readTime', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'footer' && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Footer Settings</h3>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Footer Text Line</label>
                      <input
                        type="text"
                        value={getSectionById('footer')?.content.text || ''}
                        onChange={(e) => handleSectionContentChange('footer', 'text', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-slate-400 font-semibold">Copyright Text</label>
                      <input
                        type="text"
                        value={getSectionById('footer')?.content.copyright || ''}
                        onChange={(e) => handleSectionContentChange('footer', 'copyright', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="flex flex-col gap-5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Select Visual Theme</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Change the color scheme, layout borders, and font typography across all sections.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {(Object.keys(THEME_CONFIGS) as ThemeType[]).map((themeKey) => {
                    const activeCfg = THEME_CONFIGS[themeKey];
                    const isSelected = theme === themeKey;
                    
                    return (
                      <button
                        key={themeKey}
                        onClick={() => setTheme(themeKey)}
                        className={`p-4 border text-left rounded-2xl flex flex-col justify-between transition-all aspect-video relative overflow-hidden group cursor-pointer ${
                          isSelected 
                            ? 'border-indigo-500 bg-indigo-550/10 shadow-lg shadow-indigo-600/5' 
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5 z-10">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            isSelected ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'
                          }`}>
                            {themeKey}
                          </span>
                          <span className="text-xs font-bold text-white">{activeCfg.name}</span>
                        </div>

                        {/* Visual Color Pill row */}
                        <div className="flex gap-1.5 mt-4 z-10">
                          <span className={`w-3.5 h-3.5 rounded-full border border-slate-700/10 ${activeCfg.colors.primary.split(' ')[0]}`} />
                          <span className={`w-3.5 h-3.5 rounded-full border border-slate-700/10 ${activeCfg.colors.background.split(' ')[0]}`} />
                          <span className={`w-3.5 h-3.5 rounded-full border border-slate-700/10 ${activeCfg.colors.sectionBg.split(' ')[0]}`} />
                        </div>

                        {/* Subtle selection ring */}
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-indigo-500 flex items-center justify-center text-slate-950 font-bold text-[8px]">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="flex flex-col gap-5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">General Configurations</h3>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold">Subdomain Directory Slug</label>
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono text-emerald-400"
                  />
                  <p className="text-[10px] text-slate-500">
                    Warning: Changing the subdomain directory will alter your live website URL instantly.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold">Business General Title</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-slate-400 font-semibold">Business Logo Image URL</label>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-855 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono text-indigo-400"
                    placeholder="https://..."
                  />
                </div>

                <hr className="border-slate-850" />

                <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-850 rounded-2xl">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Publish Status</span>
                    <span className="text-[10px] text-slate-500">Controls visitor access to this site</span>
                  </div>
                  <button
                    onClick={() => setIsPublished(!isPublished)}
                    className={`w-12 h-6.5 rounded-full p-1 transition duration-200 cursor-pointer ${
                      isPublished ? 'bg-emerald-500 flex justify-end' : 'bg-slate-700 flex justify-start'
                    }`}
                  >
                    <span className="w-4.5 h-4.5 bg-slate-950 rounded-full shadow" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Mock Screen Preview */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900/30 border border-slate-900 rounded-3xl overflow-hidden min-h-[500px]">
          {/* Header Preview Ribbon */}
          <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-900 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Eye size={14} className="text-indigo-400" />
              Live Visual Preview
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded font-mono font-medium">
              Real-Time JSON Driven render
            </span>
          </div>

          {/* Scrolling Mock View Container */}
          <div className="flex-1 overflow-y-auto bg-slate-950 scrollbar-thin scrollbar-track-transparent">
            {/* Embedded Live Renderer mockup container */}
            <div className="w-full relative origin-top scale-100 min-h-full">
              {/* Site Header Navbar */}
              <div className={`p-4 flex items-center justify-between border-b ${THEME_CONFIGS[theme].colors.cardBg} select-none`}>
                <span className={`text-xs font-bold ${THEME_CONFIGS[theme].colors.textTitle}`}>
                  {businessName}
                </span>
                <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400">
                  <span>About</span>
                  <span>Services</span>
                  <span>Gallery</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Dynamic configs sections render loop */}
              <div>
                {config.sections?.map((section) => (
                  <SectionRenderer
                    key={section.id}
                    type={section.type}
                    content={section.content}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
