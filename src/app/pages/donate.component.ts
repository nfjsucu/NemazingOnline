import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { BalanceService } from '../services/balance.service';
import { AuthService } from '../services/auth.service';
import { AuthUiService } from '../services/auth-ui.service';

@Component({
  selector: 'app-page-donate',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class DonatePageComponent implements OnInit {
  balance = 0;
  showBuy = false;
  amount = 100;
  bought = false;
  needLogin = false;

  private balanceService = inject(BalanceService);
  private auth = inject(AuthService);
  private ui = inject(AuthUiService);

  packages = [100, 500, 1000, 2500];

  ngOnInit(): void {
    this.balanceService.value.subscribe((v) => (this.balance = v));
  }

  openBuy(amount: number): void {
    if (!this.auth.isLoggedIn) {
      this.needLogin = true;
      this.ui.open();
      return;
    }
    this.amount = amount;
    this.showBuy = true;
    this.bought = false;
  }

  confirmBuy(): void {
    if (!this.amount || this.amount <= 0) return;
    // Demo: no real payment. Immediately credit the chosen NMZ amount.
    this.balanceService.add(this.amount);
    this.showBuy = false;
    this.bought = true;
    setTimeout(() => (this.bought = false), 3000);
  }

  close(): void {
    this.showBuy = false;
    this.needLogin = false;
  }
}
