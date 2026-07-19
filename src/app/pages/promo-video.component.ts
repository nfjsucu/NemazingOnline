import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-promo-video',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './promo-video.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class PromoVideoPageComponent {}