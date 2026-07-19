import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-my',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyPageComponent {}