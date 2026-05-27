export type ThemeType = 'modern' | 'minimal' | 'luxury' | 'medical' | 'restaurant' | 'gym';

export type SectionType = 
  | 'hero' 
  | 'about' 
  | 'services' 
  | 'gallery' 
  | 'testimonials' 
  | 'contact' 
  | 'faq' 
  | 'cta' 
  | 'footer'
  | 'blogs';

export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaText: string;
  ctaLink: string;
}

export interface AboutContent {
  title: string;
  description: string;
  image?: string;
}

export interface ServiceItem {
  name: string;
  description: string;
}

export interface ServicesContent {
  title: string;
  items: ServiceItem[];
}

export interface GalleryContent {
  title: string;
  images: string[];
}

export interface TestimonialItem {
  name: string;
  text: string;
}

export interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
}

export interface ContactContent {
  title: string;
  phone: string;
  email: string;
  address: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  items: FAQItem[];
}

export interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface FooterContent {
  text: string;
  copyright: string;
}

export interface BlogItem {
  title: string;
  description: string;
  image?: string;
  date: string;
  readTime: string;
}

export interface BlogsContent {
  title: string;
  items: BlogItem[];
}

export type SectionContentMap = {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  gallery: GalleryContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  faq: FAQContent;
  cta: CTAContent;
  footer: FooterContent;
  blogs: BlogsContent;
};

export interface WebsiteSection<T extends SectionType = SectionType> {
  id: string;
  type: T;
  content: SectionContentMap[T];
}

export interface WebsiteConfig {
  theme: ThemeType;
  businessName: string;
  category: string;
  sections: WebsiteSection[];
}

export type OnboardingStep =
  | 'WELCOME'
  | 'NAME'
  | 'CATEGORY'
  | 'LOGO'
  | 'GALLERY'
  | 'PHONE'
  | 'EMAIL'
  | 'ADDRESS'
  | 'SERVICES'
  | 'ABOUT'
  | 'THEME'
  | 'COMPLETED'
  | 'EDIT_MENU'
  | 'EDIT_NAME'
  | 'EDIT_THEME'
  | 'EDIT_LOGO'
  | 'EDIT_SERVICES'
  | 'EDIT_ABOUT'
  | 'EDIT_CONTACT'
  | 'EDIT_CONTACT_PHONE'
  | 'EDIT_CONTACT_EMAIL'
  | 'EDIT_CONTACT_ADDRESS'
  | 'EDIT_BLOGS'
  | 'EDIT_BLOGS_ADD_TITLE'
  | 'EDIT_BLOGS_ADD_DESC'
  | 'EDIT_BLOGS_ADD_IMAGE'
  | 'EDIT_TESTIMONIALS'
  | 'EDIT_TESTIMONIALS_ADD_NAME'
  | 'EDIT_TESTIMONIALS_ADD_TEXT'
  | 'EDIT_FAQ'
  | 'EDIT_FAQ_ADD_QUESTION'
  | 'EDIT_FAQ_ADD_ANSWER'
  | 'EDIT_GALLERY'
  | 'EDIT_GALLERY_ADD';

export interface OnboardingSessionData {
  id: string;
  phoneNumber: string;
  step: OnboardingStep;
  businessName?: string;
  category?: string;
  logoUrl?: string;
  galleryUrls: string[];
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  services: string[];
  about?: string;
  theme?: ThemeType;
  createdAt: Date;
  updatedAt: Date;
}
