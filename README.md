# Shree Nath Mahato — Portfolio Website

A responsive, dark-themed portfolio website built with pure HTML, CSS, and JavaScript. Ready for GitHub Pages.

---

## 📁 File Structure

```
portfolio/
├── index.html               ← Homepage
├── about.html               ← About Me
├── projects.html            ← Projects Showcase
├── certifications.html      ← Certifications
├── 404.html                 ← Custom error page
├── GOOGLE_APPS_SCRIPT.gs    ← Paste this into Apps Script
├── assets/
│   └── images/
│       ├── projects/        ← Drop project images here (project-01.jpg … project-06.jpg)
│       └── certificates/    ← Drop certificate images here
├── styles/
│   ├── styles.css           ← Global styles
│   ├── index.css            ← Homepage styles
│   ├── about.css            ← About page styles
│   ├── projects.css         ← Projects page styles
│   └── certifications.css   ← Certifications page styles
└── scripts/
    ├── script.js            ← Global JS (navbar, reveal, counter, tilt)
    ├── contact-handler.js   ← Form + Google Sheets integration
    ├── about.js             ← About page JS
    ├── projects.js          ← Projects filter JS
    └── certifications.js    ← Certifications JS
```

---

## 🔗 Google Sheets Contact Form — Step-by-Step Setup

### Step 1 — Create the Google Sheet
1. Go to [https://sheets.google.com](https://sheets.google.com)
2. Click **Blank** to create a new spreadsheet
3. Rename it to something like **"Portfolio Contact Form"**

### Step 2 — Open Apps Script
1. In your Google Sheet, click the menu: **Extensions → Apps Script**
2. A new tab will open with the Apps Script editor

### Step 3 — Paste the script
1. **Delete everything** in the editor (select all → delete)
2. Open the file `GOOGLE_APPS_SCRIPT.gs` from this folder
3. **Copy all the code** and paste it into the Apps Script editor
4. Click the **Save** icon (or press `Ctrl+S` / `Cmd+S`)

### Step 4 — Run setup (add column headers)
1. In the function dropdown (next to the ▶ Run button), select **`setupHeaders`**
2. Click **▶ Run**
3. A permissions popup will appear — click **Review permissions**
4. Choose your Google account → click **Advanced** → **Go to Portfolio Contact Form (unsafe)** → **Allow**
5. Your sheet now has bold frozen headers: `Timestamp | First Name | Last Name | Email | Request Type | Message`

### Step 5 — Deploy as Web App
1. Click **Deploy → New deployment**
2. Click the gear icon ⚙ next to "Select type" → choose **Web app**
3. Fill in the settings:
   - **Description:** Portfolio Contact Form
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**
5. A popup shows your **Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`
6. **Copy this URL**

### Step 6 — Paste the URL into the website
1. Open `scripts/contact-handler.js`
2. Find this line near the top:
   ```
   const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your copied URL:
   ```
   const SHEET_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Save the file

### Step 7 — Test it
1. Open `index.html` in a browser
2. Fill in the contact form and submit
3. Go back to your Google Sheet — a new row should appear within seconds! ✅

---

## 🖼️ Adding Your Images

### Project Images
Drop images into `assets/images/projects/` with these exact names:
| File | Project |
|------|---------|
| `project-01.jpg` | Sales Analytics Dashboard |
| `project-02.jpg` | Customer Churn Prediction |
| `project-03.jpg` | COVID-19 Data Analysis |
| `project-04.jpg` | E-Commerce SQL Analytics |
| `project-05.jpg` | House Price Prediction |
| `project-06.jpg` | HR Analytics Dashboard |

**Recommended size:** 800×450px (16:9 ratio)  
**If no image is provided:** A stylized gradient placeholder shows automatically.

### Certificate Images
Drop certificate images into `assets/images/certificates/`.  
Then update the `src` attribute in `certifications.html` to point to your image paths.

---

## 🚀 GitHub Pages Deployment

### Step 1 — Create a GitHub repository
1. Go to [https://github.com](https://github.com) → click **New repository**
2. Name it `portfolio` (or `your-username.github.io` for a root domain)
3. Set to **Public**
4. Click **Create repository**

### Step 2 — Upload your files
**Option A — GitHub website (easiest):**
1. In your new repo, click **Add file → Upload files**
2. Drag and drop your entire `portfolio/` folder contents
3. Click **Commit changes**

**Option B — Git command line:**
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Select branch: **main** (or **master**), folder: **/ (root)**
5. Click **Save**
6. Wait ~2 minutes, then your site is live at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Step 4 — Update your contact-handler.js with the Apps Script URL (if not done yet)
After deploying, make sure `contact-handler.js` has your real Google Apps Script URL.

---

## 🎨 Customization

### Update social links
Search for `href="#"` in all HTML files and replace with your real URLs:
- LinkedIn: `https://linkedin.com/in/YOUR-USERNAME`
- GitHub: `https://github.com/YOUR-USERNAME`

### Update project cards
Edit `projects.html` — replace project titles, descriptions, and links with your real projects.

### Update certifications
Edit `certifications.html` — replace credential links (`href="#"`) with your real Coursera/credential URLs.

---

## 📧 Contact

shreenath.ventures17@gmail.com
