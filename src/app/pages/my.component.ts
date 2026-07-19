import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../services/balance.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-page-my',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './my.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyPageComponent implements OnInit {
  balance = 0;
  nickname = 'Игрок';

  constructor(private balanceService: BalanceService, private settings: SettingsService) {}

  ngOnInit(): void {
    this.balanceService.value.subscribe(v => (this.balance = v));
    this.nickname = this.settings.load().nickname;
  }
}
