import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-my-gold',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-gold.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyGoldPageComponent {}