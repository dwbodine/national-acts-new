'use client';

import { Menu } from '@/types/public';
import { publicService } from '@/services';

export const useGetMenu = () => {
  const getMenu = async (): Promise<Menu> => await publicService.getMenu();
  return { getMenu };
};
