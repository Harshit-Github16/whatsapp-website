import React from 'react';
import { Metadata } from 'next';
import { db } from '@/services/db';
import { THEME_CONFIGS } from '@/components/themes/config';
import { SectionRenderer } from '@/components/themes';
import { ThemeType, WebsiteConfig, SectionType } from '@/types';
import { AlertCircle, PlusCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ subdomain: string }>;
}

// Next.js Metadata Generator for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subdomain } = await params;
  const site = await db.getWebsiteBySubdomain(subdomain);

  if (!site) {
    return {
      title: 'Website Not Found | SiteBuilder',
      description: 'The requested business website is not available.'
    };
  }

  const title = `${site.businessName} | ${site.category.toUpperCase()}`;
  const description = site.about || `Welcome to ${site.businessName}. Browse our services, contact details, address, and gallery.`;
  const logo = site.logoUrl || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: logo ? [{ url: logo, width: 800, height: 600, alt: site.businessName }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: logo ? [logo] : []
    }
  };
}

export default async function SubdomainPage({ params }: PageProps) {
  const { subdomain } = await params;
  const site = await db.getWebsiteBySubdomain(subdomain);

  // 1. 404 Page if Website does not exist
  if (!site) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <AlertCircle size={36} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Website Not Found</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The website path <code className="bg-slate-950 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs">/{subdomain}</code> has not been registered yet.
          </p>
          <hr className="border-slate-800 w-full my-2" />
          <a
            href="/onboarding"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
          >
            <PlusCircle size={16} />
            Create This Site Now
          </a>
        </div>
      </div>
    );
  }

  // 2. Under Maintenance Page if site is unpublished
  if (!site.isPublished) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <AlertCircle size={36} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">{site.businessName}</h1>
          <p className="text-sm text-slate-400">
            This website is currently under maintenance or has been unpublished by the owner.
          </p>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            Check back later!
          </p>
        </div>
      </div>
    );
  }

  // Load configuration
  const config = site.config as unknown as WebsiteConfig;
  const theme = (site.theme || 'modern') as ThemeType;
  const cfg = THEME_CONFIGS[theme];

  // Schema.org Structured Data
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': site.businessName,
    'description': site.about || '',
    'image': site.logoUrl || '',
    'telephone': site.contactPhone || '',
    'email': site.contactEmail || '',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': site.address || ''
    }
  };

  return (
    <div className={`min-h-screen ${cfg.colors.background} ${cfg.fontBody} scroll-smooth`}>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Dynamic Header Navbar */}
      <header className={`sticky top-0 z-50 border-b ${cfg.colors.cardBg} shadow-sm backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {site.logoUrl ? (
              <img
                src={site.logoUrl}
                alt={`${site.businessName} Logo`}
                className="w-10 h-10 object-cover rounded-full border border-slate-700/20"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                theme === 'minimal' ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'
              }`}>
                {site.businessName[0]}
              </div>
            )}
            <span className={`text-md font-bold tracking-tight ${cfg.colors.textTitle}`}>
              {site.businessName}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>About</a>
            <a href="#services" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Services</a>
            <a href="#gallery" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Gallery</a>
            <a href="#testimonials" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Reviews</a>
            <a href="#contact" className={`hover:${cfg.colors.accentText.split(' ')[0]} transition`}>Contact</a>
          </nav>

          <div>
            <a
              href="#contact"
              className={`text-xs ${cfg.buttonClass.replace('py-3', 'py-2').replace('px-6', 'px-4')} ${cfg.colors.primary} ${cfg.colors.primaryText} ${cfg.colors.primaryHover}`}
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* Render JSON Config Sections */}
      <main>
        {config.sections?.map((section) => (
          <SectionRenderer
            key={section.id}
            type={section.type}
            content={section.content}
            theme={theme}
          />
        ))}
      </main>
    </div>
  );
}
