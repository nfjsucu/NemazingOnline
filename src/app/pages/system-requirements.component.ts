import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-system-requirements',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './system-requirements.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class SystemRequirementsPageComponent {}