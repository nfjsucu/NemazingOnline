import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-my-inventory',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-inventory.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyInventoryPageComponent {}