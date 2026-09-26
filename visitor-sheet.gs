const SHEET_NAME = 'Visitors';
function doPost(e) {
  const d = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(['Timestamp','User-Agent','Page URL','Referrer','Device Type','Browser','Operating System']);
  sh.appendRow([d.timestamp||new Date(),d.userAgent||'',d.pageUrl||'',d.referrer||'',d.deviceType||'',d.browser||'',d.operatingSystem||'']);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
