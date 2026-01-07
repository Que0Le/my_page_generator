/**
 * Run with:
 *   node scripts/test-github-content-service.js
 *
 * Requires Node 18+ (fetch is global)
 */

import { GithubContentService } from '../services/github-content.service.js';

async function run() {
  const service = new GithubContentService();

  console.log('⏳ Running loadRepo()...\n');

  const result = await service.loadRepo();

  console.log('✅ Output:\n');
  console.log(JSON.stringify(result, null, 2));

  console.log('\n📊 Summary');
  console.log('Files loaded:', result.length);

  if (result.length > 0) {
    const first = result[0];
    console.log('First file preview:');
    console.log({
      path: first.path,
      urlPath: first.urlPath,
      contentPreview: first.content.slice(0, 120) + '...'
    });
  }
}

run().catch(err => {
  console.error('❌ Error running test:', err);
  process.exit(1);
});
