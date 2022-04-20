import { MockDomNode } from '../../test-helpers';

export default function setAttr(node: cheerio.TagElement | MockDomNode, attr: string, val: string): cheerio.TagElement | MockDomNode {
  if (node.attribs) {
    node.attribs[attr] = val;
  } // else if (node.attribs) {
  //   node.setAttribute(attr, val);
  // }

  return node;
}
