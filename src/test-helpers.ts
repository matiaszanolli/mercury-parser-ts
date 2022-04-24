import assert from 'assert';
import nock from 'nock'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';
// import cheerio from 'cheerio';

// const fs = require('fs');

export function clean(str: string): string {
  return str
    .trim()
    .replace(/\r?\n|\r/g, '')
    .replace(/\s+/g, ' ');
}

export function assertClean(a: string, b: string): void {
  assert.equal(clean(a), clean(b));
}

interface TestHelper {
  test_folder: string
  fixtures_folder: string
}

// using this from https://www.ctl.io/developers/blog/post/http-apis-test-code
export function record(name: string, options: TestHelper) {
  const test_folder: string = options.test_folder || '.';
  const fixtures_folder: string = options.fixtures_folder || 'fixtures/nock';
  const fp = path.join(test_folder, fixtures_folder, `${name}.js`);
  // `has_fixtures` indicates whether the test has fixtures we should read,
  // or doesn't, so we should record and save them.
  // the environment variable `NOCK_RECORD` can be used to force a new recording.
  let has_fixtures: boolean = !!process.env.NOCK_RECORD;

  return {
    before: () => {
      
      if (!has_fixtures) {
        try {
          require(`../${fp}`); // eslint-disable-line global-require, import/no-dynamic-require, max-len
          has_fixtures = true;
        } catch (e) {
          nock.recorder.rec({
            dont_print: true,
          });
        }
      } else {
        has_fixtures = false;
        nock.recorder.rec({
          dont_print: true,
        });
      }
    },

    after: (done: () => void) => {
      if (!has_fixtures) {
        let fixtures: string[] | nock.Definition[] = nock.recorder.play();
        // eslint-disable-next-line no-console
        console.log(
          `This is disabled for browser/node interop. To capture fixutres,
          open ${'`src/test-helpers.js`'} and uncomment lines 58 and 59 and
          the fs import at top of file.`
        );
        // const text = `const nock = require('nock');\n${has_fixtures.join('\n')}`;
        // fs.writeFile(fp, text, done);
      } else {
        done();
      }
    },
  };
}


export interface MockDomNodeAttrib {
  name?: string
  value?: string
  id?: string,
  class?: string

}

export class MockDomNode {
  attribs: MockDomNodeAttrib
  class?: string

  constructor() {
    this.attribs = [
      {
        name: 'class',
        value: 'foo bar',
      },
    ];
  }

  setAttribute(key: string, val: string): void {
    this.attribs.pop();
    this.attribs.push({ name: key, value: val });
  }

  removeAttribute(): void {
    this.attribs.pop();
  }
}
