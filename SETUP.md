# WhatsSite - Setup Instructions

## Database & Image Upload Configuration

### 1. MongoDB Setup ✅
MongoDB is already configured in `.env`:
```
DATABASE_URL="mongodb+srv://harshit0150:harshit0150@cluster0.y5z6n.mongodb.net/?appName=Cluster0"
```

### 2. Cloudinary Setup (Required for Image Uploads)

**Step 1:** Create a free account at [cloudinary.com](https://cloudinary.com)

**Step 2:** Get your credentials from Dashboard:
- Cloud Name
- API Key
- API Secret

**Step 3:** Update `.env` file with your Cloudinary credentials:
```env
CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"
```

### 3. How It Works Now

#### Business Data Flow:
1. **Onboarding**: User fills business details via WhatsApp-style chat
2. **Image Upload**: Images are compressed and uploaded to Cloudinary
3. **Database Save**: All data (including Cloudinary URLs) saved to MongoDB
4. **Payment**: After payment, website is marked as `isPublished: true`
5. **Live Website**: Only published websites are accessible via `/{slug}` route

#### Database Validation:
- **Before**: Any URL like `/random-name` would show a generic page
- **After**: Only businesses in database with `isPublished: true` are accessible
- **Redirect**: Invalid slugs automatically redirect to homepage

### 4. API Endpoints Created

#### `/api/business` (GET)
Fetch business by slug:
```javascript
GET /api/business?slug=sharma-dental
```

#### `/api/business` (POST)
Create or update business:
```javascript
POST /api/business
Body: { slug, businessName, category, about, services, ... }
```

#### `/api/business` (PUT)
Update payment status and publish:
```javascript
PUT /api/business
Body: { slug, paymentId, paymentStatus: 'completed' }
```

#### `/api/upload` (POST)
Upload image to Cloudinary:
```javascript
POST /api/upload
Body: { image: base64String, folder: 'whatssite' }
```

### 5. Database Schema

**Business Model** (`src/models/Business.js`):
```javascript
{
  slug: String (unique, indexed),
  businessName: String,
  category: String,
  about: String,
  services: [String],
  logoUrl: String (Cloudinary URL),
  heroImageUrl: String (Cloudinary URL),
  galleryUrls: [String] (Cloudinary URLs),
  phone: String,
  email: String,
  address: String,
  theme: String (medical/gym/restaurant/salon/realestate),
  isPublished: Boolean (default: false),
  paymentStatus: String (pending/completed/failed),
  paymentId: String,
  orderId: String,
  timestamps: true
}
```

### 6. Testing

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Create a business:**
   - Go to `/onboarding`
   - Fill in business details
   - Upload images (will upload to Cloudinary)
   - Complete payment
   - Website will be published

3. **View live website:**
   - Go to `/{your-business-slug}`
   - Only works if payment completed and `isPublished: true`

4. **Test invalid slug:**
   - Go to `/random-invalid-slug`
   - Should redirect to homepage

### 7. Important Notes

⚠️ **Cloudinary is Required**: Without Cloudinary credentials, images will fallback to base64 (not recommended for production)

✅ **MongoDB is Ready**: Database connection is already configured

🔒 **Security**: Payment verification happens server-side via Razorpay

📱 **WhatsApp Integration**: Twilio credentials already configured in `.env`

### 8. Next Steps

- [ ] Add Cloudinary credentials to `.env`
- [ ] Test image upload functionality
- [ ] Test business creation flow
- [ ] Verify database entries in MongoDB Atlas
- [ ] Test payment flow with Razorpay test mode

---

**Need Help?** Check the API routes in `src/app/api/` for implementation details.
