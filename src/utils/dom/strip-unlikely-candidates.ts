import { CANDIDATES_WHITELIST, CANDIDATES_BLACKLIST } from './constants';
import cheerio from 'cheerio';

export default function stripUnlikelyCandidates($: cheerio.Root): cheerio.Root {
  //  Loop through the provided document and remove any non-link nodes
  //  that are unlikely candidates for article content.
  //
  //  Links are ignored because there are very often links to content
  //  that are identified as non-body-content, but may be inside
  //  article-like content.
  //
  //  :param $: a cheerio object to strip nodes from
  //  :return $: the cleaned cheerio object
  $('*')
    .not('a')
    .each((index: number, node: cheerio.Element) => {
      const $node: cheerio.Cheerio = $(node);
      const classes = $node.attr('class');
      const id = $node.attr('id');
      if (!id && !classes) return;

      const classAndId: string = `${classes || ''} ${id || ''}`;
      if (CANDIDATES_WHITELIST.test(classAndId)) {
        return;
      }
      if (CANDIDATES_BLACKLIST.test(classAndId)) {
        $node.remove();
      }
    });

  return $;
}
