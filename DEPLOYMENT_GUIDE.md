# 🚀 Deployment Guide - Oraciones de la Mañana

## ✅ Pre-Deployment Checklist

- [x] All code committed to git
- [x] Repository pushed to GitHub
- [x] Build passes with ZERO errors (`npm run build`)
- [x] 26 pages ready (24 spiritual + 2 legal)
- [x] SEO metadata configured
- [x] Legal pages excluded from grids

## 🌐 Deploy to Vercel (Recommended)

### Method 1: Vercel Dashboard (Easiest - 5 minutes)

#### Step 1: Create Project on Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository: **`oracion-manana-site`**
5. Click **"Import"**

#### Step 2: Configure Project

Vercel will auto-detect Next.js. Verify these settings:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**Environment Variables**: Leave empty for now (we'll add after first deploy)

#### Step 3: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes while Vercel builds your site
3. You'll see: ✅ **"Congratulations! Your project has been deployed"**

#### Step 4: Get Your URL

After deployment, Vercel will show your URL:
```
https://oracion-manana-site-XXXXXX.vercel.app
```

Copy this URL!

#### Step 5: Add Environment Variable

1. Go to **Project Settings** (top navigation)
2. Click **"Environment Variables"** (left sidebar)
3. Add new variable:
   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://oracion-manana-site-XXXXXX.vercel.app
   ```
   (paste your actual deployment URL)
4. Select: **Production, Preview, Development**
5. Click **"Save"**

#### Step 6: Redeploy

1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Click **"⋯"** (three dots menu)
4. Click **"Redeploy"**
5. Check **"Use existing Build Cache"** → Uncheck it
6. Click **"Redeploy"**

Wait 2-3 minutes. Done! 🎉

---

### Method 2: Vercel CLI (Advanced)

#### Install Vercel CLI

```bash
npm install -g vercel
```

#### Login to Vercel

```bash
vercel login
```

Follow the browser authentication flow.

#### Deploy

```bash
cd c:\Users\lenovo\Documents\oracion-manana-site

# First deployment (preview)
vercel

# Production deployment
vercel --prod
```

Vercel will ask:
```
? Set up and deploy "oracion-manana-site"? [Y/n] Y
? Which scope? (Use arrow keys)
? Link to existing project? [y/N] N
? What's your project's name? oracion-manana-site
? In which directory is your code located? ./
```

After deployment, you'll get:
```
✅ Production: https://oracion-manana-site.vercel.app
```

#### Add Environment Variable

```bash
# Add environment variable
vercel env add NEXT_PUBLIC_SITE_URL production

# When prompted, enter your deployment URL:
# https://oracion-manana-site.vercel.app

# Redeploy with new variable
vercel --prod
```

---

## 🔍 Post-Deployment Verification

### 1. Check Homepage
Visit: `https://your-deployment-url.vercel.app/`

Verify:
- [x] Hero shows "Oraciones de la mañana"
- [x] "Comienza tu día" section shows 6 prayers
- [x] "Oraciones destacadas" section shows 6 prayers
- [x] Search bar works
- [x] Prayer cards clickable

### 2. Check Article Page
Visit any prayer: `https://your-deployment-url.vercel.app/oracion-de-la-manana`

Verify:
- [x] Breadcrumb navigation works
- [x] Content displays properly
- [x] Spiritual disclaimer shown
- [x] Related prayers appear
- [x] "Volver al inicio" link works

### 3. Check Legal Pages
Visit: `https://your-deployment-url.vercel.app/aviso-legal`

Verify:
- [x] Legal page visible
- [x] NO breadcrumbs (legal pages don't show them)
- [x] NO related content section
- [x] Footer links work

### 4. Check SEO Files

#### Sitemap
Visit: `https://your-deployment-url.vercel.app/sitemap.xml`

Should show:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-deployment-url.vercel.app/</loc>
    <lastmod>2026-01-11...</lastmod>
  </url>
  <url>
    <loc>https://your-deployment-url.vercel.app/oraciones-de-la-manana</loc>
    <lastmod>2026-01-09...</lastmod>
  </url>
  <!-- ... 25 more URLs -->
</urlset>
```

#### Robots.txt
Visit: `https://your-deployment-url.vercel.app/robots.txt`

Should show:
```
User-agent: *
Allow: /

Sitemap: https://your-deployment-url.vercel.app/sitemap.xml
```

---

## 📊 Submit to Google Search Console

### 1. Add Property

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **"Add Property"**
3. Choose **"URL prefix"**
4. Enter: `https://your-deployment-url.vercel.app`
5. Verify ownership:
   - Recommended: **HTML tag** method
   - Add meta tag to `app/layout.tsx` head section
   - Or use **Google Analytics** if already installed

### 2. Submit Sitemap

1. In Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**

Google will start crawling your site within 24-48 hours.

---

## 🎯 Optional: Custom Domain

### Add Custom Domain in Vercel

1. Go to **Project Settings → Domains**
2. Click **"Add"**
3. Enter your domain: `oraciones-manana.com` (example)
4. Follow Vercel's DNS instructions:
   - Add **A record**: `76.76.21.21`
   - Add **CNAME record**: `cname.vercel-dns.com`
5. Wait for DNS propagation (5-60 minutes)

### Update Environment Variable

After custom domain is active:
1. Go to **Environment Variables**
2. Update `NEXT_PUBLIC_SITE_URL` to: `https://oraciones-manana.com`
3. Redeploy

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error**: "Type error: Cannot find module..."

**Solution**: Ensure all imports use correct paths
```bash
# Locally test production build
npm run build

# If it passes locally but fails on Vercel, check:
# - Case sensitivity (Windows vs Linux)
# - All files committed to git
```

### Environment Variable Not Working

**Symptom**: Sitemap still shows `REPLACE_AFTER_VERCEL.vercel.app`

**Solution**:
1. Verify variable name is exactly: `NEXT_PUBLIC_SITE_URL`
2. Verify it's set for **Production** environment
3. **Redeploy** after adding variable (don't use cached build)

### Legal Pages Return 404

**Symptom**: `/aviso-legal` shows 404

**Solution**:
- Check files exist: `content/pages/aviso-legal.mdx`
- Verify frontmatter has: `category: "legal"`
- Rebuild: `npm run build`

---

## ✅ Success Checklist

After deployment, you should have:

- [x] Site live at Vercel URL
- [x] All 26 pages accessible
- [x] Sitemap at `/sitemap.xml`
- [x] Robots.txt at `/robots.txt`
- [x] No console errors in browser
- [x] Mobile responsive
- [x] Search functionality working
- [x] Internal links working
- [x] Legal pages in footer only
- [x] Submitted to Google Search Console

---

## 📞 Support

**Vercel Issues**: https://vercel.com/help
**Next.js Docs**: https://nextjs.org/docs
**Project Repo**: Check your GitHub repository issues

---

**Deployment Status**: 🎯 Ready to Deploy
**Last Updated**: 2026-01-11
**Build Status**: ✅ Passing (32/32 pages)
