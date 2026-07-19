import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-news',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './news.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class NewsPageComponent {}