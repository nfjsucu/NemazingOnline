import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BalanceService } from './balance.service';

export interface InventoryItem {
  id: number;
  name: string;
  icon: string;
  price: number;
}

const STORAGE_KEY = 'nemazing.inventory';

const DEFAULT_ITEMS: InventoryItem[] = [
  { id: 1, name: 'Автомобиль: Phoenix', icon: '🚗', price: 150 },
  { id: 2, name: 'Дом: Вилла у озера', icon: '🏠', price: 400 },
  { id: 3, name: 'Оружие: Компактный пистолет', icon: '🔫', price: 80 },
  { id: 4, name: 'Одежда: Чёрная куртка', icon: '🧥', price: 60 },
  { id: 5, name: 'Питомец: Хаски', icon: '🐺', price: 120 },
];

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private items$ = new BehaviorSubject<InventoryItem[]>(this.load());

  readonly items = this.items$.asObservable();

  constructor(private balance: BalanceService) {}

  get list(): InventoryItem[] {
    return this.items$.value;
  }

  sell(item: InventoryItem): void {
    const next = this.list.filter(i => i.id !== item.id);
    this.items$.next(next);
    this.balance.add(item.price);
    this.save(next);
  }

  private load(): InventoryItem[] {
    if (typeof localStorage === 'undefined') return [...DEFAULT_ITEMS];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_ITEMS];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_ITEMS];
    } catch {
      return [...DEFAULT_ITEMS];
    }
  }

  private save(items: InventoryItem[]): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
