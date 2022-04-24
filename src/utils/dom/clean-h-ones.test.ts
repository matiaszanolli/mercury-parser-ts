import cheerio from 'cheerio';

import { assertClean } from '../../test-helpers';

import HTML from './fixtures/html';
import { cleanHOnes } from './index';

describe('cleanHOnes($)', () => {
  it('removes H1s if there are less than 3 of them', () => {
    const $: cheerio.Root = cheerio.load(HTML.removeTwoHOnes.before);

    const result: cheerio.Root = cleanHOnes($('*').first(), $);
    assertClean(result.html(), HTML.removeTwoHOnes.after);
  });

  it('converts H1s to H2s if there are 3 or more of them', () => {
    const $: cheerio.Root = cheerio.load(HTML.convertThreeHOnes.before);

    const result: cheerio.Root = cleanHOnes($('*').first(), $);
    assertClean(result.html(), HTML.convertThreeHOnes.after);
  });
});
