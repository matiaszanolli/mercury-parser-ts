import { convertNodeTo } from '.';

// H1 tags are typically the article title, which should be extracted
// by the title extractor instead. If there's less than 3 of them (<3),
// strip them. Otherwise, turn 'em into H2s.
export default function cleanHOnes(article: cheerio.Cheerio, $: cheerio.Root): cheerio.Root {
  const $hOnes: cheerio.Cheerio = $('h1', article);

  if ($hOnes.length < 3) {
    $hOnes.each((index, node) => $(node).remove());
  } else {
    $hOnes.each((index, node) => {
      convertNodeTo($(node), $, 'h2');
    });
  }

  return $;
}
