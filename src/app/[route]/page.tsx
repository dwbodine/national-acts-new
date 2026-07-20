import { getAbsoluteSiteUrl, getSiteUrl } from '@/lib/siteUrl';
import { notFound, redirect } from 'next/navigation';
import { JSX } from 'react';
import type { Metadata } from 'next';
import { Page } from '@/types/public';
import PageLoader from '@/components/common/PageLoader';
import moment from 'moment';

const getPageData = async (route: string): Promise<Page | undefined> => {
  if (!route) {
    return undefined;
  }

  const url = `${process.env.NEXT_PUBLIC_SERVICE_URL}/public/page/${route}`;

  const requestOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    method: 'GET',
  };

  const res = await fetch(url, requestOptions);

  if (!res.ok) {
    return undefined;
  }

  const page: Page = await res.json();
  if (page) {
    page.lastUpdated = moment().unix();
  }  
  return page;
};

/* eslint-disable-next-line func-style */
export async function generateMetadata(props: {
  params: Promise<{ route: string }>;
}): Promise<Metadata> {
  const { route } = await props.params;
  let page: Page | undefined = {
    isActive: true,
    pageId: 0,
    pageType: {
      pageTypeId: 0,
      pageTypeName: 'Home',
    },
    route: '',
    title: 'National Acts VIP',
  };

  if (route) {
    page = await getPageData(route);
  } else {
    redirect('/');
  }

  const title = page?.title || 'National Acts VIP';
  const description = page?.title || 'National Acts VIP';

  let ogImage = page?.linkPreviewImage;
  if (ogImage && !ogImage.startsWith('http')) {
    ogImage = `${process.env.NEXT_PUBLIC_PREVIEW_URL}${ogImage}`;
  }
  if (!ogImage) {
    ogImage = getAbsoluteSiteUrl('/images/logo-light.png');
  }

  const siteUrl = getSiteUrl();
  const pageUrl = getAbsoluteSiteUrl(`/${route}`);

  return {
    description,
    metadataBase: siteUrl,
    openGraph: {
      description,
      images: [
        {
          alt: title,
          url: ogImage,
        },
      ],
      title,
      type: 'website',
      url: pageUrl,
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

export default async function RoutingPage(props: {
  params: Promise<{ route: string }>;
}): Promise<JSX.Element> {
  const { route } = await props.params;
  const page = await getPageData(route);

  if (!page) {
    notFound();
  }

  return <PageLoader page={page} />;
}
