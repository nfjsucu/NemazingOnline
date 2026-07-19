import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-rules',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './rules.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class RulesPageComponent {}