import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthUser {
  id: number;
  nickname: string;
  balance: number;
}

const TOKEN_KEY = 'nemazing.token';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl =
    (typeof (import.meta as any).env?.['NG_APP_API_URL'] === 'string' && (import.meta as any).env?.['NG_APP_API_URL'])
      ? (import.meta as any).env?.['NG_APP_API_URL']
      : (typeof window !== 'undefined' && (window as any).__NEMAZING_API__)
        ? (window as any).__NEMAZING_API__
        : '';


  constructor(private http: HttpClient) {}

  private req(method: string, url: string, body?: any, token?: string | null): any {
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return this.http.request(method, this.baseUrl + url, { headers, body: body ? JSON.stringify(body) : undefined });
  }

  register(nickname: string, password: string): Observable<{ token: string; user: AuthUser }> {
    return this.req('POST', '/api/register', { nickname, password });
  }

  login(nickname: string, password: string): Observable<{ token: string; user: AuthUser }> {
    return this.req('POST', '/api/login', { nickname, password });
  }

  getMe(token: string): Observable<{ user: AuthUser }> {
    return this.req('GET', '/api/me', undefined, token);
  }

  addBalance(token: string, amount: number): Observable<{ balance: number }> {
    return this.req('POST', '/api/balance/add', { amount }, token);
  }

  subtractBalance(token: string, amount: number): Observable<{ balance: number }> {
    return this.req('POST', '/api/balance/subtract', { amount }, token);
  }

  getInventory(token: string): any {
    return this.req('GET', '/api/inventory', undefined, token);
  }

  sellItem(token: string, itemId: number): any {
    return this.req('POST', '/api/inventory/sell', { itemId }, token);
  }

  getComplaints(token: string): any {
    return this.req('GET', '/api/complaints', undefined, token);
  }

  addComplaint(token: string, text: string): any {
    return this.req('POST', '/api/complaints', { text }, token);
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<AuthUser | null>(null);
  private token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.readToken());

  readonly user = this.user$.asObservable();
  readonly token = this.token$.asObservable();

  constructor(private api: ApiService) {
    const t = this.token$.value;
    if (t) {
      this.api.getMe(t).subscribe({
        next: (r) => this.user$.next(r.user),
        error: () => this.logout(),
      });
    }
  }

  get currentToken(): string | null {
    return this.token$.value;
  }

  get isLoggedIn(): boolean {
    return !!this.token$.value;
  }

  register(nickname: string, password: string): Observable<{ token: string; user: AuthUser }> {
    return this.api.register(nickname, password).pipe(
      tap((r) => this.applyAuth(r.token, r.user))
    );
  }

  login(nickname: string, password: string): Observable<{ token: string; user: AuthUser }> {
    return this.api.login(nickname, password).pipe(
      tap((r) => this.applyAuth(r.token, r.user))
    );
  }

  logout(): void {
    this.clearToken();
    this.user$.next(null);
    this.token$.next(null);
  }

  private applyAuth(token: string, user: AuthUser): void {
    this.writeToken(token);
    this.token$.next(token);
    this.user$.next(user);
  }

  private readToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }
  private writeToken(t: string): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem(TOKEN_KEY, t);
  }
  private clearToken(): void {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(TOKEN_KEY);
  }
}
