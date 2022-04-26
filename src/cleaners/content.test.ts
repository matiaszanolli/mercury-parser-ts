import assert from 'assert';
import cheerio from 'cheerio';

import extractBestNode from '../extractors/generic/content/extract-best-node';
import extractCleanNode from './content';

import fs from 'fs';

describe('extractCleanNode(article, { $, cleanConditionally, title } })', () => {
  it('cleans cruft out of a DOM node', () => {
    const html: string = fs.readFileSync('./fixtures/wired.html', 'utf-8');
    const $: cheerio.Root = cheerio.load(html);

    const opts: { [key: string]: boolean } = {
      stripUnlikelyCandidates: true,
      weightNodes: true,
      cleanConditionally: true,
    };

    const bestNode: cheerio.Cheerio = extractBestNode($, opts);

    const cleanNode = extractCleanNode(bestNode, { $, opts });

    const text: string = $(cleanNode)
      .text()
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    assert.equal(text.length === 2656 || text.length === 2657, true);
  });
});
