import { afterEach, describe, expect, it } from 'vitest';

import { getAbsoluteSiteUrl, getSiteUrl } from './siteUrl';

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

describe('siteUrl', () => {
  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  });

  it('uses the configured public site URL when available', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:4000';

    expect(getSiteUrl().toString()).toBe('http://localhost:4000/');
    expect(getAbsoluteSiteUrl('/images/logo-light.png')).toBe(
      'http://localhost:4000/images/logo-light.png',
    );
  });

  it('falls back to production when the public site URL is missing', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getSiteUrl().toString()).toBe('https://nationalactsvip.com/');
    expect(getAbsoluteSiteUrl('/events')).toBe('https://nationalactsvip.com/events');
  });
});
