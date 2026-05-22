'use client';

import { GetEventsResponse } from '@/types/responses';
import { publicService } from '@/services';

export const useSearchEvents = () => {
  const searchEvents = async (searchTerm?: string): Promise<GetEventsResponse> =>
    await publicService.searchEvents(searchTerm);
  return { searchEvents };
};
