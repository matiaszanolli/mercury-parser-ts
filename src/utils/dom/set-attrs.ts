import { MockDomNode } from "../../test-helpers";

export default function setAttrs(node: cheerio.TagElement | MockDomNode, attrs: { [attr: string]: string }): cheerio.TagElement | MockDomNode {
  if (node.attribs) {
    node.attribs = attrs;
  }
  return node;
}
