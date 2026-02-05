# Production Deployment Guide

**Project:** Averdi.no Admin System  
**Repository:** https://github.com/Runeov/averdiNextJS  
**Last Updated:** 2026-02-05

---

## 🚀 Quick Deploy to Vercel

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to project
cd C:\dev\November_2025\averdiNextJS

# Link to existing project (first time only)
vercel link

# Deploy to production
vercel --prod
```

---

## 🔧 Environment Variables (Vercel Dashboard)

Go to **Vercel Dashboard** → **Project** → **Settings** → **Environment Variables**

### Required for Production

| Variable | Value | Environment |
|----------|-------|-------------|
| `SITE_URL` | `https://www.averdi.no` | Production |
| `ADMIN_PASSWORD` | `[secure password]` | Production |
| `JWT_SECRET` | `[32+ char random string]` | Production |

### Optional

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_HOTJAR_ID` | `[Hotjar Site ID]` | User analytics |

### Generating JWT_SECRET

```powershell
# PowerShell
$r = [byte[]]::new(32); [Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($r); [Convert]::ToBase64String($r)

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🌐 DNS Configuration

### If domain not already pointing to Vercel:

1. **Add domain in Vercel:**
   - Dashboard → Settings → Domains
   - Add: `averdi.no` and `www.averdi.no`

2. **Update DNS at registrar:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

3. **SSL:** Automatic via Vercel (let's Encrypt)

---

## 👤 Initial Admin Access

| Field | Value |
|-------|-------|
| URL | `https://www.averdi.no/admin/login` |
| Email | `admin@averdi.no` |
| Password | `HildeErRoot1-_-` |

⚠️ **IMPORTANT:** Change password immediately after first login!

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured in Vercel
- [ ] Domain DNS configured
- [ ] Build verified locally (`npm run build`)
- [ ] No uncommitted production changes

### Post-Deployment
- [ ] Verify homepage loads: `https://www.averdi.no`
- [ ] Verify sitemap: `https://www.averdi.no/sitemap.xml`
- [ ] Test admin login: `https://www.averdi.no/admin/login`
- [ ] Check browser console for errors
- [ ] Verify all pages accessible
- [ ] Test 2-3 employee profiles
- [ ] Test 2-3 article pages

### First Week
- [ ] Monitor Vercel analytics
- [ ] Check error logs daily
- [ ] Performance check (Lighthouse)
- [ ] User feedback collection

---

## 🔄 Updating the Site

### Method 1: Git Push (Recommended)

```bash
# Make changes to code
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel auto-deploys on push to `main`.

### Method 2: Vercel CLI

```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: Content Update (Admin Panel)

1. Go to `/admin`
2. Edit employees or articles
3. Changes reflect immediately (JSON files update)

---

## 🔒 Security Checklist

### Immediately After Deployment
- [ ] Change default admin password
- [ ] Add strong JWT_SECRET
- [ ] Verify HTTPS is working
- [ ] Check no sensitive data in client bundles

### Ongoing
- [ ] Keep dependencies updated (`npm update`)
- [ ] Review security advisories weekly
- [ ] Monitor failed login attempts
- [ ] Regular backups of `src/data/*.json`

---

## 💾 Backup Strategy

### Automated (Git)
```bash
# Commit data changes
git add src/data/
git commit -m "Update employees/articles"
git push
```

### Manual Backup
Copy these files regularly:
- `src/data/employees.json`
- `src/data/articles.json`
- `src/data/users.json`

---

## 🚨 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm run clean
npm run build
```

### Admin Login 500 Error
- Check Vercel environment variables
- Verify `ADMIN_PASSWORD` is set
- Check Vercel function logs

### Pages Not Loading
- Check domain DNS propagation (can take 24-48 hours)
- Verify SSL certificate (Vercel Dashboard)
- Check Vercel deployment status

---

## 📊 Monitoring

### Vercel Dashboard
- **Analytics:** Traffic, bandwidth, function invocations
- **Function Logs:** API errors, runtime errors
- **Performance:** Core Web Vitals

### Recommended Tools
- **Uptime Monitor:** UptimeRobot (free tier)
- **Error Tracking:** Sentry.io (free tier)
- **Analytics:** Hotjar (optional)

---

## 📞 Support

- **Vercel Support:** vercel.com/support
- **Next.js Docs:** nextjs.org/docs
- **Project Issues:** github.com/Runeov/averdiNextJS/issues

---

*Document auto-generated for AverdiNextJS production deployment*
