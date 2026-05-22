import { EmailMessage } from '@/types/public';
import { GetContactMessageResponse } from '@/types/responses';
import { publicService } from '../services';

export const useSendContactEmail = () => {
  const sendContactEmail = async (
    message: EmailMessage,
  ): Promise<GetContactMessageResponse> => await publicService.sendContactEmail(message);

  return { sendContactEmail };
};
