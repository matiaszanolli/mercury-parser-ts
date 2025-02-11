import assert from 'assert';
import cheerio from 'cheerio';

import { clean } from '../../test-helpers';
import {default as HTML} from './fixtures/html';
import { paragraphize } from './index';

describe('Generic Extractor Utils', () => {
  describe('paragraphize(node)', () => {
    it('conversts a BR into P and moves inline contents to P tag after current parent', () => {
      const $: cheerio.Root = cheerio.load(HTML.paragraphize.before);
      const node: cheerio.TagElement = $('br').get(0);

      // note: result here is not valid html; will handle elsewhere
      const result: string = paragraphize(node, $, true).html();

      assert.equal(clean(result), clean(HTML.paragraphize.after));
    });

    it('conversts a BR into P and stops when block element hit', () => {
      const $ = cheerio.load(HTML.paragraphizeBlock.before);
      const node: cheerio.TagElement = $('br').get(0);

      // note: result here is not valid html; will handle elsewhere
      const result: string = paragraphize(node, $, true).html();
      assert.equal(clean(result), clean(HTML.paragraphizeBlock.after));
    });
  });
});
