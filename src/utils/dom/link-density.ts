export function textLength(text: string): number {
  return text.trim().replace(/\s+/g, ' ').length;
}

// Determines what percentage of the text
// in a node is link text
// Takes a node, returns a float
export function linkDensity($node: cheerio.Cheerio): number {
  const totalTextLength: number = textLength($node.text());

  const linkText: string = $node.find('a').text();
  const linkLength: number = textLength(linkText);

  if (totalTextLength > 0) {
    return linkLength / totalTextLength;
  }
  if (totalTextLength === 0 && linkLength > 0) {
    return 1;
  }

  return 0;
}
