'use client';

import { GetToursResponse } from '@/types/responses';
import { publicService } from '@/services';

export const useGetTours = () => {
  const getTours = async (): Promise<GetToursResponse> => await publicService.getTours();
  return { getTours };
};
