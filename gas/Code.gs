/**
 * 勉強会 申込フォーム 受信用 Google Apps Script ウェブアプリ。
 *
 * 役割:
 *   - ポータルの申込フォームから POST を受け取る
 *   - 通知先（NOTIFY_TO）へメール通知する
 *   - （任意）スプレッドシートに申込内容を記録する
 *
 * デプロイ:
 *   1. script.google.com で新規プロジェクトを作成し、本ファイルを貼り付け
 *   2. 下の NOTIFY_TO / SHEET_ID を設定
 *   3. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」
 *        - 実行ユーザー: 自分
 *        - アクセスできるユーザー: 全員
 *   4. 発行された /exec URL をポータルの site.config.ts(formEndpoint) に設定
 */

// ▼ 通知先メールアドレス
var NOTIFY_TO = 'r.tanaka@pntwhere.com';

// ▼ 申込ログを残すスプレッドシートID（不要なら空文字のまま）。
//    空でもメール通知は動作する。
var SHEET_ID = '';
var SHEET_TAB = 'applications';

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // ハニーポット（ボット除外）
    if (p._gotcha) {
      return _text('OK');
    }

    var data = {
      name: _clean(p.name),
      company: _clean(p.company),
      email: _clean(p.email),
      phone: _clean(p.phone),
      message: _clean(p.message),
      timestamp: new Date(),
    };

    // 必須チェック
    if (!data.name || !data.company || !data.email) {
      return _text('NG: required fields missing');
    }

    _notify(data);
    if (SHEET_ID) _record(data);

    return _text('OK');
  } catch (err) {
    return _text('ERROR: ' + err);
  }
}

// 動作確認用（ブラウザで /exec を開いた時）
function doGet() {
  return _text('Workshop form endpoint is running.');
}

function _notify(d) {
  var subject = '【勉強会申込】' + d.company + ' / ' + d.name + ' 様';
  var body = [
    '勉強会の申し込みがありました。',
    '',
    '■お名前: ' + d.name,
    '■会社名・団体名: ' + d.company,
    '■メール: ' + d.email,
    '■電話: ' + (d.phone || '（未記入）'),
    '■希望テーマ・ご質問:',
    (d.message || '（未記入）'),
    '',
    '受付日時: ' + Utilities.formatDate(d.timestamp, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_TO,
    subject: subject,
    body: body,
    replyTo: d.email,
    name: 'WHERE Partner Portal',
  });
}

function _record(d) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(SHEET_TAB);
  if (!sh) {
    sh = ss.insertSheet(SHEET_TAB);
    sh.appendRow(['受付日時', 'お名前', '会社名・団体名', 'メール', '電話', '希望テーマ・ご質問']);
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
