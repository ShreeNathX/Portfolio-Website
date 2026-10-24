# Contact form deployment

The portfolio is static. Its Google Apps Script deployment is a separate service, so this source must be installed and redeployed in the bound Apps Script project before the server-side controls are active.

1. Open the Google Sheet used by the contact form and select **Extensions → Apps Script**.
2. Replace the existing handler with `Code.gs` from this folder and save it.
3. In **Deploy → Manage deployments**, edit the current web app deployment and select a new version. Keep execution set to your account and access set to anyone.
4. Authorize the script to write to the sheet, then confirm the deployment URL still matches `contactSheetUrl` in `src/main.jsx`. If it changed, update that constant.

The handler validates fields and allowed topics, treats the hidden `website` field as a honeypot, verifies a Cloudflare Turnstile token server-side, limits submissions to three per email and sixty total per UTC day, serializes sheet writes, and escapes formula-like user input. It uses script properties and a script lock for shared rate-limit state. Turnstile tokens are single-use and expire after five minutes.

## Turnstile setup

1. Create a Cloudflare Turnstile widget for the hostname `shreenathx.github.io` and copy its site key and secret key.
2. In the GitHub repository, add the site key as an Actions repository variable named `VITE_TURNSTILE_SITE_KEY` (Settings → Secrets and variables → Actions → Variables). The site key is public and is embedded in the static build.
3. In Apps Script, open **Project Settings → Script Properties** and add `TURNSTILE_SECRET_KEY` with the secret key. Do not put this secret in the repository or the website.
4. Save and redeploy the Apps Script web app as a new version using the steps above, then rerun the GitHub Pages workflow so the site key is included.

Until both keys are configured and the Apps Script deployment is updated, the form stays disabled and directs visitors to email instead. The browser uses `no-cors`, so it cannot read the handler's response to confirm delivery.
