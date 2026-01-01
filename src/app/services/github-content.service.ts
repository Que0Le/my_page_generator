import { Injectable } from '@angular/core';

export interface DocFile {
  path: string;     // docs/intro.md
  urlPath: string;  // /docs/intro
  content: string;
}

@Injectable({ providedIn: 'root' })
export class GithubContentService {

  owner = 'Que0Le';
  repo = 'my_writing';
  branch = 'main';

  async loadRepo(): Promise<DocFile[]> {
    // 1️⃣ Get repo tree
    const treeRes = await fetch(
      `https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${this.branch}?recursive=1`
    );

    const tree = await treeRes.json();

    // 2️⃣ Filter markdown files
    const mdFiles = tree.tree.filter(
      (item: any) => item.path.endsWith('.md')
    );

    // 3️⃣ Download file contents
    const files: DocFile[] = [];

    for (const file of mdFiles) {
      const rawUrl = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${file.path}`;
      const content = await fetch(rawUrl).then(r => r.text());

      files.push({
        path: file.path,
        urlPath: this.pathToUrl(file.path),
        content
      });
    }

    return files;
  }

  private pathToUrl(path: string): string {
    return '/' + path
      .replace(/\.md$/, '')
      .replace(/^docs\//, ''); // optional
  }
}
