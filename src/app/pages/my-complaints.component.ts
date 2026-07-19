import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Complaint {
  id: number;
  text: string;
  date: string;
}

const STORAGE_KEY = 'nemazing.complaints';

@Component({
  selector: 'app-page-my-complaints',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './my-complaints.component.html',
  schemas: [NO_ERRORS_SCHEMA]
})
export class MyComplaintsPageComponent implements OnInit {
  text = '';
  done = false;
  lastId = 0;
  list: Complaint[] = [];

  ngOnInit(): void {
    this.list = this.load();
  }

  submit(): void {
    const t = this.text.trim();
    if (!t) return;
    const id = this.list.length ? Math.max(...this.list.map(c => c.id)) + 1 : 1;
    const complaint: Complaint = {
      id,
      text: t,
      date: new Date().toLocaleString('ru-RU')
    };
    this.list = [complaint, ...this.list];
    this.save(this.list);
    this.lastId = id;
    this.done = true;
    this.text = '';
    setTimeout(() => (this.done = false), 3000);
  }

  private load(): Complaint[] {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private save(list: Complaint[]): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}
