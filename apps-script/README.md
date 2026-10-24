# Contact form deployment

The portfolio is static. Its Google Apps Script deployment is a separate service, so this source must be installed and redeployed in the bound Apps Script project before the server-side controls are active.

1. Open the Google Sheet used by the contact form and select **Extensions → Apps Script**.
2. Replace the existing handler with `Code.gs` from this folder and save it.
3. In **Deploy → Manage deployments**, edit the current web app deployment and select a new version. Keep execution set to your account and access set to anyone.
4. Authorize the script to write to the sheet, then confirm the deployment URL still matches `contactSheetUrl` in `src/main.jsx`. If it changed, update that constant.
5. Open the web app URL in a browser. The updated deployment should show `{"result":"ready"}`. If it says `Script function not found: doGet`, the saved code has not been deployed as a new version.

The handler validates fields and allowed topics, treats the hidden `website` field as a honeypot, verifies a Cloudflare Turnstile token server-side, limits submissions to three per email and sixty total per UTC day, serializes sheet writes, and escapes formula-like user input. It uses script properties and a script lock for shared rate-limit state. Turnstile tokens are single-use and expire after five minutes.

## Turnstile setup

1. The existing Turnstile widget is for `shreenathx.github.io`. Its public site key is configured in `src/main.jsx`; it is expected to be visible in the built website. Optionally override it at build time with `VITE_TURNSTILE_SITE_KEY`.
2. Because the previous secret was exposed in a screenshot, rotate it in the Cloudflare Turnstile widget settings before use.
3. In Apps Script, open **Project Settings → Script Properties** and add the newly rotated **Secret key** as `TURNSTILE_SECRET_KEY`. This is different from the public **Site key** used in the website. Do not put the secret in the repository, website, or chat.
4. Save and redeploy the Apps Script web app as a new version using the steps above.
5. If submissions still do not appear, open **Apps Script → Executions** and inspect the latest `doPost` run. The logs report Turnstile error codes without logging the secret. `invalid-input-secret` means the Script Property is wrong; `missing-input-response` or `invalid-input-response` means token verification failed. A successful execution should finish without an error and append a row to the active sheet.

The email link remains available as a fallback. The browser uses `no-cors`, so it cannot read the handler's response to confirm delivery. The form keeps entered values after submission and tells visitors to check the Sheet before retrying, to avoid losing a message or creating duplicates. The local preview disables submission because Turnstile only allows the configured live hostname.
