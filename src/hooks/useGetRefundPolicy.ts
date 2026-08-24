'use client';

import { GetRefundPolicyResponse } from '@/types/responses';
import { RefundPolicyType } from '@/types/props';
import { publicService } from '@/services';

export const useGetRefundPolicy = () => {
  const getRefundPolicy = async (
    refundType: RefundPolicyType,
  ): Promise<GetRefundPolicyResponse> =>
    await publicService.getRefundPolicy(refundType as number);
  return { getRefundPolicy };
};
