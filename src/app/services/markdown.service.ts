import { Injectable } from '@angular/core';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
// import remarkSlug from 'remark-slug';
import rehypeSlug from 'rehype-slug';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  async toHtml(markdown: string): Promise<string> {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(remarkToc, { heading: 'toc|table of contents' })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
  }
}
