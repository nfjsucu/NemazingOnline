import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface RouteMeta {
  title: string;
  description: string;
}

const META: Record<string, RouteMeta> = {
  '': { title: 'Nemazing Online — бесплатная онлайн-игра «Криминальная Россия»', description: 'Nemazing Online — бесплатная браузерная онлайн-игра в жанре «Криминальная Россия».' },
  'start': { title: 'Начать играть — Nemazing Online', description: 'Как начать играть в Nemazing Online.' },
  'promo-video': { title: 'Видео о нас — Nemazing Online', description: 'Промо-ролик проекта Nemazing Online.' },
  'tournaments': { title: 'Турниры — Nemazing Online', description: 'Актуальные турниры Nemazing Online.' },
  'news': { title: 'Новости — Nemazing Online', description: 'Последние новости проекта Nemazing Online.' },
  'help': { title: 'Помощь — Nemazing Online', description: 'Частые вопросы и поддержка Nemazing Online.' },
  'donate': { title: 'Пополнить баланс — Nemazing Online', description: 'Купите игровую валюту NMZ в Nemazing Online.' },
  'rules': { title: 'Правила — Nemazing Online', description: 'Правила проекта Nemazing Online.' },
  'suggestions': { title: 'Предложения — Nemazing Online', description: 'Отправьте предложение по развитию Nemazing Online.' },
  'top': { title: 'Топ игроков — Nemazing Online', description: 'Рейтинг игроков Nemazing Online.' },
  'games/mini/free': { title: 'Рулетка (бесплатно) — Nemazing Online', description: 'Бесплатная рулетка Nemazing Online на игровые NMZ.' },
  'games/mini/gold': { title: 'Рулетка (Gold) — Nemazing Online', description: 'Рулетка Gold в Nemazing Online.' },
  'games/mini/brilliant': { title: 'Рулетка (Brilliant) — Nemazing Online', description: 'Рулетка Brilliant в Nemazing Online.' },
  'games/coinflip': { title: 'Орёл или решка — Nemazing Online', description: 'Мини-игра Орёл или решка на NMZ.' },
  'games/dice': { title: 'Кости — Nemazing Online', description: 'Мини-игра Кости на NMZ.' },
  'my': { title: 'Личный кабинет — Nemazing Online', description: 'Личный кабинет Nemazing Online.' },
  'my/audio': { title: 'Настройки звука — Nemazing Online', description: 'Настройки звука в личном кабинете.' },
  'my/cheat': { title: 'Чит-коды — Nemazing Online', description: 'Чит-коды Nemazing Online.' },
  'my/complaints': { title: 'Жалобы — Nemazing Online', description: 'Подать жалобу в службу поддержки.' },
  'my/gold': { title: 'Пополнение — Nemazing Online', description: 'Пополнение баланса NMZ.' },
  'my/inventory': { title: 'Инвентарь — Nemazing Online', description: 'Инвентарь игрока Nemazing Online.' },
  'my/settings': { title: 'Настройки — Nemazing Online', description: 'Настройки аккаунта Nemazing Online.' },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta, private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const path = e.urlAfterRedirects.split('?')[0].replace(/^\//, '').replace(/\/$/, '');
        const m = META[path] || META[''];
        this.title.setTitle(m.title);
        this.meta.updateTag({ name: 'description', content: m.description });
        this.meta.updateTag({ property: 'og:title', content: m.title });
        this.meta.updateTag({ property: 'og:description', content: m.description });
      });
  }
}
