import { PublicService } from './public.service';

const baseServiceUrl: string = `${process.env.NEXT_PUBLIC_SERVICE_URL}`;

export const publicService = new PublicService(baseServiceUrl);
