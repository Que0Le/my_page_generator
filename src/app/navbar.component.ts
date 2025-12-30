import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav">
      <a routerLink="/path1" routerLinkActive="active">Path 1</a>
      <a routerLink="/path2" routerLinkActive="active">Path 2</a>

      <!-- Spacer pushes dropdown to the end -->
      <span class="spacer"></span>

      <!-- Dropdown -->
      <div class="dropdown">
        <button (click)="toggle()">More ▾</button>

        <div class="menu" *ngIf="open">
          <a
            *ngFor="let item of dropdownLinks"
            [routerLink]="item.path"
            (click)="open = false"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav {
      display: flex;
      align-items: center;
      background: #222;
      padding: 0.5rem 1rem;
      color: white;
    }

    a {
      color: white;
      text-decoration: none;
      margin-right: 1rem;
    }

    .active {
      font-weight: bold;
      border-bottom: 2px solid white;
    }

    .spacer {
      flex: 1;
    }

    .dropdown {
      position: relative;
    }

    button {
      background: #444;
      color: white;
      border: none;
      padding: 0.4rem 0.7rem;
      cursor: pointer;
    }

    .menu {
      position: absolute;
      right: 0;
      top: 100%;
      background: #333;
      min-width: 150px;
    }

    .menu a {
      display: block;
      padding: 0.5rem;
    }

    .menu a:hover {
      background: #555;
    }
  `]
})
export class NavbarComponent {
  open = false;

  dropdownLinks = [
    { label: 'Path 3', path: '/path3' },
    { label: 'Path 5', path: '/path5' }
  ];

  toggle() {
    this.open = !this.open;
  }
}
