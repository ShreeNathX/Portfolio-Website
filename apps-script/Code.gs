function doGet() {
  try {
    getContactSheet();
    if (!PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET_KEY')) {
      throw new Error('TURNSTILE_SECRET_KEY is not configured.');
    }
    return jsonResponse({ result: 'ready' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ result: 'setup_required' });
  }
}

function doPost(event) {
  try {
    var body = String(event && event.postData && event.postData.contents || '{}');
    if (body.length > 12000) return jsonResponse({ result: 'invalid_request' });
    var data = JSON.parse(body);

    if (String(data.website || '').trim()) {
      return jsonResponse({ result: 'accepted' });
    }

    if (!verifyTurnstile(data.turnstileToken)) {
      return jsonResponse({ result: 'verification_failed' });
    }

    var message = validateMessage(data);
    var sheet = getContactSheet();

    var day = Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd');
    var emailHash = hashEmail(message.email);
    var prefix = 'CONTACT_RL_' + day + '_';
    var globalKey = prefix + 'TOTAL';
    var emailKey = prefix + emailHash;
    var lock = LockService.getScriptLock();
    lock.waitLock(5000);

    try {
      var properties = PropertiesService.getScriptProperties();
      properties.getKeys().forEach(function (key) {
        if (key.indexOf('CONTACT_RL_') === 0 && key.indexOf(prefix) !== 0) {
          properties.deleteProperty(key);
        }
      });

      var dailyTotal = Number(properties.getProperty(globalKey)) || 0;
      var emailTotal = Number(properties.getProperty(emailKey)) || 0;
      if (dailyTotal >= 60 || emailTotal >= 3) {
        return jsonResponse({ result: 'rate_limited' });
      }

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Timestamp', 'First name', 'Last name', 'Email', 'Topic', 'Message']);
      }

      sheet.appendRow([
        new Date(),
        safeCell(message.firstName),
        safeCell(message.lastName),
        safeCell(message.email),
        safeCell(message.requestType),
        safeCell(message.message),
      ]);
      SpreadsheetApp.flush();

      properties.setProperty(globalKey, String(dailyTotal + 1));
      properties.setProperty(emailKey, String(emailTotal + 1));
      return jsonResponse({ result: 'success' });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return jsonResponse({ result: 'error' });
  }
}

function getContactSheet() {
  var properties = PropertiesService.getScriptProperties();
  var spreadsheetId = String(properties.getProperty('CONTACT_SPREADSHEET_ID') || '').trim();
  if (!spreadsheetId) throw new Error('CONTACT_SPREADSHEET_ID is not configured.');

  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheetName = String(properties.getProperty('CONTACT_SHEET_NAME') || '').trim();
  var sheet = sheetName ? spreadsheet.getSheetByName(sheetName) : spreadsheet.getSheets()[0];
  if (!sheet) throw new Error(sheetName ? 'Configured contact sheet tab was not found.' : 'The spreadsheet has no sheets.');
  return sheet;
}

function verifyTurnstile(token) {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;

  var secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET_KEY');
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not configured.');
    return false;
  }

  try {
    var response = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      payload: { secret: secret, response: token },
      muteHttpExceptions: true,
    });
    if (response.getResponseCode() !== 200) {
      console.error('Turnstile Siteverify returned HTTP ' + response.getResponseCode() + '.');
      return false;
    }

    var result = JSON.parse(response.getContentText());
    if (result.success !== true) {
      console.error('Turnstile rejected the token: ' + (result['error-codes'] || []).join(', '));
      return false;
    }
    if (result.hostname !== 'shreenathx.github.io') {
      console.error('Turnstile hostname mismatch: ' + result.hostname);
      return false;
    }
    if (result.action !== 'contact') {
      console.error('Turnstile action mismatch: ' + result.action);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function validateMessage(data) {
  var firstName = cleanText(data.firstName, 80);
  var lastName = cleanText(data.lastName, 80);
  var email = cleanText(data.email, 254).toLowerCase();
  var requestType = cleanText(data.requestType, 40);
  var message = cleanText(data.message, 5000);
  var allowedTypes = ['Data project', 'Job opportunity', 'Collaboration', 'Something else'];

  if (!firstName || !lastName || !message) throw new Error('Required information is missing.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error('Email address is invalid.');
  if (allowedTypes.indexOf(requestType) === -1) throw new Error('Request topic is invalid.');
  if (message.length < 10) throw new Error('Message is too short.');

  return { firstName: firstName, lastName: lastName, email: email, requestType: requestType, message: message };
}

function cleanText(value, maxLength) {
  if (typeof value !== 'string') throw new Error('Text fields must be strings.');
  var cleaned = value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  if (cleaned.length > maxLength) throw new Error('A text field is too long.');
  return cleaned;
}

function safeCell(value) {
  return /^[\s]*[=+\-@]/.test(value) ? "'" + value : value;
}

function hashEmail(email) {
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email, Utilities.Charset.UTF_8);
  return digest.map(function (byte) {
    return ('0' + ((byte + 256) % 256).toString(16)).slice(-2);
  }).join('');
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
