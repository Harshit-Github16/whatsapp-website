# DevOps & Production Deployment Guide

This guide explains how to configure, test, and deploy the WhatsApp Onboarded single-page website builder SaaS platform.

---

## 1. Environment Variable Configurations
Create a `.env` file in the root directory and copy the contents of `.env.example`. Replace the placeholder keys with your credentials:

- **DATABASE_URL**: A standard PostgreSQL connection string. You can spawn a free Postgres DB instantly on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
- **NEXT_PUBLIC_BASE_DOMAIN**: The primary domain (e.g., `localhost:3000` in dev or `mybuilder.com` in production). Used by middleware to parse subdomains.
- **TWILIO credentials**: Required to authenticate outgoing/incoming WhatsApp events.
- **CLOUDINARY credentials**: Required for compression & responsive image storage.

---

## 2. Local Database Migrations
If you are connecting a real PostgreSQL database, execute the following commands to create the database schema:

```bash
# Push schema directly to your database (no migration history)
npx prisma db push

# OR create a formal SQL migration history
npx prisma migrate dev --name init

# Re-build Prisma client types
npx prisma generate
```

*Note: If no database URL is set, the application automatically boots in mock-mode, saving users and sites to a local JSON database in `src/services/db_mock.json` for zero-configuration testing.*

---

## 3. Local Sandbox Webhook Testing (with ngrok)
Twilio needs a public URL to send webhook POST requests when a WhatsApp message is received.

1. **Install ngrok** (if not already installed):
   ```bash
   brew install ngrok/ngrok/ngrok
   ```
2. **Start the local server**:
   ```bash
   npm run dev
   ```
   *(runs on `http://localhost:3000`)*
3. **Open a tunnel** on port 3000:
   ```bash
   ngrok http 3000
   ```
4. **Copy the Forwarding URL** (e.g., `https://a1b2-34-56.ngrok-free.app`).

---

## 4. Twilio Sandbox Configuration
1. Log in to the [Twilio Console](https://console.twilio.com/).
2. Navigate to **Messaging > Try it Out > Send a WhatsApp Message** to join the sandbox.
3. Under **Sandbox Settings**, set the **WHEN A MESSAGE COMES IN** webhook URL to:
   ```
   [YOUR_NGROK_FORWARDING_URL]/api/whatsapp
   ```
4. Ensure the HTTP method is set to **POST**.
5. Save the settings. Send `START` to your sandbox number to begin onboarding!

---

## 5. Cloudinary Setup
1. Log in to your [Cloudinary Console](https://cloudinary.com/).
2. Copy your **Cloud Name**, **API Key**, and **API Secret** from the dashboard.
3. Paste these in your `.env` file. Logo and gallery image uploads will now be optimized and stored in Cloudinary automatically.

---

## 6. Production Deployment (Vercel + Wildcard Domains)
To deploy this monolithic application on Vercel with wildcard subdomain support:

### Step 6.1: Deploy to Vercel
1. Connect your GitHub repository to Vercel.
2. Add all keys from `.env.example` to the **Environment Variables** panel in Vercel.
3. Click **Deploy**.

### Step 6.2: Configure Wildcard Subdomains on Vercel
To support dynamic sites like `businessname.yourdomain.com`:
1. In Vercel, go to **Project Settings > Domains**.
2. Click **Add**.
3. Enter your primary domain with a wildcard prefix:
   ```
   *.yourdomain.com
   ```
4. Select the option to bind it to your project root.
5. Vercel will generate the DNS settings:
   - For a custom domain, add a CNAME record in your registrar (e.g., GoDaddy, Cloudflare, Namecheap):
     - **Type**: CNAME
     - **Name**: `*`
     - **Target**: `cname.vercel-dns.com`
6. Once DNS propagates, visiting `anything.yourdomain.com` will hit the Next.js middleware and load the specific tenant's website automatically!
