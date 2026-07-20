import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthUiService } from '../services/auth-ui.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-overlay" *ngIf="ui.isOpen | async" (click)="ui.close()">
      <div class="auth-card" (click)="$event.stopPropagation()">
        <button class="auth-close" (click)="ui.close()">×</button>
        <div class="auth-tabs">
          <button [class.active]="!register" (click)="register = false">Вход</button>
          <button [class.active]="register" (click)="register = true">Регистрация</button>
        </div>

        <form (ngSubmit)="submit()" *ngIf="!register">
          <input [(ngModel)]="nickname" name="nick" placeholder="Никнейм" required />
          <input [(ngModel)]="password" name="pass" type="password" placeholder="Пароль" required />
          <button type="submit" [disabled]="loading">{{ loading ? '...' : 'Войти' }}</button>
        </form>

        <form (ngSubmit)="submit()" *ngIf="register">
          <input [(ngModel)]="nickname" name="nick" placeholder="Никнейм (от 3 символов)" required />
          <input [(ngModel)]="password" name="pass" type="password" placeholder="Пароль" required />
          <button type="submit" [disabled]="loading">{{ loading ? '...' : 'Создать аккаунт' }}</button>
        </form>

        <p class="auth-error" *ngIf="error">{{ error }}</p>
        <p class="auth-hint" *ngIf="auth.isLoggedIn">
          Вы вошли как <b>{{ (auth.user | async)?.nickname }}</b>
          <button class="auth-logout" (click)="logout()">Выйти</button>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: Montserrat, Arial, sans-serif;
      }
      .auth-card {
        position: relative;
        width: 340px;
        background: #1b1b2b;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        padding: 26px 22px;
        color: #fff;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      .auth-close {
        position: absolute;
        top: 10px;
        right: 14px;
        background: none;
        border: none;
        color: #aaa;
        font-size: 24px;
        cursor: pointer;
      }
      .auth-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 18px;
      }
      .auth-tabs button {
        flex: 1;
        padding: 9px;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        color: #ccc;
        cursor: pointer;
        font-weight: 600;
      }
      .auth-tabs button.active {
        background: #451bde;
        color: #fff;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      input {
        padding: 11px 12px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.06);
        color: #fff;
        font-family: inherit;
      }
      form button[type='submit'] {
        margin-top: 4px;
        padding: 11px;
        border: none;
        border-radius: 8px;
        background: #451bde;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
      }
      form button[type='submit']:disabled {
        opacity: 0.6;
        cursor: default;
      }
      .auth-error {
        color: #ff6b6b;
        margin: 12px 0 0;
        font-size: 14px;
      }
      .auth-hint {
        margin: 14px 0 0;
        font-size: 14px;
        opacity: 0.85;
      }
      .auth-logout {
        margin-left: 8px;
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #fff;
        border-radius: 6px;
        padding: 3px 8px;
        cursor: pointer;
      }
    `,
  ],
})
export class AuthModalComponent {
  ui = inject(AuthUiService);
  auth = inject(AuthService);

  register = false;
  nickname = '';
  password = '';
  loading = false;
  error = '';

  submit(): void {
    if (!this.nickname.trim() || !this.password) {
      this.error = 'Заполните все поля';
      return;
    }
    this.loading = true;
    this.error = '';
    const op = this.register
      ? this.auth.register(this.nickname.trim(), this.password)
      : this.auth.login(this.nickname.trim(), this.password);
    op.subscribe({
      next: () => {
        this.loading = false;
        this.ui.close();
      },
      error: (e: any) => {
        this.loading = false;
        this.error = e?.error?.error || 'Ошибка';
      },
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
