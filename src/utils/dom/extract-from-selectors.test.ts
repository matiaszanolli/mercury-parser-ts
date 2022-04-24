import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/extract-from-selectors';
import extractFromSelectors from './extract-from-selectors';

describe('extractFromSelectors($, selectors, maxChildren, textOnly)', () => {
  it('extracts an arbitrary node by selector', () => {
    const $: cheerio.Root = cheerio.load(HTML.simpleSelector.test);
    const result: string | null = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.simpleSelector.result);
  });

  it('ignores comments', () => {
    const $: cheerio.Root = cheerio.load(HTML.insideComment.test);
    const result: string | null = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.insideComment.result);
  });

  it('skips a selector if it matches multiple nodes', () => {
    const $: cheerio.Root = cheerio.load(HTML.multiMatch.test);
    const result: string | null = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.multiMatch.result);
  });

  it('skips a node with too many children', () => {
    const $: cheerio.Root = cheerio.load(HTML.manyChildren.test);
    const result: string | null = extractFromSelectors($, ['.author']);

    assert.equal(result, HTML.manyChildren.result);
  });
});
