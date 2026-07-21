'use client';

import { GetFeaturedArtistsResponse } from '@/types/responses';
import { publicService } from '@/services';

export const useGetFeaturedArtists = () => {
  const getFeaturedArtists = async (): Promise<GetFeaturedArtistsResponse> =>
    await publicService.getFeaturedArtists();
  return { getFeaturedArtists };
};
