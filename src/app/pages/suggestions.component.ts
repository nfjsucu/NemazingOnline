import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-suggestions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './suggestions.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class SuggestionsPageComponent {}