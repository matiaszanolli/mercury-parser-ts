import { MockDomNode, MockDomNodeAttrib } from "../../test-helpers";

export default function getAttrs(node: cheerio.TagElement | MockDomNode): { [attr: string]: string; } | MockDomNodeAttrib[] {
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
