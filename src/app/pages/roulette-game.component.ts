import { Component, NO_ERRORS_SCHEMA, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BalanceService } from '../services/balance.service';

interface Sector {
  label: string;
  color: string;
  multiplier: number;
}

@Component({
  selector: 'app-roulette-game',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './roulette-game.component.html',
  styleUrl: './roulette-game.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class RouletteGameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  title = 'Рулетка';
  accent = '#451bde';
  balance = 1000;
  bet = 100;
  spinning = false;
  result = '';
  lastWin = 0;

  private ctx!: CanvasRenderingContext2D;
  private rotation = 0;
  private sectors: Sector[] = [];
  private animFrame = 0;
  private sub?: Subscription;

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.sub = this.balanceService.value.subscribe(v => {
      this.balance = v;
      if (this.ctx) this.draw();
    });
  }

  ngAfterViewInit(): void {
    this.sectors = [
      { label: '×2', color: '#e53935', multiplier: 2 },
      { label: '×1', color: '#43a047', multiplier: 1 },
      { label: '×3', color: '#1e88e5', multiplier: 3 },
      { label: '×1', color: '#fb8c00', multiplier: 1 },
      { label: '×5', color: '#8e24aa', multiplier: 5 },
      { label: '×1', color: '#00acc1', multiplier: 1 },
      { label: '×2', color: '#e53935', multiplier: 2 },
      { label: '×1', color: '#43a047', multiplier: 1 },
      { label: '×4', color: '#fdd835', multiplier: 4 },
      { label: '×1', color: '#5e35b1', multiplier: 1 },
      { label: '×2', color: '#e53935', multiplier: 2 },
      { label: '×1', color: '#00897b', multiplier: 1 }
    ];
    const cv = this.canvasRef.nativeElement;
    cv.width = 360;
    cv.height = 360;
    this.ctx = cv.getContext('2d')!;
    this.draw();
  }

  setBet(v: number): void {
    this.bet = v;
  }

  spin(): void {
    if (this.spinning || !this.balanceService.canAfford(this.bet)) return;
    this.balanceService.add(-this.bet);
    this.spinning = true;
    this.result = '';
    this.lastWin = 0;
    const turns = 5 + Math.random() * 3;
    const targetSector = Math.floor(Math.random() * this.sectors.length);
    const sectorAngle = (2 * Math.PI) / this.sectors.length;
    const targetAngle = turns * 2 * Math.PI + targetSector * sectorAngle + sectorAngle / 2;
    const start = this.rotation;
    const duration = 3200;
    const t0 = performance.now();

    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      this.rotation = start + (targetAngle - start) * ease;
      this.draw();
      if (p < 1) {
        this.animFrame = requestAnimationFrame(step);
      } else {
        this.spinning = false;
        const sector = this.sectors[targetSector];
        this.lastWin = this.bet * sector.multiplier;
        this.balanceService.add(this.lastWin);
        this.result = `Выпало «${sector.label}» — ${sector.multiplier > 1 ? 'выигрыш ' + this.lastWin + ' NMZ' : 'ставка возвращена'}`;
        this.draw();
      }
    };
    this.animFrame = requestAnimationFrame(step);
  }

  private draw(): void {
    const ctx = this.ctx;
    const cx = 180;
    const cy = 180;
    const r = 170;
    const n = this.sectors.length;
    const seg = (2 * Math.PI) / n;
    ctx.clearRect(0, 0, 360, 360);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.rotation);
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, i * seg, (i + 1) * seg);
      ctx.closePath();
      ctx.fillStyle = this.sectors[i].color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.stroke();
      ctx.save();
      ctx.rotate(i * seg + seg / 2);
      ctx.translate(r - 28, 0);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Montserrat, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.sectors[i].label, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 46, 0, 2 * Math.PI);
    ctx.fillStyle = this.accent;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Montserrat, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NEMAZING', cx, cy - 4);
    ctx.font = 'bold 22px Montserrat, Arial, sans-serif';
    ctx.fillText(this.balance.toString(), cx, cy + 18);

    // pointer
    ctx.beginPath();
    ctx.moveTo(cx, cy - r - 6);
    ctx.lineTo(cx - 14, cy - r + 18);
    ctx.lineTo(cx + 14, cy - r + 18);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  resetBalance(): void {
    if (this.spinning) return;
    this.balanceService.reset();
    this.result = 'Баланс сброшен';
    this.lastWin = 0;
  }

  ngOnDestroy(): void {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.sub?.unsubscribe();
  }
}
