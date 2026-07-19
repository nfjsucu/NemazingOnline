import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-start',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class StartPageComponent {}