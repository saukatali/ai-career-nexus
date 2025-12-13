# Gemini API Quota Management Guide

## 🚨 Quota Exceeded Error

If you see: **"You exceeded your current quota"**, here's what to do:

---

## **Immediate Solutions**

### Option 1: Wait for Reset ⏰
- Free tier quotas reset automatically
- Wait time shown in error (usually 30-60 seconds)
- Refresh and try again

### Option 2: Get New API Key 🔑
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your new key
4. Update `frontend/.env`:
   ```env
   VITE_GEMINI_API_KEY=your_new_api_key_here
   ```
5. Restart frontend server:
   ```powershell
   cd D:\HACKTHON1\frontend
   npm run dev
   ```

### Option 3: Upgrade Plan 💎
- Visit [Google AI Pricing](https://ai.google.dev/pricing)
- Upgrade to paid tier for higher limits
- Better for production use

---

## **Free Tier Limits**

**gemini-2.0-flash-exp:**
- Requests: Limited per minute
- Tokens: Limited per day
- Best for: Development & testing

**Rate Limits:**
- 15 requests per minute
- 1 million tokens per day
- 1,500 requests per day

---

## **Best Practices**

### 1. **Implement Rate Limiting**
Add delays between requests:
```javascript
// In your service
await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
```

### 2. **Cache Responses**
Store AI responses to avoid repeated calls:
```javascript
const cache = {};
if (cache[prompt]) return cache[prompt];
// ... make API call
cache[prompt] = result;
```

### 3. **Use Mock Mode for Development**
Create a development mode with mock responses:
```javascript
const DEV_MODE = true;
if (DEV_MODE) return mockResponse;
```

### 4. **Monitor Usage**
- Check usage: https://ai.dev/usage?tab=rate-limit
- Set up alerts for quota warnings
- Track requests in your app

---

## **Error Handling in Code**

The app now includes improved error messages:

```javascript
// geminiService.js - Enhanced error handling
if (error.message?.includes('quota')) {
  throw new Error('⚠️ AI quota exceeded. Please wait or update API key.');
}
```

```jsx
// SkillMatcher.jsx - User-friendly UI errors
if (error.message?.includes('quota')) {
  setMatchError('⚠️ AI quota exceeded. Wait a moment and try again.');
}
```

---

## **Monitoring Your Quota**

### Check Current Usage:
1. Visit [AI Studio Usage](https://ai.dev/usage?tab=rate-limit)
2. View your daily/monthly quotas
3. See when limits reset

### API Key Management:
- Use different keys for dev/prod
- Rotate keys if needed
- Delete unused keys for security

---

## **Alternative Solutions**

### 1. **Backend Proxy** (Recommended for Production)
Move API calls to backend:
- Better security (hide API key)
- Centralized rate limiting
- Easier quota management

### 2. **Multiple API Keys**
Rotate between keys:
```javascript
const API_KEYS = [
  'key1',
  'key2',
  'key3'
];
// Use round-robin or random selection
```

### 3. **Graceful Degradation**
Fall back to static content when quota exceeded:
```javascript
try {
  return await geminiAPI();
} catch (error) {
  if (error.includes('quota')) {
    return fallbackContent;
  }
}
```

---

## **Quick Fix Commands**

**Restart with new API key:**
```powershell
# 1. Update frontend/.env with new key
# 2. Restart frontend
cd D:\HACKTHON1\frontend
npm run dev
```

**Check if backend needs restart:**
```powershell
# Backend uses separate key in backend/.env
cd D:\HACKTHON1\backend
# Update .env if needed, server auto-reloads
```

---

## **Current Implementation**

**Files with Gemini API:**
- `frontend/src/services/geminiService.js` - Main API service
- `frontend/src/hooks/useGemini.js` - React hook
- `frontend/src/pages/AICoach.jsx` - Chat interface
- `frontend/src/pages/SkillGap.jsx` - Skill analysis
- `frontend/src/pages/SkillMatcher.jsx` - Job matching
- `frontend/src/pages/ResumeAnalyzer.jsx` - Resume analysis
- `backend/routes/resume_analyzer.py` - Backend AI endpoints

**Error Handling:**
- ✅ User-friendly error messages
- ✅ Quota detection
- ✅ Helpful guidance with links
- ✅ Console logging for debugging

---

## **Need Help?**

1. **Check API Key**: Ensure it's valid and active
2. **Monitor Usage**: https://ai.dev/usage
3. **Read Docs**: https://ai.google.dev/gemini-api/docs/rate-limits
4. **Get Support**: https://ai.google.dev/support

---

*Last Updated: 2025-12-13*
*Model: gemini-2.0-flash-exp*
