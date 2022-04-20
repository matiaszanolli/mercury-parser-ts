import iconv from 'iconv-lite';
import { DEFAULT_ENCODING, ENCODING_RE } from './constants';

// check a string for encoding; this is
// used in our fetchResource function to
// ensure correctly encoded responses
export default function getEncoding(str: string): string {
  let encoding: string = DEFAULT_ENCODING;
  const matches: RegExpExecArray | null = ENCODING_RE.exec(str);
  if (matches !== null) {
    [, str] = matches;
  }
  if (iconv.encodingExists(str)) {
    encoding = str;
  }
  return encoding;
}
