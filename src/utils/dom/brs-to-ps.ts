import { paragraphize } from './index';

// ## NOTES:
// Another good candidate for refactoring/optimizing.
// Very imperative code, I don't love it. - AP

//  Given cheerio object, convert consecutive <br /> tags into
//  <p /> tags instead.
//
//  :param $: A cheerio object

export default function brsToPs($: cheerio.Root): cheerio.Root {
  let collapsing: boolean = false;
  $('br').each((index: number, element: cheerio.Element) => {
    const tagElement: cheerio.TagElement = <cheerio.TagElement> element;
    const $element: cheerio.Cheerio = $(tagElement);
    const nextElement: cheerio.TagElement = $element.next().get(0);

    if (nextElement && nextElement.tagName.toLowerCase() === 'br') {
      collapsing = true;
      $element.remove();
    } else if (collapsing) {
      collapsing = false;
      paragraphize(tagElement, $, true);
    }
  });

  return $;
}
