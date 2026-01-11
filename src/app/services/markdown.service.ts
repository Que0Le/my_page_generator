import { Injectable } from '@angular/core';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

// import 'highlight.js/styles/github.css';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  async toHtml(markdown: string): Promise<string> {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      // .use(remarkToc, { heading: 'toc|table of contents' })
      .use(rehypeHighlight, { detect: true })
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
  }
}
