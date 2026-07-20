import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-page-coinflip',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <app-banner backgroundimgpath="/assets/images/banners/banner_2026_04_04_gold.jpg" cookiesuffix="banner_2026_04_04_gold"></app-banner>
    <app-layout>
      <div class="fixed-size">
        <a routerLink="/" class="back-link">← На главную</a>
        <h1 class="game-title">Орёл или решка</h1>
        <p class="game-sub">Ваш баланс: <b>{{ balance }} NMZ</b></p>
        <div class="coinflip">
          <div class="coin" [class.flip]="spinning" [class.heads]="result === 'heads'">
            {{ result === 'heads' ? '🪙' : '🌟' }}
          </div>
          <div class="bet-row">
            <button *ngFor="let b of bets" (click)="play(b)" [disabled]="spinning || balance < b">Ставка {{ b }} NMZ</button>
          </div>
          <p class="result" *ngIf="message">{{ message }}</p>
        </div>
      </div>
    </app-layout>
  `,
  styles: [
    `
      :host { display: block; color: #fff; font-family: Montserrat, Arial, sans-serif; }
      .fixed-size { max-width: 1100px; margin: 0 auto; padding: 24px; }
      .back-link { color: #9aa; text-decoration: none; }
      .game-title { font-size: 32px; margin: 10px 0 4px; }
      .game-sub { opacity: 0.8; margin: 0 0 20px; }
      .coinflip { text-align: center; }
      .coin {
        font-size: 90px; width: 160px; height: 160px; line-height: 160px; margin: 0 auto 24px;
        border-radius: 50%; background: rgba(255,255,255,0.06); border: 2px solid rgba(255,255,255,0.2);
        transition: transform 0.1s;
      }
      .coin.flip { animation: spin 1s ease-in-out; }
      .coin.heads { transform: rotateY(0deg); }
      @keyframes spin { 0% { transform: rotateY(0); } 100% { transform: rotateY(1080deg); } }
      .bet-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      .bet-row button {
        cursor: pointer; border: none; border-radius: 10px; padding: 14px 22px;
        background: linear-gradient(135deg, #451bde, #7b2ff7); color: #fff; font-weight: 700;
      }
      .bet-row button:disabled { opacity: 0.5; cursor: default; }
      .result { margin-top: 18px; font-size: 18px; }
    `,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CoinflipPageComponent implements OnInit {
  balance = 0;
  bets = [50, 100, 500, 1000];
  spinning = false;
  result: 'heads' | 'tails' = 'heads';
  message = '';

  private balanceService = inject(BalanceService);

  ngOnInit(): void {
    this.balanceService.value.subscribe((v) => (this.balance = v));
  }

  play(amount: number): void {
    if (this.spinning || this.balance < amount) return;
    this.spinning = true;
    this.message = '';
    this.balanceService.subtract(amount);
    setTimeout(() => {
      const win = Math.random() < 0.5;
      this.result = win ? 'heads' : 'tails';
      if (win) this.balanceService.add(amount * 2);
      this.spinning = false;
      this.message = win ? `Выпал орёл! +${amount * 2} NMZ` : 'Выпала решка. Проигрыш.';
    }, 1000);
  }
}
