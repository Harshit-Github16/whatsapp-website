import { NextResponse } from 'next/server';
import ImageKit from '@imagekit/nodejs';

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT || 'https://ik.imagekit.io/whatssite'
});

export async function POST(request) {
    try {
        const { image, folder = 'whatssite' } = await request.json();

        if (!image) {
            return NextResponse.json(
                { error: 'Image data is required' },
                { status: 400 }
            );
        }

        // Upload image to ImageKit
        const uploadResponse = await imagekit.files.upload({
            file: image, // Supports base64 data strings
            fileName: `img_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
            folder: folder,
        });

        return NextResponse.json(
            {
                success: true,
                url: uploadResponse.url,
                publicId: uploadResponse.fileId,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error uploading image to ImageKit:', error);
        return NextResponse.json(
            { error: 'Failed to upload image', details: error.message },
            { status: 500 }
        );
    }
}
