import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-store',
  standalone: true,
  imports: [RouterLink],
  template: `
<nav class="mp-nav">
  <div class="mp-nav__inner">
    <a routerLink="/" class="mp-nav__logo-link">
      <img class="mp-nav__logo" src="/assets/images/mn/logo-nav.svg" alt="Nemazing Online">
    </a>
    <div class="mp-nav__links">
      <a class="mp-nav__link" routerLink="/">Главная</a>
      <a class="mp-nav__link" routerLink="/news">Блог</a>
      <a class="mp-nav__link" routerLink="/store">Магазин</a>
      <a class="mp-nav__link" routerLink="/rules">Правила</a>
      <a class="mp-nav__link" routerLink="/my">UCP</a>
    </div>
    <div class="mp-nav__actions">
      <a class="mp-nav__cta" routerLink="/start">
        <img src="/assets/images/mn/to-login.svg" alt="">
        Войти
      </a>
    </div>
  </div>
</nav>

<section class="mp-store-hero">
  <div class="mp-store-hero__bg">
    <img src="/assets/images/mn/backdrop.png" alt="">
  </div>
  <div class="mp-store-hero__inner">
    <h1 class="mp-store-hero__title">Магазин</h1>
    <p class="mp-store-hero__subtitle">Motion Coins, подписка Motion+ и стартовые наборы</p>
  </div>
  <img class="mp-store-hero__backdrop-mob" src="/assets/images/mn/store-mobile-backdrop.png" alt="">
</section>

<section class="mp-store-section">
  <div class="mp-store__inner">
    <p class="mp-store__empty">Магазин временно недоступен. Скоро здесь появятся товары.</p>
  </div>
</section>
  `,
  styles: [`
    :host { display: block; }
    .mp-store-hero {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      padding: 120px 20px 60px;
    }
    .mp-store-hero__bg {
      position: absolute;
      left: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }
    .mp-store-hero__bg img { width: 100%; max-width: 559px; height: auto; }
    .mp-store-hero__inner {
      position: relative;
      z-index: 10;
      text-align: center;
    }
    .mp-store-hero__title {
      font-family: 'Russo One', 'Capture-it', 'Rubik', sans-serif;
      font-size: 74px;
      line-height: 76px;
      text-transform: uppercase;
      color: #fff;
    }
    .mp-store-hero__subtitle {
      font-size: 18px;
      color: #d9d9d9;
      margin-top: 16px;
    }
    .mp-store-hero__backdrop-mob { display: none; }
    .mp-store-section { padding: 60px 20px; }
    .mp-store__inner {
      max-width: 1068px;
      margin: 0 auto;
    }
    .mp-store__empty {
      text-align: center;
      font-size: 18px;
      color: #858585;
      padding: 60px 0;
    }
    @media (max-width: 767px) {
      .mp-store-hero__title { font-size: 40px; line-height: 42px; }
      .mp-store-hero__bg { display: none; }
      .mp-store-hero__backdrop-mob {
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 0;
        pointer-events: none;
        opacity: 0.3;
      }
    }
  `]
})
export class StorePageComponent {}
