const DEFAULT_SITE_URL = 'https://nationalactsvip.com';

export const getSiteUrl = (): URL => {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    return new URL(configuredSiteUrl || DEFAULT_SITE_URL);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
};

export const getAbsoluteSiteUrl = (path: string = ''): string =>
  new URL(path, getSiteUrl()).toString();
