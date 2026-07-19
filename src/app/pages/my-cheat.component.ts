import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-my-cheat',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-cheat.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyCheatPageComponent {}