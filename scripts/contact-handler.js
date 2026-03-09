/* ============================================
   CONTACT HANDLER — Google Sheets Integration
   ============================================
   Setup: Replace SHEET_URL with your Google Apps Script Web App URL.
   
   Google Sheets setup steps:
   1. Create a Google Sheet with columns: Timestamp, First Name, Last Name, Email, Type, Message
   2. Extensions → Apps Script → paste the doPost function from README
   3. Deploy as Web App (Anyone can access) → copy URL below
   ============================================ */

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxAmXqgte7eeS5ImPZsp7r5AiF8jRnJYPYFWnvrVbd9WWYpwo8YzoFWQw5fAlhMJ4ahDg/exec';

const form = document.getElementById('contactForm');
if (!form) {
  // not on home page, skip
} else {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending…';

    const data = {
      timestamp: new Date().toISOString(),
      firstName: getValue('firstName'),
      lastName: getValue('lastName'),
      email: getValue('email'),
      requestType: getValue('requestType'),
      message: getValue('message'),
    };

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      handleSuccess(btn, form);
    } catch (err) {
      handleError(btn);
    }
  });
}

function getValue(id) {
  return document.getElementById(id)?.value?.trim() || '';
}

function fakeSend() {
  return new Promise(res => setTimeout(res, 1200));
}

function handleSuccess(btn, form) {
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Request';
  form.reset();
  clearErrors();
  showNotification('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
}

function handleError(btn) {
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Request';
  showNotification('❌ Something went wrong. Please email me directly.', 'error');
}

/* ---- Client-side Validation ---- */
function validateForm() {
  clearErrors();
  let valid = true;

  const email = getValue('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    setError('fg-email', true); valid = false;
  }
  if (!getValue('requestType')) {
    setError('fg-requestType', true); valid = false;
  }
  if (!getValue('message')) {
    setError('fg-message', true); valid = false;
  }

  return valid;
}

function setError(groupId, hasError) {
  document.getElementById(groupId)?.classList.toggle('has-error', hasError);
}

function clearErrors() {
  document.querySelectorAll('.form-group.has-error').forEach(el => el.classList.remove('has-error'));
}

// Live field validation
['email', 'requestType', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    const group = el.closest('.form-group');
    if (el.value.trim()) group?.classList.remove('has-error');
  });
});

/* ============================================
   GOOGLE APPS SCRIPT (paste into Apps Script editor):

   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.timestamp,
       data.firstName,
       data.lastName,
       data.email,
       data.requestType,
       data.message
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ result: 'success' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ============================================ */
