import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-page-my-gold',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './my-gold.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyGoldPageComponent implements OnInit {
  balance = 0;
  topUps = [100, 500, 1000, 5000];
  message = '';

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balanceService.value.subscribe(v => (this.balance = v));
  }

  topUp(amount: number): void {
    this.balanceService.add(amount);
    this.message = `Начислено ${amount} NMZ`;
  }
}
