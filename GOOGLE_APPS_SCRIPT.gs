// ============================================================
//  GOOGLE APPS SCRIPT — Contact Form → Google Sheet
//  Paste this ENTIRE file into the Apps Script editor
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse incoming JSON from the contact form
    var data = JSON.parse(e.postData.contents);

    // Append a new row with all form fields
    sheet.appendRow([
      new Date(),              // Timestamp (auto-generated server-side)
      data.firstName  || '',
      data.lastName   || '',
      data.email      || '',
      data.requestType || '',
      data.message    || ''
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- Optional: Add column headers on first run ----
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(1, 1, 1, 6).setValues([[
    'Timestamp', 'First Name', 'Last Name', 'Email', 'Request Type', 'Message'
  ]]);
  sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  sheet.setFrozenRows(1);
}
