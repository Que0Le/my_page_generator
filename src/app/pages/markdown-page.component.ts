import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubContentService, DocFile } from '../services/github-content.service';
import { MarkdownService } from '../services/markdown.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="markdown-body" [innerHTML]="html()"></article>
  `
})
export class MarkdownPageComponent {

  html = signal<SafeHtml | null>(null);
  files: DocFile[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private github: GithubContentService,
    private md: MarkdownService,
    private sanitizer: DomSanitizer
  ) {
    this.init();
  }

  async init() {
    this.files = await this.github.loadRepo();

    this.route.url.subscribe(() => {
      this.renderCurrentPage();
    });
  }

  async renderCurrentPage() {
    const path = '/' + this.router.url.replace(/^\//, '');
    const file = this.files.find(f => f.urlPath === path);

    if (!file) {
      this.html.set(this.sanitizer.bypassSecurityTrustHtml('<h1>404</h1>'));
      return;
    }

    const html = await this.md.toHtml(file.content);
    this.html.set(this.sanitizer.bypassSecurityTrustHtml(html));
  }
}
