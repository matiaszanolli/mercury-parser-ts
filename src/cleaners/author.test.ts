import assert from 'assert';

import cleanAuthor from './author';

describe('cleanAuthor(author)', () => {
  it('removes the By from an author string', () => {
    const author: string = cleanAuthor('By Bob Dylan');

    assert.equal(author, 'Bob Dylan');
  });

  it('trims trailing whitespace and line breaks', () => {
    const text: string = `
      written by
      Bob Dylan
    `;
    const author: string = cleanAuthor(text);

    assert.equal(author, 'Bob Dylan');
  });
});
