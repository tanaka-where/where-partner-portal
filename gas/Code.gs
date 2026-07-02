/**
 * 面談申し込みフォーム 受信用 Google Apps Script ウェブアプリ。
 *
 * 役割:
 *   - ポータルの申込フォームから POST を受け取る
 *   - 通知先（NOTIFY_TO 複数）へメール通知する
 *   - スプレッドシート（SHEET_ID）に申込内容を記録する
 *
 * デプロイ（既存デプロイの更新でも同じ /exec URL が使えます）:
 *   1. script.google.com のプロジェクトに本ファイルを貼り付け
 *   2. 下の NOTIFY_TO / SHEET_ID を設定
 *   3. 「デプロイ」→「デプロイを管理」→ 既存のウェブアプリを編集 →「新しいバージョン」で更新
 *        - 実行ユーザー: 自分 / アクセスできるユーザー: 全員
 *   4. 初回は権限承認（メール送信・スプレッドシート編集）を行う
 */

// ▼ 通知先メールアドレス（複数可）
var NOTIFY_TO = [
  'r.tanaka@pntwhere.com',
  't.hagiwara@pntwhere.com',
  'k.ochiai@pntwhere.com',
];

// ▼ 申込ログを残すスプレッドシートID（空なら自動で新規作成し、
//    そのIDを実行ログに出力します。以降はそのIDをここに設定してください）
var SHEET_ID = '';
var SHEET_TAB = 'applications';

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    if (p._gotcha) return _text('OK'); // ボット除外

    var data = {
      name: _clean(p.name),
      company: _clean(p.company),
      email: _clean(p.email),
      phone: _clean(p.phone),
      message: _clean(p.message),
      timestamp: new Date(),
    };
    if (!data.name || !data.company || !data.email) {
      return _text('NG: required fields missing');
    }

    _record(data); // スプレッドシートに記録
    _notify(data); // メール通知

    return _text('OK');
  } catch (err) {
    return _text('ERROR: ' + err);
  }
}

function doGet() {
  return _text('Meeting form endpoint is running.');
}

function _notify(d) {
  var subject = '【面談申し込み】' + d.company + ' / ' + d.name + ' 様';
  var body = [
    '面談の申し込みがありました。',
    '',
    '■お名前: ' + d.name,
    '■会社名・団体名: ' + d.company,
    '■メール: ' + d.email,
    '■電話: ' + (d.phone || '（未記入）'),
    '■ご相談内容・ご希望:',
    d.message || '（未記入）',
    '',
    '受付日時: ' + Utilities.formatDate(d.timestamp, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_TO.join(','),
    subject: subject,
    body: body,
    replyTo: d.email,
    name: 'WHERE Partner Portal',
  });
}

function _record(d) {
  var ss;
  if (SHEET_ID) {
    ss = SpreadsheetApp.openById(SHEET_ID);
  } else {
    // 未設定なら新規作成し、IDをログ出力（次回以降 SHEET_ID に設定してください）
    ss = SpreadsheetApp.create('WHERE 面談申し込み');
    Logger.log('作成したスプレッドシートID: ' + ss.getId());
  }
  var sh = ss.getSheetByName(SHEET_TAB);
  if (!sh) {
    sh = ss.insertSheet(SHEET_TAB);
    sh.appendRow(['受付日時', 'お名前', '会社名・団体名', 'メール', '電話', 'ご相談内容・ご希望']);
  }
  sh.appendRow([
    Utilities.formatDate(d.timestamp, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
    d.name,
    d.company,
    d.email,
    d.phone,
    d.message,
  ]);
}

function _clean(v) {
  return String(v == null ? '' : v).trim().slice(0, 2000);
}
function _text(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.TEXT);
}
