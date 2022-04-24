import { getAttrs } from '../../utils/dom';

export default function convertNodeTo($node: cheerio.Cheerio, $: cheerio.Root, tag: string = 'p'): cheerio.Root {
  const node = $node.get(0);
  if (!node) {
    return $;
  }
  const attrs = getAttrs(node) || {};

  const attribString:string = Reflect.ownKeys(attrs)
    .map(key => `${String(key)}=${attrs[<string>key]}`)
    .join(' ');
  let html: string | null;

    // In the browser, the contents of noscript tags aren't rendered, therefore
    // transforms on the noscript tag (commonly used for lazy-loading) don't work
    // as expected. This test case handles that
    html = node.tagName.toLowerCase() === 'noscript' ? $node.text() : $node.html();
  $node.replaceWith(`<${tag} ${attribString}>${html}</${tag}>`);
  return $;
}
