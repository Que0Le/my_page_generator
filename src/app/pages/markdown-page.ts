import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubContentService, DocFile } from '../services/github-content.service';
import { MarkdownService } from '../services/markdown.service';
import { ConfigService } from '../config/config.service';

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
    private sanitizer: DomSanitizer,
    private config: ConfigService
  ) {
    this.init();
  }

  async init() {
    // TODO: add other md sources. Files should include combined md objects
    this.files = await this.github.loadRepo(this.config.isMocked);

    this.route.url.subscribe(() => {
      this.renderCurrentPage();
    });
  }

  async renderCurrentPage() {
    console.log("md page component: url = ", this.router.url)
    const path = '/' + this.router.url.replace(/^\//, '');
    const file = this.files.find(f => f.urlPath === path);

    if (!file) {
      console.log(`File not found for path '${path}'. Display 404.`);
      this.html.set(this.sanitizer.bypassSecurityTrustHtml('<h1>404</h1>'));
      return;
    }
    let fileContent = await this.github.loadRawFile(this.config.isMocked, file.path);
    const html = await this.md.toHtml(fileContent);
    this.html.set(this.sanitizer.bypassSecurityTrustHtml(html));
  }
}
