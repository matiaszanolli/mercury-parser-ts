import { NON_TOP_CANDIDATE_TAGS_RE } from './constants';
import { getScore } from './index';
import mergeSiblings from './merge-siblings';

// After we've calculated scores, loop through all of the possible
// candidate nodes we found and find the one with the highest score.
export default function findTopCandidate($: cheerio.Root): cheerio.Cheerio {
  let $candidate: cheerio.Cheerio | null = null;
  let topScore: number = 0;

  $('[score]').each((index: number, node: cheerio.Element) => {
    // Ignore tags like BR, HR, etc
    if (NON_TOP_CANDIDATE_TAGS_RE.test((<cheerio.TagElement>node).tagName)) {
      return;
    }

    const $node: cheerio.Cheerio = $(node);
    const score: number = <number>getScore($node);

    if (score > topScore) {
      topScore = score;
      $candidate = $node;
    }
  });

  // If we don't have a candidate, return the body
  // or whatever the first element is
  if ($candidate === null) {
    return $('body') || $('*').first();
  }

  $candidate = mergeSiblings($candidate, topScore, $);

  return <cheerio.Cheerio>$candidate;
}
