# Contact form deployment

The portfolio is static. Its Google Apps Script deployment is a separate service, so this source must be installed and redeployed in the bound Apps Script project before the server-side controls are active.

1. Open the Google Sheet used by the contact form and select **Extensions → Apps Script**.
2. Replace the existing handler with `Code.gs` from this folder and save it.
3. In **Deploy → Manage deployments**, edit the current web app deployment and select a new version. Keep execution set to your account and access set to anyone.
4. Authorize the script to write to the sheet, then confirm the deployment URL still matches `contactSheetUrl` in `src/main.jsx`. If it changed, update that constant.

The handler validates fields and allowed topics, treats the hidden `website` field as a honeypot, verifies a Cloudflare Turnstile token server-side, limits submissions to three per email and sixty total per UTC day, serializes sheet writes, and escapes formula-like user input. It uses script properties and a script lock for shared rate-limit state. Turnstile tokens are single-use and expire after five minutes.

## Turnstile setup

1. The existing Turnstile widget is for `shreenathx.github.io`. Its public site key is configured in `src/main.jsx`; it is expected to be visible in the built website. Optionally override it at build time with `VITE_TURNSTILE_SITE_KEY`.
2. Because the previous secret was exposed in a screenshot, rotate it in the Cloudflare Turnstile widget settings before use.
3. In Apps Script, open **Project Settings → Script Properties** and add the newly rotated secret as `TURNSTILE_SECRET_KEY`. Do not put this secret in the repository, website, or chat.
4. Save and redeploy the Apps Script web app as a new version using the steps above. The handler accepts POST requests; opening `/exec` in a browser may report that `doGet` is missing, which is expected.

The email link remains available as a fallback. The browser uses `no-cors`, so it cannot read the handler's response to confirm delivery; the form reports that the request was sent to the contact service without claiming the Sheet write succeeded.
