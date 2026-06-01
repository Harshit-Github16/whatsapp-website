import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Business from '@/models/Business';

// GET - Fetch business by slug
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }

        await connectDB();
        const business = await Business.findOne({ slug });

        if (!business) {
            return NextResponse.json(
                { error: 'Business not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ business }, { status: 200 });
    } catch (error) {
        console.error('Error fetching business:', error);
        return NextResponse.json(
            { error: 'Failed to fetch business' },
            { status: 500 }
        );
    }
}

// POST - Create or update business
export async function POST(request) {
    try {
        const data = await request.json();
        const { slug, businessName, category, about, services, logoUrl, heroImageUrl, galleryUrls, phone, email, address, theme, ownerName, sectionOrder, customSections } = data;

        if (!slug || !businessName) {
            return NextResponse.json(
                { error: 'Slug and business name are required' },
                { status: 400 }
            );
        }

        // Clean slug: lowercase, replace spaces with hyphens, remove special characters
        const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');

        await connectDB();

        // Check if business already exists by phone first, then by old slug
        let business = null;
        if (phone) {
            business = await Business.findOne({ phone });
        }
        if (!business && cleanSlug) {
            business = await Business.findOne({ slug: cleanSlug });
        }

        if (business) {
            // Check if slug is being changed, and if so, check if new slug is already taken by another business
            if (cleanSlug && cleanSlug !== business.slug) {
                const existingWithSlug = await Business.findOne({ slug: cleanSlug });
                if (existingWithSlug && existingWithSlug._id.toString() !== business._id.toString()) {
                    return NextResponse.json(
                        { error: 'This URL slug is already taken. Please choose another one.' },
                        { status: 400 }
                    );
                }
                business.slug = cleanSlug;
            }

            // Update existing business details
            business.businessName = businessName;
            business.ownerName = ownerName || business.ownerName;
            business.category = category || business.category;
            business.about = about || business.about;
            business.services = services || business.services;
            business.logoUrl = logoUrl || business.logoUrl;
            business.heroImageUrl = heroImageUrl || business.heroImageUrl;
            business.galleryUrls = galleryUrls || business.galleryUrls;
            business.phone = phone || business.phone;
            business.email = email || business.email;
            business.address = address || business.address;
            business.theme = theme || business.theme;
            if (sectionOrder) {
                business.sectionOrder = sectionOrder;
            }
            if (customSections) {
                business.customSections = customSections;
            }

            await business.save();

            return NextResponse.json(
                { message: 'Business updated successfully', business },
                { status: 200 }
            );
        } else {
            // Check if slug is already taken before creating new
            const existingWithSlug = await Business.findOne({ slug: cleanSlug });
            if (existingWithSlug) {
                return NextResponse.json(
                    { error: 'This URL slug is already taken. Please choose another one.' },
                    { status: 400 }
                );
            }

            // Create new business
            business = new Business({
                slug: cleanSlug,
                businessName,
                ownerName: ownerName || '',
                category: category || 'Local Business',
                about: about || '',
                services: services || [],
                logoUrl: logoUrl || '',
                heroImageUrl: heroImageUrl || '',
                galleryUrls: galleryUrls || [],
                phone: phone || '',
                email: email || '',
                address: address || '',
                theme: theme || 'medical',
                sectionOrder: sectionOrder || ['home', 'about', 'services', 'gallery', 'testimonials', 'contact'],
                customSections: customSections || [],
                isPublished: false,
                paymentStatus: 'pending',
            });

            await business.save();

            return NextResponse.json(
                { message: 'Business created successfully', business },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error('Error saving business:', error);
        return NextResponse.json(
            { error: 'Failed to save business' },
            { status: 500 }
        );
    }
}

// PUT - Update payment status and publish
export async function PUT(request) {
    try {
        const data = await request.json();
        const { slug, paymentId, orderId, paymentStatus } = data;

        if (!slug) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }

        await connectDB();
        const business = await Business.findOne({ slug });

        if (!business) {
            return NextResponse.json(
                { error: 'Business not found' },
                { status: 404 }
            );
        }

        // Update payment details
        if (paymentId) business.paymentId = paymentId;
        if (orderId) business.orderId = orderId;
        if (paymentStatus) business.paymentStatus = paymentStatus;

        // Publish the website if payment is completed
        if (paymentStatus === 'completed') {
            business.isPublished = true;
        }

        await business.save();

        return NextResponse.json(
            { message: 'Business updated successfully', business },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating business:', error);
        return NextResponse.json(
            { error: 'Failed to update business' },
            { status: 500 }
        );
    }
}
