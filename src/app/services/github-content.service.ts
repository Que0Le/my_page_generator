import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

export interface DocFile {
  path: string; // docs/intro.md
  urlPath: string; // /docs/intro
  rawUrl: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class GithubContentService {
  owner: string = "";
  repo: string = "";
  branch: string = "";

  private cache: DocFile[] | null = null;
  private loadingPromise: Promise<DocFile[]> | null = null;
  private lastCacheUpdate: Date | undefined;
  private mockedContent = [
      {
        path: 'blog/post1.md',
        urlPath: '/blog/post1',
        content: '# Post 1 content\n',
        rawUrl: 'https://raw.githubusercontent.com/Que0Le/my_writing/main/blog/post1.md',
      },
      {
        path: 'docs/note1.md',
        urlPath: '/docs/note1',
        content: '# This is docs note1\n',
        rawUrl: 'https://raw.githubusercontent.com/Que0Le/my_writing/main/docs/note1.md',
      },
      {
        path: 'readme.md',
        urlPath: '/readme',
        content: '# Readme for my writing\n',
        rawUrl: 'https://raw.githubusercontent.com/Que0Le/my_writing/main/readme.md',
      },
    ]

  constructor(private config: ConfigService) {
    this.owner = this.config.github.owner;
    this.repo = this.config.github.repo;
    this.branch = this.config.github.branch;
  }

  async loadRawFile(isMocked: boolean = false, filepath: string): Promise<string> {
    let content = '';
    if (isMocked) {
      this.mockedContent.forEach(mc => {
        if (mc.path === filepath) content = mc.content;
      })
    } else {
      let rawUrl = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${filepath}`;
      content = await fetch(rawUrl).then((r) => r.text());
    }
    return content;
  }

  async loadRepo(isMocked: boolean = false): Promise<DocFile[]> {
    if (isMocked) return this.loadRepoMocked();

    // Return cached data if not exceed timeout
    if (
      this.cache && this.lastCacheUpdate &&
      new Date().getTime() - this.lastCacheUpdate.getTime() < this.config.cacheTimeout
    ) {
      return this.cache;
    }
    // Prevent duplicate concurrent fetches
    if (this.loadingPromise) {
      return this.loadingPromise;
    }
    this.cache = await this.loadRepoGh();
    this.lastCacheUpdate = new Date();

    return this.cache;
  }

  async loadRepoMocked() {
    console.log('Mocked');
    return this.mockedContent;
  }

  async loadRepoGh(shouldPreFetchContent: boolean = false) {
    const { owner, repo, branch } = this.config.github;

    // 1️⃣ Get repo tree
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
    );

    if (!treeRes.ok) {
      // TODO: raise error instead
      console.log("Request tree from Github failed!")
      let jsonContent = await treeRes.json();
      console.log(`HTTP ${treeRes.status}: ${jsonContent}`)
      return [];
    }

    const tree = await treeRes.json();

    // 2️⃣ Filter markdown files
    const mdFiles = tree.tree.filter((item: any) => item.path.endsWith('.md'));

    // 3️⃣ Download file contents
    const files: DocFile[] = [];

    for (const file of mdFiles) {
      let rawUrl = '';
      let content = '';
      rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;
      if (shouldPreFetchContent) {
        content = await fetch(rawUrl).then((r) => r.text());
      }

      files.push({
        path: file.path,
        urlPath: this.pathToUrl(file.path),
        content,
        rawUrl: rawUrl,
      });
    }
    console.log({ files: files });
    console.log(files);
    return files;
  }

  private pathToUrl(path: string): string {
    return '/' + path.replace(/\.md$/, ''); // optional
  }
}
