import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-my-audio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-audio.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyAudioPageComponent {}