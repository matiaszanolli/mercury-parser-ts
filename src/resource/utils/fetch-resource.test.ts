import assert from 'assert';

import { record } from '../../test-helpers';
import fetchResource, { baseDomain, validateResponse } from './fetch-resource';
import { MAX_CONTENT_LENGTH } from './constants';
import { SimpleObject } from '../../resource';

describe('fetchResource(url)', () => {
  const recorder = record('fetch-resource-test');
  beforeEach(recorder.before);
  afterEach(recorder.after);

  it('returns appropriate json for bad url', async () => {
    const url = 'http://www.nytimes.com/500';
    const { error } = await fetchResource(url);

    assert.equal(error, true);
  });

  it('passes custom headers in requests', async () => {
    // A GET request to this endpoint returns the list of all request headers as part of the response JSON
    const url: string = 'https://postman-echo.com/headers';
    const parsedUrl: URL = new URL(url);
    const headers: SimpleObject = {
      'my-custom-header': 'Lorem ipsum dolor sit amet',
    };
    const result: SimpleObject = <SimpleObject>await fetchResource(url, parsedUrl, <SimpleObject>headers);
    const body: SimpleObject = JSON.parse((<SimpleObject>result.body).toString());

    assert.equal(
      (<SimpleObject>body.headers)['my-custom-header'],
      'Lorem ipsum dolor sit amet'
    );
  });

  it('returns a buffer as its body', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const result: SimpleObject = await fetchResource(url);

    assert.equal(typeof result.body, 'object');
  });

  it('fetches nyt', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const response: SimpleObject = await fetchResource(url);
    const res: SimpleObject = <SimpleObject>response.response;

    assert.equal(res.statusCode, 200);
  });

  it('fetches domains', async () => {
    const url = 'http://theconcourse.deadspin.com/1786177057';
    const response: SimpleObject = await fetchResource(url);
    const res: SimpleObject = <SimpleObject>response.response;

    assert.equal(res.statusCode, 200);
  });

  it('fetches nyt', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
      const response: SimpleObject = await fetchResource(url);
      const res: SimpleObject = <SimpleObject>response.response;
  
    assert.equal(res.statusCode, 200);
  });

  it('handles this gzip error', async () => {
    const url =
      'http://www.redcross.ca/blog/2016/11/photo-of-the-day--one-year-anniversary-of-the-end-of-ebola-in-sierra-leone';
      const response: SimpleObject = await fetchResource(url);
      const res: SimpleObject = <SimpleObject>response.response;
  
    assert.equal(res.statusCode, 200);
  });
});

describe('validateResponse(response)', () => {
  it('validates a response object', () => {
    const validResponse: SimpleObject = {
      statusMessage: 'OK',
      statusCode: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': 500,
      },
    };

    assert.equal(validateResponse(validResponse), true);
  });

  it('throws an error if there is no status code', () => {
    const invalidResponse: SimpleObject = {};

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /unable to fetch content/i);
  });

  it('throws an error if response code is not 200', () => {
    const invalidResponse: SimpleObject = {
      statusCode: 500,
    };

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /instructed to reject non-200/i);
  });

  it('throws an error if response has bad content-type', () => {
    const invalidResponse: SimpleObject = {
      statusMessage: 'OK',
      statusCode: 200,
      headers: {
        'content-type': 'image/gif',
        'content-length': 500,
      },
    };

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /content-type for this resource/i);
  });

  it('throws an error if response length is > max', () => {
    const invalidResponse: SimpleObject = {
      statusMessage: 'OK',
      statusCode: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': MAX_CONTENT_LENGTH + 1,
      },
    };

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /Content for this resource was too large/i);
  });
});

describe('baseDomain(parsedUrl)', () => {
  it('returns the base domain, excluding subdomain', () => {
    const url = 'https://www.npmjs.com/package/request#streaming';
    const parsedUrl: URL = new URL(url);

    assert.equal(baseDomain(parsedUrl), 'npmjs.com');
  });

  it('returns the base domain as is if no subdomain', () => {
    const url = 'https://npmjs.com/package/request#streaming';
    const parsedUrl = new URL(url);

    assert.equal(baseDomain(parsedUrl), 'npmjs.com');
  });
});
