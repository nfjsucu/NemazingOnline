import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouletteGameComponent } from './roulette-game.component';

@Component({
  selector: 'app-page-mini-brilliant',
  standalone: true,
  imports: [RouterLink, RouletteGameComponent],
  templateUrl: './mini-brilliant.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MiniBrilliantPageComponent {}