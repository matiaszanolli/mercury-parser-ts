import { getAttrs } from '../../utils/dom';

export default function withinComment($node: cheerio.Cheerio): boolean {
  const parents: cheerio.Element[] = $node.parents().toArray();
  const commentParent = parents.find(parent => {
    const attrs: Record<string, any> = getAttrs(<cheerio.TagElement> parent);
    const nodeClass: string = <string>attrs.class;
    attrs.class = nodeClass;
    const classAndId = `${nodeClass} ${attrs.id}`;
    return classAndId.includes('comment');
  });

  return commentParent !== undefined;
}
