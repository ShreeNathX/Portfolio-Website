# Contact form deployment

The portfolio is static. Its Google Apps Script deployment is a separate service, so this source must be installed and redeployed in the bound Apps Script project before the server-side controls are active.

1. Open the Google Sheet used by the contact form and select **Extensions → Apps Script**.
2. Replace the existing handler with `Code.gs` from this folder and save it.
3. In **Deploy → Manage deployments**, edit the current web app deployment and select a new version. Keep execution set to your account and access set to anyone.
4. Authorize the script to write to the sheet, then confirm the deployment URL still matches `contactSheetUrl` in `src/main.jsx`. If it changed, update that constant.

The handler validates fields and allowed topics, treats the hidden `website` field as a honeypot, limits submissions to three per email and sixty total per UTC day, serializes sheet writes, and escapes formula-like user input. It uses script properties and a script lock for shared rate-limit state. The browser uses `no-cors`, so it cannot read the handler's response to confirm delivery.
