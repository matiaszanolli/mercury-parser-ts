import { getWeight } from '../../extractors/generic/content/scoring';

import { HEADER_TAG_LIST } from './constants';
import { normalizeSpaces } from '../text';

export default function cleanHeaders($article: cheerio.Cheerio, $: cheerio.Root, title: string = ''): cheerio.Root {
  $(HEADER_TAG_LIST, $article).each((index: number, header: cheerio.Element) => {
    const $header: cheerio.Cheerio = $(header);
    // Remove any headers that appear before all other p tags in the
    // document. This probably means that it was part of the title, a
    // subtitle or something else extraneous like a datestamp or byline,
    // all of which should be handled by other metadata handling.
    if ($(header).prevAll('p').length === 0) {
      return $header.remove();
    }

    // Remove any headers that match the title exactly.
    if (normalizeSpaces($(header).text()) === title) {
      return $header.remove();
    }

    // If this header has a negative weight, it's probably junk.
    // Get rid of it.
    if (getWeight($(header)) < 0) {
      return $header.remove();
    }

    return $header;
  });

  return $;
}
