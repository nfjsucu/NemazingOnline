import { Injectable } from '@angular/core';

const STORAGE_KEY = 'nemazing.settings';

export interface AppSettings {
  music: boolean;
  sfx: boolean;
  quality: 'low' | 'medium' | 'high';
  nickname: string;
}

const DEFAULTS: AppSettings = {
  music: true,
  sfx: true,
  quality: 'high',
  nickname: 'Игрок'
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  load(): AppSettings {
    if (typeof localStorage === 'undefined') return { ...DEFAULTS };
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    try {
      return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULTS };
    }
  }

  save(settings: AppSettings): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}
