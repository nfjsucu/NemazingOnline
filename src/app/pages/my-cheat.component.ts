import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-page-my-cheat',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './my-cheat.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyCheatPageComponent implements OnInit {
  code = '';
  balance = 0;
  msg = '';

  private codes: Record<string, number> = {
    NEMAZING100: 100,
    NEMAZING500: 500,
    NEMAZING1000: 1000
  };

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balanceService.value.subscribe(v => (this.balance = v));
  }

  apply(): void {
    const key = this.code.trim().toUpperCase();
    if (this.codes[key]) {
      this.balanceService.add(this.codes[key]);
      this.msg = `Начислено ${this.codes[key]} NMZ!`;
    } else if (key) {
      this.msg = 'Неверный код';
    } else {
      this.msg = '';
    }
    this.code = '';
    setTimeout(() => (this.msg = ''), 3000);
  }
}
