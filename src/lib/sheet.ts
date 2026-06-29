import { config } from '../site.config';

export type SheetRow = Record<string, string>;

/**
 * 公開済み Google スプレッドシートの 1 タブを gviz JSON で取得し、
 * ヘッダー行をキーにしたオブジェクト配列で返す（クライアントサイドで実行）。
 * spreadsheetId 未設定時は空配列。
 */
export async function fetchSheet(tab: string): Promise<SheetRow[]> {
  const id = config.sheets.spreadsheetId;
  if (!id) return [];

  const url =
    `https://docs.google.com/spreadsheets/d/${id}/gviz/tq` +
    `?tqx=out:json&headers=1&sheet=${encodeURIComponent(tab)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`sheet fetch failed: ${res.status}`);
  const text = await res.text();

  // 応答は google.visualization.Query.setResponse({...}); で包まれている
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  const json = JSON.parse(text.slice(start, end + 1));

  const cols: string[] = (json.table?.cols ?? []).map((c: any) =>
    String(c.label || c.id || '').trim(),
  );

  const rows: SheetRow[] = (json.table?.rows ?? []).map((r: any) => {
    const obj: SheetRow = {};
    (r.c ?? []).forEach((cell: any, i: number) => {
      const key = cols[i];
      if (key) obj[key] = cell && cell.v != null ? String(cell.v) : '';
    });
    return obj;
  });

  // 全列が空の行は除外
  return rows.filter((row) => Object.values(row).some((v) => v !== ''));
}

/** HTML エスケープ（差し込み描画用） */
export function esc(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** 外部リンクとして安全に開けるか（http/https のみ許可） */
export function safeUrl(u: string): string {
  const s = String(u ?? '').trim();
  return /^https?:\/\//i.test(s) ? s : '';
}
