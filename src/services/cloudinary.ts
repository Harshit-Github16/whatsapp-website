import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary only if environment variables are provided
const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Uploads a base64 string or remote image URL to Cloudinary,
 * compressing quality and limiting resolution to 800px.
 */
export async function uploadImageToCloudinary(
  fileSource: string,
  folder = 'whatsapp_sites'
): Promise<string> {
  if (!isCloudinaryConfigured) {
    console.warn(
      '⚠️ Cloudinary credentials missing in environment. Bypassing upload, returning asset URL.'
    );
    return fileSource;
  }

  try {
    const result = await cloudinary.uploader.upload(fileSource, {
      folder,
      resource_type: 'image',
      // Cloudinary transformation pipelines for compression & optimization:
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    return result.secure_url;
  } catch (err) {
    console.error('Failed to upload image to Cloudinary:', err);
    // Return original image source as fallback
    return fileSource;
  }
}
