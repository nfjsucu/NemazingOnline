import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouletteGameComponent } from './roulette-game.component';

@Component({
  selector: 'app-page-mini-free',
  standalone: true,
  imports: [RouterLink, RouletteGameComponent],
  templateUrl: './mini-free.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MiniFreePageComponent {}