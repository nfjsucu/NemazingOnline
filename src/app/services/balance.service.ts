import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiService } from './auth.service';

const STORAGE_KEY = 'nemazing.balance';
const DEFAULT_BALANCE = 1000;

@Injectable({ providedIn: 'root' })
export class BalanceService {
  private auth = inject(AuthService);
  private api = inject(ApiService);
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
    const target = this.current + delta;
    this.commit(delta, Math.max(0, target));
  }

  subtract(amount: number): void {
    const target = Math.max(0, this.current - amount);
    this.commit(-amount, target);
  }

  canAfford(amount: number): boolean {
    return this.current >= amount;
  }

  reset(): void {
    this.set(DEFAULT_BALANCE);
  }

  private commit(delta: number, target: number): void {
    const token = this.auth.currentToken;
    if (token) {
      const op = delta >= 0 ? this.api.addBalance(token, delta) : this.api.subtractBalance(token, -delta);
      op.subscribe({
        next: (r) => {
          this.balance$.next(r.balance);
          this.save(r.balance);
        },
        error: () => {
          this.balance$.next(target);
          this.save(target);
        },
      });
    } else {
      this.balance$.next(target);
      this.save(target);
    }
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
