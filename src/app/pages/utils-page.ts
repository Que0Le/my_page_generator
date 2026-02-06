import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubContentService, DocFile } from '../services/github-content.service';
import { MarkdownService } from '../services/markdown.service';
import { ConfigService } from '../config/config.service';
import { LengthConversionComponent } from '../components/unit-conversions/length-conversion';
import { TempConversionComponent } from '../components/unit-conversions/temp-conversion';
import { MassConversionComponent } from '../components/unit-conversions/mass-conversion';
import { UnitConversionCurrencyComponent } from '../components/unit-conversions/currency';
import { VolumeConversionComponent } from '../components/unit-conversions/volume-conversion';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LengthConversionComponent,
    TempConversionComponent,
    MassConversionComponent,
    VolumeConversionComponent,
    UnitConversionCurrencyComponent,
  ],
  template: `
    <article class="general-article" [innerHTML]="html()">
      <h1>Home Page</h1>
    </article>
    <div class="grid">
      <div class="row-2">
        <temp-conversion></temp-conversion>
        <length-conversion></length-conversion>
        <mass-conversion></mass-conversion>
        <volume-conversion></volume-conversion>
      </div>
      <unit-conversion-currency></unit-conversion-currency>
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

  async ngOnInit() {}
}
