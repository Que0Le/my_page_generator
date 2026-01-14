import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubContentService, DocFile } from '../services/github-content.service';
import { MarkdownService } from '../services/markdown.service';
import { ConfigService } from '../config/config.service';
import { CountdownComponent } from '../components/countdown';
import { UnitConversionInchToCmComponent } from '../components/unit-conversions/unit-conversion';
import { UnitConversionTempCFComponent } from '../components/unit-conversions/temp';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CountdownComponent,
    UnitConversionInchToCmComponent,
    UnitConversionTempCFComponent,
  ],
  template: `
    <article class="general-article" [innerHTML]="html()">
      <h1>Home Page</h1>
    </article>
    <div class="grid">
      <div class="row-2">
        <app-countdown></app-countdown>
        <unit-conversion-inch-cm></unit-conversion-inch-cm>
      </div>

      <div class="row-3">
        <unit-conversion-temp-c-f></unit-conversion-temp-c-f>
        <app-countdown></app-countdown>
        <app-countdown></app-countdown>
      </div>
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-rows: auto auto;
        row-gap: 1rem;
      }

      .row-2 {
        border-style: solid;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .row-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
    `,
  ],
})
export class UtilsPageComponent {
  html = signal<SafeHtml | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private github: GithubContentService,
    private md: MarkdownService,
    private sanitizer: DomSanitizer,
    private config: ConfigService
  ) {}

  async ngOnInit() {
    this.html.set('Test');
  }
}
