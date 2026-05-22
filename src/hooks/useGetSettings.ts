'use client';

import { GetSettingsResponse } from '@/types/responses';
import { publicService } from '@/services';

export const useGetSettings = () => {
  const getSettings = async (): Promise<GetSettingsResponse> =>
    await publicService.getSiteSettings();
  return { getSettings };
};
