import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from './services/markdown.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  markdownText = `
# My Homepage

## Table of Contents

## Introduction
This is **Markdown** rendered with _remark_.
`;

  renderedHtml = signal<SafeHtml | null>(null);


  constructor(
    private markdownService: MarkdownService,
    private sanitizer: DomSanitizer
  ) {}

//   async ngOnInit() {
//     const html = await this.markdownService.toHtml(this.markdownText);
//     this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
// }


  async ngOnInit() {
    const html = await this.markdownService.toHtml(this.markdownText);
    console.log('RENDERED HTML:', html); // 👈 add this
    this.renderedHtml.set(
      this.sanitizer.bypassSecurityTrustHtml(html)
    );
  }
}
