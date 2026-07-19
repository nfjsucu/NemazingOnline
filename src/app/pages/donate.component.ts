import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-donate',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './donate.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class DonatePageComponent {}