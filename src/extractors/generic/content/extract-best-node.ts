import cheerioModule from 'cheerio';
import { stripUnlikelyCandidates, convertToParagraphs } from '../../../utils/dom';

import { scoreContent, findTopCandidate } from './scoring';

// Using a variety of scoring techniques, extract the content most
// likely to be article text.
//
// If strip_unlikely_candidates is True, remove any elements that
// match certain criteria first. (Like, does this element have a
// classname of "comment")
//
// If weight_nodes is True, use classNames and IDs to determine the
// worthiness of nodes.
//
// Returns a cheerio object $
export default function extractBestNode($: cheerio.Root, opts: { [key: string]: boolean }): cheerio.Cheerio {
  if (opts.stripUnlikelyCandidates) {
    $ = stripUnlikelyCandidates($);
  }

  $ = convertToParagraphs($);
  $ = scoreContent($, opts.weightNodes);
  const $topCandidate: cheerio.Cheerio = findTopCandidate($);

  return $topCandidate;
}
