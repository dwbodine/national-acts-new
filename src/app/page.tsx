import { getAbsoluteSiteUrl, getSiteUrl } from '@/lib/siteUrl';
import Home from '@/components/Home';
import { JSX } from 'react';
import { Metadata } from 'next';
import { Page } from '@/types/public';

const getPageData = (): Page => {
  const page: Page = {
    isActive: true,
    pageId: 0,
    pageType: {
      pageTypeId: 0,
      pageTypeName: 'Home',
    },
    route: '',
    title: 'National Acts VIP',
  };
  return page;
};

/* eslint-disable-next-line func-style */
export function generateMetadata(): Metadata {
  const page = getPageData();

  const title = page?.title || 'National Acts VIP';
  const description = page?.title || 'National Acts VIP';
  const ogImage = page?.linkPreviewImage || getAbsoluteSiteUrl('/images/logo-light.png');
  const pageUrl = getSiteUrl();

  return {
    description,
    metadataBase: pageUrl,
    openGraph: {
      description,
      images: [
        {
          alt: title,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      title,
      type: 'website',
      url: pageUrl.toString(),
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [ogImage],
      title,
    },
  };
}

export default function HomePage(): JSX.Element {
  return (
    <>
      <Home />
    </>
  );
}
