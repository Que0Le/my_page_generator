import { Component } from '@angular/core';
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

    <section *ngFor="let category of categories" class="category">
      <h2>{{ category.title }}</h2>

      <ul class="post-list">
        <li *ngFor="let post of category.posts">
          <a [routerLink]="post.urlPath">
            {{ post.label }}
          </a>
        </li>
      </ul>
    </section>
  `,
  styles: [`
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
  `]
})
export class HomePageComponent {
  files: DocFile[] = [];
  categories: Category[] = [];

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
    this.files = await this.github.loadRepo(this.config.isMocked);
    let temp: Record<string, Category> = {};
    this.files.forEach((file) => {
      console.log(file)
      const match = file.urlPath.match(/^\/(\w+)\/(.+)/);
      if (match) {
        const [, group, rest] = match;
        if (!temp[group]) {
          temp[group] = {'title': group, posts: []};
        }
        temp[group].posts.push({ label: rest, urlPath: file.urlPath });
      } else {
        // add direct link: first level
        if (!temp['Main']) temp['Main'] = {'title': "Main", posts: []};;
        temp['Main'].posts.push({ label: file.urlPath, urlPath: file.urlPath });
      }
    });
    console.log({temp: temp})
    for (const [key, value] of Object.entries(temp)) {
      this.categories.push(value)
    }
  }

}
