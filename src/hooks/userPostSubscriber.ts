'use client';

import { PostSubscriberResponse } from '@/types/responses';
import { publicService } from '@/services';

export const userPostSubscriber = (email: string) => {
  const addOrConfirmSubscriber = async (): Promise<PostSubscriberResponse> =>
    await publicService.addOrConfirmSubscriber(email);
  return { addOrConfirmSubscriber };
};
