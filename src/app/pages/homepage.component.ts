import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocFile, GithubContentService } from '../services/github-content.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../config/config.service';
import { MarkdownService } from '../services/markdown.service';

interface PostLink {
  label: string;
  urlPath: string;
}

interface Category {
  title: string;
  posts: PostLink[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h1>Home</h1>

    <section *ngIf="!loading()">
      <section *ngFor="let cat of categories()">
        <h2>{{ cat.title }}</h2>
        <ul>
          <li *ngFor="let post of cat.posts">
            <a [routerLink]="post.urlPath">{{ post.label }}</a>
          </li>
        </ul>
      </section>
    </section>

    <p *ngIf="loading()">Loading content…</p>
  `,
  styles: [
    `
      h1 {
        margin-bottom: 1.5rem;
      }

      .category {
        max-width: 700px;
        margin: 1.5rem auto;
      }

      .post-list {
        list-style: none;
        padding-left: 1.5rem; /* 👈 indentation */
      }

      .post-list li {
        margin: 0.4rem 0;
      }

      .post-list a {
        color: #0969da;
        text-decoration: none;
        font-size: 1.05rem;
      }

      .post-list a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class HomePageComponent implements OnInit {
  files = signal<DocFile[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private github: GithubContentService,
    private md: MarkdownService,
    private sanitizer: DomSanitizer,
    private config: ConfigService
  ) {}

  async ngOnInit() {
    const files = await this.github.loadRepo(this.config.isMocked);

    this.files.set(files);

    const objCategories: Record<string, Category> = {};

    for (const file of files) {
      const match = file.urlPath.match(/^\/(\w+)\/(.+)/);

      if (match) {
        const [, group, rest] = match;
        objCategories[group] ??= { title: group, posts: [] };
        objCategories[group].posts.push({
          label: rest,
          urlPath: file.urlPath,
        });
      } else {
        objCategories['Main'] ??= { title: 'Main', posts: [] };
        objCategories['Main'].posts.push({
          label: file.urlPath,
          urlPath: file.urlPath,
        });
      }
    }
    // Set values and signal UI
    this.categories.set(Object.values(objCategories));
    this.loading.set(false);
  }
}
