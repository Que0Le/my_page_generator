import { Component, computed, signal, inject } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Crumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterModule],
  template: `
    @if (crumbs().length) {
    <nav class="breadcrumbs">
      <a routerLink="/">Home</a>

      @for (c of crumbs(); track c.url; let last = $last) {
      <span>/</span>

      @if (!last) {
      <a [routerLink]="c.url">{{ c.label }}</a>
      } @else {
      <span class="current">{{ c.label }}</span>
      } }
    </nav>
    }
  `,
  styles: [
    `
      .breadcrumbs {
        max-width: 90%;
        margin: 0.75rem auto 1rem;
        font-size: 0.9rem;
        color: #555;
      }

      .breadcrumbs a {
        color: #3498db;
        text-decoration: none;
      }

      .breadcrumbs a:hover {
        text-decoration: underline;
      }

      .breadcrumbs span {
        margin: 0 0.25rem;
      }

      .current {
        font-weight: 600;
        color: #333;
      }
    `,
  ],
})
export class BreadcrumbsComponent {
  private router = inject(Router);
  private path = signal<string[]>([]);

  crumbs = computed<Crumb[]>(() => {
    const segments = this.path();
    let url = '';
    return segments.map((seg) => {
      url += `/${seg}`;
      return {
        label: this.pretty(seg),
        url,
      };
    });
  });

  constructor() {
    this.router.events.subscribe(() => {
      this.path.set(this.router.url.split('/').filter(Boolean));
    });
  }

  private pretty(seg: string): string {
    return decodeURIComponent(seg)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
