const SHEET_NAME = 'Reporter Applications';
function doPost(e) {
  const d = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(['Application ID','Application Date','Full Name','Gmail','Phone Number','Profile Photo URL','Address / Location','Biography','Application Status','Admin Decision','Review Date','Reviewer','Admin Notes']);
  sh.appendRow([d.applicationId||'',d.applicationDate||'',d.fullName||'',d.email||'',d.phone||'',d.profilePhotoUrl||'',d.address||'',d.biography||'',d.status||'PENDING','','','','']);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
