import cheerio from 'cheerio';

import { assertClean } from '../../test-helpers';

import HTML from './fixtures/html';
import { cleanHeaders } from './index';

describe('cleanHeaders(article, $)', () => {
  it('parses html and returns the article', () => {
    const $: cheerio.Root = cheerio.load(HTML.cleanFirstHeds.before);

    const result: cheerio.Root = cleanHeaders($('*').first(), $);
    assertClean(result.html(), HTML.cleanFirstHeds.after);
  });

  it('removes headers when the header text matches the title', () => {
    const $: cheerio.Root = cheerio.load(HTML.cleanTitleMatch.before);

    const result: cheerio.Root = cleanHeaders($('*').first(), $, 'Title Match');
    assertClean(result.html(), HTML.cleanTitleMatch.after);
  });

  it('removes headers with a negative weight', () => {
    const $: cheerio.Root = cheerio.load(HTML.dropWithNegativeWeight.before);

    const result: cheerio.Root = cleanHeaders($('*').first(), $);
    assertClean(result.html(), HTML.dropWithNegativeWeight.after);
  });
});
