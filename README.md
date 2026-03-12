# BenefitsPath

Free unemployment benefits navigator for Americans who have lost their jobs.

## What this does
- Checks unemployment eligibility across all 50 states
- Guides users to the correct state portal and forms
- Generates professional appeal letters for denied claims
- Connects users with employment lawyers

## File structure
```
benefitspath/
├── index.html          ← HTML entry point
├── vite.config.js      ← Build tool config
├── package.json        ← Dependencies
├── vercel.json         ← Vercel routing config
├── .gitignore
├── public/
│   └── favicon.svg     ← Site icon
└── src/
    ├── main.jsx        ← React entry point
    └── App.jsx         ← Main app (all code lives here)
```

## How to connect Google Sheets

1. Create a new Google Sheet with these headers in Row 1:
   ```
   Timestamp | Email | State | End Reason | Employment Length |
   Application Status | Eligibility Score | Eligibility Likelihood |
   Appeal: First Name | Appeal: Last Name | Appeal: Claim ID |
   Appeal: Denial Date | Appeal: Was Layoff | Appeal: Term Reason |
   Lawyer: Name | Lawyer: Phone | Lawyer: Email | Lawyer: Situation | Source
   ```

2. In the Sheet → Extensions → Apps Script → paste this and save:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.timestamp, data.email, data.state, data.endReason,
       data.employmentLength, data.applicationStatus,
       data.eligibilityScore, data.eligibilityLikelihood,
       data.appealFirstName, data.appealLastName, data.appealClaimId,
       data.appealDenialDate, data.appealWasLayoff, data.appealTermReason,
       data.lawyerName, data.lawyerPhone, data.lawyerEmail,
       data.lawyerSituation, data.source
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ result: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Deploy → New Deployment → Web App
   - Execute as: Me
   - Who has access: Anyone
   - Copy the URL

4. Open `src/App.jsx` and replace:
   ```
   const SHEETS_WEBHOOK_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   with your copied URL. Then push to GitHub — Vercel redeploys automatically.

## How to deploy (Vercel)

1. Push this folder to a GitHub repository
2. Go to vercel.com → Add New Project → select your repo
3. Click Deploy (no settings to change — Vite is auto-detected)
4. Done — you get a live URL instantly

## How to add a custom domain

1. Buy a domain (namecheap.com or godaddy.com)
2. In Vercel dashboard → your project → Settings → Domains
3. Enter your domain → copy the DNS records Vercel gives you
4. Paste those records into your domain registrar's DNS settings
5. Live in 15–30 minutes
