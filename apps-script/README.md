# Contact form setup

The portfolio frontend is static. It sends contact form submissions to this Google Apps Script web app, which performs validation and writes accepted messages to Google Sheets. No CAPTCHA service is used.

## Install and deploy

1. Open the destination Google Sheet and select **Extensions → Apps Script**.
2. Replace the project code with `Code.gs` from this folder and save it.
3. In **Project Settings → Script Properties**, set `CONTACT_SPREADSHEET_ID` to the ID from the Sheet URL, between `/d/` and `/edit`. Optionally set `CONTACT_SHEET_NAME` to the exact destination tab name; if omitted, the first tab is used. Remove the obsolete `TURNSTILE_SECRET_KEY` property; this version does not use it.
4. Run `doGet` from the editor once and grant the requested Google Sheets permission if prompted.
5. Select **Deploy → Manage deployments**, edit the web app, choose **New version**, then deploy with **Execute as me** and access set to **Anyone**.
6. Confirm the deployment URL matches `contactSheetUrl` in `src/main.jsx`. Open its `/exec` URL; the expected response is `{"result":"ready"}`. If it returns `setup_required`, check **Apps Script → Executions** and confirm the Script Property and Sheet access.

The form is limited to 20 successful entries per UTC day and 3 per email. The backend validates field sizes and topics, ignores submissions that fill the hidden honeypot, serializes writes with a script lock, and escapes formula-like values before writing. It opens the spreadsheet by ID because active spreadsheet methods are unavailable to a bound script running as a web app.

## How to test

Submit a real test message from the live portfolio with a message of at least 10 characters, then confirm a new row appears in the configured tab. Check **Apps Script → Executions** if it does not. The form uses a cross-origin `no-cors` request, so the browser cannot read the Apps Script response. It keeps the entered values and explains that delivery cannot be confirmed from the page.

## Abuse protection

An automated client can still call the public Apps Script URL directly. The honeypot and daily/email limits reduce basic spam, but they cannot prove a request came from the portfolio or prevent a determined attacker from consuming the daily limit. For a low-volume personal portfolio, this may be an acceptable tradeoff. Stronger bot protection requires a CAPTCHA service with server-side validation or a backend proxy; a static page cannot keep a server secret.
