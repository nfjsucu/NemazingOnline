import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'nemazing.balance';
const DEFAULT_BALANCE = 1000;

@Injectable({ providedIn: 'root' })
export class BalanceService {
  private balance$ = new BehaviorSubject<number>(this.load());

  readonly value = this.balance$.asObservable();

  get current(): number {
    return this.balance$.value;
  }

  set(amount: number): void {
    const v = Math.max(0, Math.round(amount));
    this.balance$.next(v);
    this.save(v);
  }

  add(delta: number): void {
    this.set(this.current + delta);
  }

  canAfford(amount: number): boolean {
    return this.current >= amount;
  }

  reset(): void {
    this.set(DEFAULT_BALANCE);
  }

  private load(): number {
    if (typeof localStorage === 'undefined') return DEFAULT_BALANCE;
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw == null ? NaN : Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_BALANCE;
  }

  private save(v: number): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, String(v));
  }
}
