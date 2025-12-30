import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from './markdown.service';

@Component({
  selector: 'app-markdown-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="markdown-body" [innerHTML]="html()"></article>
  `
})
export class MarkdownPageComponent {

  html = signal<SafeHtml | null>(null);

  markdown = `
# Path 1 – Markdown Page

## Introduction
This page is rendered from **Markdown**.

## Features
- Angular Router
- remark
- GitHub-flavored Markdown

## Code
\`\`\`ts
console.log('Hello from /path1');
\`\`\`
`;

  constructor(
    private md: MarkdownService,
    private sanitizer: DomSanitizer
  ) {
    this.render();
  }

  async render() {
    const result = await this.md.toHtml(this.markdown);
    this.html.set(this.sanitizer.bypassSecurityTrustHtml(result));
  }
}
