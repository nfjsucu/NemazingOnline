import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomePageComponent {}