import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InventoryService, InventoryItem } from '../services/inventory.service';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-page-my-inventory',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './my-inventory.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyInventoryPageComponent implements OnInit {
  items: InventoryItem[] = [];
  balance = 0;
  soldName = '';

  constructor(private inventory: InventoryService, private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.inventory.items.subscribe(v => (this.items = v));
    this.balanceService.value.subscribe(v => (this.balance = v));
  }

  sell(item: InventoryItem): void {
    this.inventory.sell(item);
    this.soldName = item.name;
    setTimeout(() => (this.soldName = ''), 2500);
  }
}
