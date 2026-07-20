import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-page-dice',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <app-banner backgroundimgpath="/assets/images/banners/banner_2026_04_04_gold.jpg" cookiesuffix="banner_2026_04_04_gold"></app-banner>
    <app-layout>
      <div class="fixed-size">
        <a routerLink="/" class="back-link">← На главную</a>
        <h1 class="game-title">Кости (больше/меньше 7)</h1>
        <p class="game-sub">Ваш баланс: <b>{{ balance }} NMZ</b></p>
        <div class="dice-game">
          <div class="dice">⚀ ⚁ ⚂ ⚃ ⚄ ⚅<br />{{ dice1 }} + {{ dice2 }} = {{ sum }}</div>
          <div class="bet-row">
            <button (click)="play('over')" [disabled]="spinning || balance < bet">Больше 7 (x2)</button>
            <button (click)="play('under')" [disabled]="spinning || balance < bet">Меньше 7 (x2)</button>
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
      .dice-game { text-align: center; }
      .dice { font-size: 40px; margin-bottom: 24px; line-height: 1.4; }
      .bet-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      .bet-row button {
        cursor: pointer; border: none; border-radius: 10px; padding: 14px 22px;
        background: linear-gradient(135deg, #00897b, #26c6da); color: #fff; font-weight: 700;
      }
      .bet-row button:disabled { opacity: 0.5; cursor: default; }
      .result { margin-top: 18px; font-size: 18px; }
    `,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DicePageComponent implements OnInit {
  balance = 0;
  bet = 100;
  spinning = false;
  dice1 = 1;
  dice2 = 1;
  sum = 2;
  message = '';

  private balanceService = inject(BalanceService);

  ngOnInit(): void {
    this.balanceService.value.subscribe((v) => (this.balance = v));
  }

  play(choice: 'over' | 'under'): void {
    if (this.spinning || this.balance < this.bet) return;
    this.spinning = true;
    this.message = '';
    this.balanceService.subtract(this.bet);
    setTimeout(() => {
      this.dice1 = 1 + Math.floor(Math.random() * 6);
      this.dice2 = 1 + Math.floor(Math.random() * 6);
      this.sum = this.dice1 + this.dice2;
      const win = choice === 'over' ? this.sum > 7 : this.sum < 7;
      if (win) this.balanceService.add(this.bet * 2);
      this.spinning = false;
      this.message = win ? `Сумма ${this.sum}. Победа! +${this.bet * 2} NMZ` : `Сумма ${this.sum}. Проигрыш.`;
    }, 700);
  }
}
