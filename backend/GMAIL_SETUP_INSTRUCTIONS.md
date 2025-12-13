# 📧 Gmail Email Setup Instructions

## Email करने के लिए ये steps follow करें:

### Step 1: Gmail App Password बनाएं

1. **Google Account खोलें:** https://myaccount.google.com/

2. **Security पर click करें** (left sidebar में)

3. **2-Step Verification enable करें** (अगर पहले से नहीं है):
   - "2-Step Verification" पर click करें
   - Enable करें अपना phone number देकर

4. **App Password बनाएं**:
   - वापस Security page पर जाएं
   - "App passwords" search करें या नीचे scroll करें
   - "App passwords" पर click करें
   - अपना Gmail password enter करें
   - "Select app" में **"Mail"** select करें
   - "Select device" में **"Windows Computer"** select करें
   - **"Generate"** पर click करें
   - 16-digit password copy कर लें (जैसे: `abcd efgh ijkl mnop`)

### Step 2: Backend .env File Update करें

1. **Open file:** `backend/.env`

2. **ये lines update करें:**

```env
# Email Configuration
MAIL_USERNAME=आपका-gmail@gmail.com
MAIL_PASSWORD=app-password-यहाँ-paste-करें
MAIL_FROM=आपका-gmail@gmail.com
```

**Example:**
```env
MAIL_USERNAME=example@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop
MAIL_FROM=example@gmail.com
```

⚠️ **Important:** 
- Regular Gmail password नहीं, **App Password** use करें
- App Password में spaces हटाएं या वैसे ही रखें (दोनों काम करता है)

### Step 3: Backend Server Restart करें

Terminal में ये command चलाएं:

```powershell
cd D:\HACKTHON1\backend
D:/HACKTHON1/.venv/Scripts/python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Step 4: Test करें

1. Frontend खोलें: http://localhost:5173/skill-matcher
2. किसी job पर **"Apply Now"** click करें
3. Form भरें और **"Submit Application"** click करें
4. Email check करें: **masisaukatali13@gmail.com**

---

## ✅ Email भेजने के बाद आपको दिखेगा:

Backend terminal में:
```
📧 Connecting to Gmail SMTP server...
🔐 Logging in as your-email@gmail.com...
📨 Sending email to masisaukatali13@gmail.com...
✅ Email sent successfully to masisaukatali13@gmail.com!
```

---

## ❌ अगर Email नहीं गया तो:

### Error: "Gmail authentication failed"

**Solution:**
1. Check करें कि `.env` में सही Gmail address है
2. App Password सही copy किया है (regular password नहीं)
3. 2-Step Verification enable है
4. Spaces remove करें App Password से

### Error: "Email credentials not configured"

**Solution:**
1. `.env` file सही जगह है: `backend/.env`
2. `MAIL_USERNAME` और `MAIL_PASSWORD` correct हैं
3. Backend server restart करें

---

## 📋 क्या Email में होगा:

✅ Job Details (Title, Company, Salary, Location)  
✅ Applicant Info (Name, Email, Phone)  
✅ Resume filename (अगर upload किया)  
✅ Cover Letter  
✅ Professional HTML formatting  
✅ Timestamp

---

## 🔒 Security:

- App Password safe है - ये सिर्फ email भेजने के लिए है
- Regular Gmail password से secure है
- आप कभी भी revoke कर सकते हैं

---

## Need Help?

अगर कोई problem है तो:
1. Backend terminal में errors check करें
2. `.env` file double-check करें
3. Gmail App Password फिर से generate करें
