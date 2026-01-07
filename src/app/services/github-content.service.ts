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

  constructor(private config: ConfigService) {}

//   owner = 'Que0Le';
//   repo = 'my_writing';
//   branch = 'main';

  async loadRepo(isMocked: boolean = false): Promise<DocFile[]> {
    if (isMocked) return this.loadRepoMocked();
    else return this.loadRepoGh();
  }
  async loadRepoMocked() {
    console.log('Mocked');
    return [
      {
        path: 'blog/post1.md',
        urlPath: '/blog/post1',
        content: '# Post 1\n',
        rawUrl: 'https://raw.githubusercontent.com/Que0Le/my_writing/main/blog/post1.md',
      },
      {
        path: 'docs/note1.md',
        urlPath: '/note1',
        content: '# This is docs note1\n',
        rawUrl: 'https://raw.githubusercontent.com/Que0Le/my_writing/main/docs/note1.md',
      },
      {
        path: 'readme.md',
        urlPath: '/readme',
        content: '# Readme for my writing\n',
        rawUrl: 'https://raw.githubusercontent.com/Que0Le/my_writing/main/readme.md',
      },
    ];
  }

  async loadRepoGh() {
    const { owner, repo, branch } = this.config.github;

    // 1️⃣ Get repo tree
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
    );

    const tree = await treeRes.json();

    // 2️⃣ Filter markdown files
    const mdFiles = tree.tree.filter((item: any) => item.path.endsWith('.md'));

    // 3️⃣ Download file contents
    const files: DocFile[] = [];

    for (const file of mdFiles) {
      let rawUrl = '';
      let content = '';
      rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;
      content = await fetch(rawUrl).then(r => r.text());
    //   content = '123';

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
    return '/' + path.replace(/\.md$/, '').replace(/^docs\//, ''); // optional
  }
}
