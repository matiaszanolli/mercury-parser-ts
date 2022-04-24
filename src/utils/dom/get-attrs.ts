import { MockDomNode, MockDomNodeAttrib } from "../../test-helpers";

export type NodeAttrList = { [attr: string]: string; } | (MockDomNodeAttrib | MockDomNodeAttrib[]);

export default function getAttrs(node: cheerio.TagElement | MockDomNode): Record<string, any> {
  const { attribs } = node;

  // if (!attribs && attributes) {
  //   const attrs = Reflect.ownKeys(attributes).reduce((acc, index) => {
  //     const attr = attributes[index];

  //     if (!attr.name || !attr.value) return acc;

  //     acc[attr.name] = attr.value;
  //     return acc;
  //   }, {});
  //   return attrs;
  // }

  return attribs;
}
