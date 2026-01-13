import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GithubContentService, DocFile } from './services/github-content.service';
import { ConfigService } from './config/config.service';

interface NavLink {
  label: string;
  path: string;
  external?: boolean; // if set, the link will be treated as external as href
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav">
      <!-- Main links -->
      <ng-container *ngFor="let link of mainLinks()">
        <!-- Internal link -->
        <a *ngIf="!link.external" [routerLink]="link.path">
          {{ link.label }}
        </a>

        <!-- External link -->
        <a *ngIf="link.external" [href]="link.path" target="_blank" rel="noopener">
          {{ link.label }}
        </a>
      </ng-container>

      <span class="spacer"></span>

      <!-- Dropdown -->
      <div class="dropdown">
        <button (click)="toggle()">More ▾</button>

        <div class="menu" *ngIf="open()">
          <a *ngFor="let link of dropdownLinks()" [routerLink]="link.path" (click)="close()">
            {{ link.label }}
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .nav {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        background: #1f2937;
        color: white;
      }

      a {
        color: white;
        text-decoration: none;
        margin-right: 1rem;
      }

      .active {
        border-bottom: 2px solid white;
      }

      .spacer {
        flex: 1;
      }

      .dropdown {
        position: relative;
      }

      button {
        background: #374151;
        color: white;
        border: none;
        padding: 0.4rem 0.7rem;
        cursor: pointer;
      }

      .menu {
        position: absolute;
        right: 0;
        top: 100%;
        background: #111827;
        min-width: 160px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      }

      .menu a {
        display: block;
        padding: 0.5rem 0.75rem;
      }

      .menu a:hover {
        background: #374151;
      }
    `,
  ],
})
export class NavbarComponent {
  open = signal(false);
  mainLinks = signal<NavLink[]>([]);
  dropdownLinks = signal<NavLink[]>([]);

  constructor(private github: GithubContentService, private config: ConfigService) {
    this.loadLinks();
  }

  async loadLinks() {
    const files = await this.github.loadRepo(this.config.isMocked);

    const links = files.map((f) => ({
      path: f.urlPath,
      label: this.labelFromPath(f.path),
      external: false,
    }));

    // first 2 = main nav, rest = dropdown
    let linksForMain = links.slice(0, 2);
    console.log({ linksForMain: linksForMain });
    linksForMain.push({ path: 'https://google.com', label: 'google.com', external: true });
    linksForMain.push({ path: '', label: 'Home', external: false });
    linksForMain.push({ path: 'test', label: 'Test', external: false });
    this.mainLinks.set(linksForMain);
    this.dropdownLinks.set(links.slice(2));
  }

  toggle() {
    this.open.set(!this.open());
  }

  close() {
    this.open.set(false);
  }

  private labelFromPath(path: string): string {
    return path
      .replace(/\.md$/, '')
      .split('/')
      .pop()!
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
