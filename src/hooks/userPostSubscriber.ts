'use client';

import { PostSubscriberRequest } from '@/types/public';
import { PostSubscriberResponse } from '@/types/responses';
import { publicService } from '@/services';

export const userPostSubscriber = () => {
  const addOrConfirmSubscriber = async (
    request: PostSubscriberRequest,
  ): Promise<PostSubscriberResponse> =>
    await publicService.addOrConfirmSubscriber(request);
  return { addOrConfirmSubscriber };
};
