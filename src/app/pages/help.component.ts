import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-help',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './help.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class HelpPageComponent {}