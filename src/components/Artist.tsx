'use client';

import { useEffect, useState } from 'react';
import ArtistFullHeader from './Artist/ArtistFullHeader';
import ArtistOriginal from './Artist/ArtistOriginal';
import { ArtistPageProps } from '@/types/props';
import { ArtistTemplate } from '@/constants';
import ArtistThumbnailHeader from './Artist/ArtistThumbnailHeader';

export default function Artist(props: ArtistPageProps) {
  const { ArtistTemplateType, page } = props;
  const [hasFanMomentsResult, setHasFanMomentsResult] = useState<boolean>(props.HasFanMoments ?? false);

  const hasFanMoments = async (sellerId: number): Promise<boolean> => {
    const searchParams = new URLSearchParams();
    searchParams.set('sellerId', sellerId.toString());
    const queryString = searchParams.toString();

    const response = await fetch(`/api/moments/filter?${queryString}`);

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();

    return Array.isArray(responseData) && responseData.length > 0;
  };

  useEffect(() => {
    let isMounted = true;

    const loadHasFanMoments = async () => {
      const sellerIds = page.sellers?.map((seller) => seller.sellerId) ?? [];

      if (sellerIds.length === 0) {
        if (isMounted) {
          setHasFanMomentsResult(false);
        }
        return;
      }

      const sellerHasFanMoments = await Promise.all(sellerIds.map((sellerId) => hasFanMoments(sellerId)));

      if (isMounted) {
        setHasFanMomentsResult(sellerHasFanMoments.some(Boolean));
      }
    };

    loadHasFanMoments().catch(() => {
      if (isMounted) {
        setHasFanMomentsResult(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [page.sellers]);

  const artistProps: ArtistPageProps = {
    ...props,
    HasFanMoments: hasFanMomentsResult,
  };

  switch (ArtistTemplateType) {
    case ArtistTemplate.NewTemplateFullHeader:
      return <ArtistFullHeader {...artistProps} />;
    case ArtistTemplate.NewTemplateThumbnailHeader:
      return <ArtistThumbnailHeader {...artistProps} />;
    default:
      return <ArtistOriginal {...artistProps} />;
  }
}
