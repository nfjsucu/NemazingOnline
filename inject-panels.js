const fs = require('fs');
const path = require('path');

const pagesDir = 'C:\\Users\\Даниил\\Documents\\Default Project\\amazing-clone\\src\\app\\pages';

// Panels keyed by page file base name
const panels = {
  'my-inventory': `
<div class="nemazing-demo-panel" style="max-width:1100px;margin:24px auto;padding:20px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);border-radius:14px;color:#fff;font-family:Montserrat,Arial,sans-serif;">
  <h2 style="margin:0 0 4px;">Инвентарь (демо)</h2>
  <p style="opacity:.7;margin:0 0 14px;">Баланс: <b>{{ balance }} NMZ</b></p>
  <div style="display:flex;flex-wrap:wrap;gap:14px;">
    <div *ngFor="let item of items" style="width:200px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px;text-align:center;">
      <div style="font-size:34px;">{{ item.icon }}</div>
      <div style="margin:6px 0;font-weight:600;">{{ item.name }}</div>
      <button (click)="sell(item)" style="cursor:pointer;border:none;border-radius:8px;padding:8px 12px;background:#e53935;color:#fff;font-weight:600;">Продать за {{ item.price }} NMZ</button>
    </div>
  </div>
  <p *ngIf="soldName" style="color:#7CFC9B;margin-top:14px;">Продано: {{ soldName }} (зачислено на баланс)</p>
</div>`,
  'my-complaints': `
<div class="nemazing-demo-panel" style="max-width:1100px;margin:24px auto;padding:20px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);border-radius:14px;color:#fff;font-family:Montserrat,Arial,sans-serif;">
  <h2 style="margin:0 0 14px;">Подать жалобу (демо)</h2>
  <textarea [(ngModel)]="text" placeholder="Опишите ситуацию..." style="width:100%;min-height:90px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:10px;color:#fff;padding:10px;font-family:inherit;"></textarea>
  <button (click)="submit()" [disabled]="!text.trim()" style="margin-top:10px;cursor:pointer;border:none;border-radius:8px;padding:9px 16px;background:#2196f3;color:#fff;font-weight:600;">Отправить</button>
  <p *ngIf="done" style="color:#7CFC9B;margin-left:12px;display:inline-block;">Жалоба отправлена (№{{ lastId }})</p>
  <div *ngIf="list.length" style="margin-top:18px;">
    <h3 style="margin:0 0 8px;">Мои жалобы</h3>
    <div *ngFor="let c of list" style="padding:10px;border-top:1px solid rgba(255,255,255,.1);">
      <b>#{{ c.id }}</b> — {{ c.text }} <span style="opacity:.5;">({{ c.date }})</span>
    </div>
  </div>
</div>`,
  'my-audio': `
<div class="nemazing-demo-panel" style="max-width:1100px;margin:24px auto;padding:20px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);border-radius:14px;color:#fff;font-family:Montserrat,Arial,sans-serif;">
  <h2 style="margin:0 0 14px;">Настройки звука (демо)</h2>
  <label style="display:flex;align-items:center;gap:10px;margin-bottom:10px;cursor:pointer;">
    <input type="checkbox" [(ngModel)]="settings.music" (change)="save()" /> Музыка в игре
  </label>
  <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
    <input type="checkbox" [(ngModel)]="settings.sfx" (change)="save()" /> Звуковые эффекты
  </label>
  <p *ngIf="saved" style="color:#7CFC9B;margin-top:12px;">Сохранено</p>
</div>`,
  'my-cheat': `
<div class="nemazing-demo-panel" style="max-width:1100px;margin:24px auto;padding:20px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);border-radius:14px;color:#fff;font-family:Montserrat,Arial,sans-serif;">
  <h2 style="margin:0 0 6px;">Чит-коды (демо)</h2>
  <p style="opacity:.7;margin:0 0 12px;">Баланс: <b>{{ balance }} NMZ</b></p>
  <input [(ngModel)]="code" placeholder="Введите код, напр. NEMAZING100" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:10px;color:#fff;padding:10px;font-family:inherit;width:280px;" />
  <button (click)="apply()" style="margin-left:10px;cursor:pointer;border:none;border-radius:8px;padding:9px 16px;background:#9c27b0;color:#fff;font-weight:600;">Применить</button>
  <p *ngIf="msg" style="margin-top:12px;">{{ msg }}</p>
</div>`,
  'my': `
<div class="nemazing-demo-panel" style="max-width:1100px;margin:24px auto;padding:20px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);border-radius:14px;color:#fff;font-family:Montserrat,Arial,sans-serif;">
  <h2 style="margin:0 0 8px;">Кабинет (демо-данные)</h2>
  <p style="opacity:.8;margin:0;">Игрок: <b>{{ nickname }}</b> · Баланс: <b>{{ balance }} NMZ</b></p>
</div>`,
};

for (const base of Object.keys(panels)) {
  const htmlPath = path.join(pagesDir, base + '.component.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  if (html.includes('nemazing-demo-panel')) {
    console.log('already injected: ' + base);
    continue;
  }
  const marker = '</app-layout>';
  const idx = html.lastIndexOf(marker);
  if (idx === -1) {
    html += panels[base];
  } else {
    html = html.slice(0, idx) + panels[base] + html.slice(idx);
  }
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('injected: ' + base);
}
