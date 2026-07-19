import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-top',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class TopPageComponent {}