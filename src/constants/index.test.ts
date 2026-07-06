import { describe, expect, it } from 'vitest';

import {
  DEFAULT_COUNTRY_ID,
  EVENT_RELOAD_TIMEOUT,
  HOME_BANNER,
  HOME_BANNER_LINK,
  MOBILE_WIDTH_BREAKPOINT,
  PageTypeKey,
} from './index';

describe('constants', () => {
  it('exports page type keys used for route selection', () => {
    expect(PageTypeKey.Home).toBe(1);
    expect(PageTypeKey.Events).toBe(3);
    expect(PageTypeKey.Artist).toBe(7);
    expect(PageTypeKey.MailingList).toBe(28);
  });

  it('exports shared site settings defaults', () => {
    expect(HOME_BANNER).toBe('HomeBanner');
    expect(HOME_BANNER_LINK).toBe('HomeBannerLink');
    expect(MOBILE_WIDTH_BREAKPOINT).toBe(590);
    expect(DEFAULT_COUNTRY_ID).toBe(235);
    expect(EVENT_RELOAD_TIMEOUT).toBe(300);
  });
});
