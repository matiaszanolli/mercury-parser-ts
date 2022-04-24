import cheerio from 'cheerio';

import { assertClean } from '../../test-helpers';

import HTML from './fixtures/html';
import { cleanAttributes } from './index';

describe('cleanAttributes($)', () => {
  it('removes style attributes from nodes', () => {
    const $: cheerio.Root = cheerio.load(HTML.removeStyle.before);

    const result: cheerio.Cheerio = cleanAttributes($('*').first(), $);
    assertClean($.html(result), HTML.removeStyle.after);
  });

  it('removes align attributes from nodes', () => {
    const $: cheerio.Root = cheerio.load(HTML.removeAlign.before);

    const result: cheerio.Cheerio = cleanAttributes($('*').first(), $);
    assertClean($.html(result), HTML.removeAlign.after);
  });
});
