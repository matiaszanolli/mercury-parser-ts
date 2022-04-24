import { withinComment } from '.';

function isGoodNode($node: cheerio.Cheerio, maxChildren: number): boolean {
  // If it has a number of children, it's more likely a container
  // element. Skip it.
  if ($node.children().length > maxChildren) {
    return false;
  }
  // If it looks to be within a comment, skip it.
  if (withinComment($node)) {
    return false;
  }

  return true;
}

// Given a a list of selectors find content that may
// be extractable from the document. This is for flat
// meta-information, like author, title, date published, etc.
export default function extractFromSelectors(
  $: cheerio.Root,
  selectors: string[] = [],
  maxChildren: number = 1,
  textOnly: boolean = true
): string | null {
  // eslint-disable-next-line no-restricted-syntax
  for (const selector of selectors) {
    const nodes: cheerio.Cheerio = $(selector);

    // If we didn't get exactly one of this selector, this may be
    // a list of articles or comments. Skip it.
    if (nodes.length === 1) {
      const $node: cheerio.Cheerio = $(nodes[0]);

      if (isGoodNode($node, maxChildren)) {
        let content: string | null;
        if (textOnly) {
          content = $node.text();
        } else {
          content = $node.html();
        }

        if (content) {
          return content;
        }
      }
    }
  }

  return null;
}
