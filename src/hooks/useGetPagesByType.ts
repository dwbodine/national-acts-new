'use client';

import { GetPagesResponse } from '@/types/responses';
import { PageTypeKey } from '@/constants';
import { publicService } from '@/services';

export const useGetPagesByType = () => {
  const getPagesByType = async (pageTypeKey: PageTypeKey): Promise<GetPagesResponse> =>
    await publicService.getPagesByType(pageTypeKey);
  return { getPagesByType };
};
