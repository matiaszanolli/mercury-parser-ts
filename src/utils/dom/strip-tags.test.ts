import assert from 'assert';
import cheerio from 'cheerio';

import stripTags from './strip-tags';

describe('stripTags(title, $)', () => {
  it('strips tags from a string of text', () => {
    const $: cheerio.Root = cheerio.load('<div></div>');

    const result: string = stripTags('What a <em>Wonderful</em> Day', $);

    assert.equal(result, 'What a Wonderful Day');
  });

  it('returns the original text if no tags found', () => {
    const $: cheerio.Root = cheerio.load('<div></div>');

    const result: string = stripTags('What a Wonderful Day', $);

    assert.equal(result, 'What a Wonderful Day');
  });
});
