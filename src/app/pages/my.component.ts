import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { BalanceService } from '../services/balance.service';
import { AuthService } from '../services/auth.service';
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
  nickname = 'Nick_Name';

  private balanceService = inject(BalanceService);
  private auth = inject(AuthService);
  private settings = inject(SettingsService);

  ngOnInit(): void {
    this.balanceService.value.subscribe((v) => (this.balance = v));
    const u = this.auth.user;
    u.subscribe((usr) => {
      if (usr) this.nickname = usr.nickname;
      else this.nickname = this.settings.load().nickname;
    });
  }
}
