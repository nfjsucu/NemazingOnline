import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService, AppSettings } from '../services/settings.service';

@Component({
  selector: 'app-page-my-audio',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './my-audio.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyAudioPageComponent implements OnInit {
  settings!: AppSettings;
  saved = false;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settings = this.settingsService.load();
  }

  save(): void {
    this.settingsService.save(this.settings);
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }
}
