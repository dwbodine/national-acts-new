'use client';

import { FAQType } from '@/types/props';
import { GetFaqsResponse } from '@/types/responses';
import { publicService } from '@/services';

export const useGetFAQs = () => {
  const getFAQs = async (faqType: FAQType): Promise<GetFaqsResponse> =>
    await publicService.getFaqs(faqType as number);
  return { getFAQs };
};
