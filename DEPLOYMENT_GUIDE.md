# Deployment Guide for AI Career Nexus

This guide will help you deploy your AI Career Nexus application with:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Render PostgreSQL

---

## 🚀 Prerequisites

Before deploying, ensure you have:
- GitHub repository with your code
- Vercel account (sign up at https://vercel.com)
- Render account (sign up at https://render.com)
- API Keys for:
  - Google Gemini API
  - OpenAI API (optional)
  - Anthropic API (optional)

---

## 📦 Part 1: Deploy Backend on Render

### Step 1: Push Your Code to GitHub
```bash
git init
git add .
git commit -m "Prepare for deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `ai-career-nexus-db`
   - **Database**: `career_nexus`
   - **User**: `career_nexus_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free
4. Click **"Create Database"**
5. **Save the credentials** (Internal Database URL, External Database URL)

### Step 3: Deploy Backend Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ai-career-nexus-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```
     pip install -r requirements.txt && python -m spacy download en_core_web_sm
     ```
   - **Start Command**: 
     ```
     uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan**: Free

4. **Add Environment Variables**:
   Click **"Advanced"** → **"Add Environment Variable"**:
   
   ```
   DATABASE_URL=<your-render-postgresql-internal-url>
   JWT_SECRET_KEY=<generate-random-secret-key>
   GEMINI_API_KEY=<your-gemini-api-key>
   OPENAI_API_KEY=<your-openai-api-key>
   ANTHROPIC_API_KEY=<your-anthropic-api-key>
   ENVIRONMENT=production
   ```

   To generate JWT_SECRET_KEY, run locally:
   ```python
   import secrets
   print(secrets.token_urlsafe(32))
   ```

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. **Copy your backend URL**: `https://ai-career-nexus-backend.onrender.com`

### Step 4: Update CORS Settings

After deployment, update [backend/main.py](backend/main.py) CORS_ORIGINS to include your frontend URL:
```python
CORS_ORIGINS = [
    "http://localhost:5173",
    "https://your-frontend.vercel.app",  # Add this
    "*"
]
```

Commit and push changes to trigger redeployment.

---

## 🌐 Part 2: Deploy Frontend on Vercel

### Step 1: Update API Configuration

Update the API URL in your frontend to point to Render backend:

Create [frontend/.env.production](frontend/.env.production):
```env
VITE_API_URL=https://ai-career-nexus-backend.onrender.com
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   VITE_API_URL=https://ai-career-nexus-backend.onrender.com
   VITE_GEMINI_API_KEY=<your-gemini-api-key>
   ```

6. Click **"Deploy"**
7. Wait 2-3 minutes
8. Your site will be live at: `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend folder
cd frontend

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? ai-career-nexus
# - In which directory is your code located? ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

### Step 3: Configure Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

---

## 🔧 Part 3: Post-Deployment Configuration

### Update Backend CORS

1. Get your Vercel frontend URL
2. Update [backend/main.py](backend/main.py):
   ```python
   CORS_ORIGINS = [
       "https://your-frontend.vercel.app",
       "http://localhost:5173",  # For local development
   ]
   ```
3. Commit and push to trigger Render redeployment

### Initialize Database

1. Go to Render Dashboard → Your Backend Service → **Shell**
2. Run:
   ```bash
   python init_database.py
   ```

Or use the External Database URL to connect from your local machine:
```bash
python init_database.py
```

### Test Your Deployment

1. Visit your Vercel frontend URL
2. Try registering a new account
3. Test login functionality
4. Upload a resume and test features

---

## 📊 Monitoring and Logs

### Render Logs
- Backend Service → **Logs** tab
- View real-time logs and errors

### Vercel Logs
- Project → **Deployments** → Click deployment → **View Function Logs**

---

## ⚠️ Important Notes

### Free Tier Limitations

**Render Free Tier**:
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free

**Vercel Free Tier**:
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless functions included

### Environment Variables Security

**Never commit these to GitHub**:
- API Keys
- Database URLs
- JWT Secrets

Use `.env.local` locally and platform environment variables for production.

### Database Backups

Render Free PostgreSQL:
- No automatic backups on free tier
- Consider exporting data regularly
- Upgrade to paid plan for automated backups

---

## 🐛 Troubleshooting

### Backend Issues

**502 Bad Gateway**:
- Check Render logs for errors
- Verify all environment variables are set
- Check database connection

**CORS Errors**:
- Ensure frontend URL is in CORS_ORIGINS
- Clear browser cache
- Check for trailing slashes in URLs

**Database Connection Failed**:
- Verify DATABASE_URL is correct
- Check if database is active on Render
- Run init_database.py

### Frontend Issues

**API Requests Failing**:
- Verify VITE_API_URL is correct
- Check if backend is awake (free tier sleeps)
- Check browser console for errors

**Build Failed**:
- Check package.json dependencies
- Verify Node.js version compatibility
- Check Vercel build logs

**Environment Variables Not Working**:
- Must start with `VITE_` for Vite
- Redeploy after adding variables
- Hard refresh browser (Ctrl+Shift+R)

---

## 🚀 Deployment Checklist

### Before Deploying:
- [ ] Push code to GitHub
- [ ] Create .env.production files
- [ ] Update CORS settings
- [ ] Test locally

### Render Deployment:
- [ ] Create PostgreSQL database
- [ ] Deploy backend service
- [ ] Add environment variables
- [ ] Initialize database
- [ ] Test API endpoints

### Vercel Deployment:
- [ ] Deploy frontend
- [ ] Add environment variables
- [ ] Test website
- [ ] Configure custom domain (optional)

### Post-Deployment:
- [ ] Update CORS with frontend URL
- [ ] Test all features
- [ ] Monitor logs
- [ ] Set up error tracking (optional)

---

## 📞 Support

If you encounter issues:
1. Check Render/Vercel logs
2. Review this guide
3. Check API quotas
4. Verify environment variables

---

## 🎉 Success!

Your AI Career Nexus platform is now live!

- **Frontend**: https://your-project.vercel.app
- **Backend**: https://ai-career-nexus-backend.onrender.com
- **API Docs**: https://ai-career-nexus-backend.onrender.com/docs

Share your deployed app and start helping people with AI-powered career guidance! 🚀
