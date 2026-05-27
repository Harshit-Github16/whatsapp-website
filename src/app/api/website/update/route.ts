import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/services/db';
import { slugify } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('session_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await db.getSession(token);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, subdomain, theme, isPublished, config, businessName, about, contactPhone, contactEmail, address, services } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing website ID' }, { status: 400 });
    }

    // Retrieve existing website to verify ownership
    const website = await db.getWebsiteBySubdomain(subdomain || '');
    const userWebsites = await db.getWebsitesByUserId(session.user.id);
    const ownsWebsite = userWebsites.some((w: any) => w.id === id);

    if (!ownsWebsite) {
      return NextResponse.json({ error: 'Forbidden: You do not own this website' }, { status: 403 });
    }

    const updateData: any = {};

    // Validate and update subdomain if requested
    if (subdomain) {
      const cleanSub = slugify(subdomain);
      if (!cleanSub) {
        return NextResponse.json({ error: 'Invalid subdomain format' }, { status: 400 });
      }

      // Check if subdomain is already taken by someone else
      const existing = await db.getWebsiteBySubdomain(cleanSub);
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: 'This subdomain is already taken by another business' }, { status: 409 });
      }
      updateData.subdomain = cleanSub;
    }

    if (theme) updateData.theme = theme;
    if (typeof isPublished === 'boolean') updateData.isPublished = isPublished;
    if (config) updateData.config = config;
    if (businessName) updateData.businessName = businessName;
    if (about) updateData.about = about;
    if (contactPhone) updateData.contactPhone = contactPhone;
    if (contactEmail) updateData.contactEmail = contactEmail;
    if (address !== undefined) updateData.address = address;
    if (services) updateData.services = services;

    const updated = await db.updateWebsite(id, updateData);

    return NextResponse.json({ success: true, website: updated });
  } catch (err) {
    console.error('Update website API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
