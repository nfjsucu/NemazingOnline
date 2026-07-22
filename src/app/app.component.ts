import { Component, inject, NgZone, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModalComponent } from './components/auth-modal.component';
import { AuthUiService } from './services/auth-ui.service';
import { SeoService } from './services/seo.service';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'nemazing-clone';
  private ui = inject(AuthUiService);
  private zone = inject(NgZone);
  private seo = inject(SeoService);

  ngAfterViewInit(): void {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, delay: 100 });

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.sign-in') || target.closest('.navigation-authorization-login-button')) {
        e.preventDefault();
        this.zone.run(() => this.ui.open());
      }
    });
  }
}
