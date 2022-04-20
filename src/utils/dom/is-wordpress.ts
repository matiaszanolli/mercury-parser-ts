import { IS_WP_SELECTOR } from './constants';

export default function isWordpress($: cheerio.Root): boolean {
  return $(IS_WP_SELECTOR).length > 0;
}
