import { Faq, Page, SellerType, VipEvent } from './public';

export interface PageProps {
  page: Page;
}

export enum FAQType {
  General = 1,
  VIP = 2,
}

export interface FAQProps extends PageProps {
  faqType: FAQType;
}

export interface FAQuestionProps {
  question: Faq;
  index: number;
}

export interface ArtistBoxProps {
  key: string;
  SellerId: number;
  DisplayName?: string;
  ShowDisplayName?: boolean;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Country?: string;
  Phone?: string;
  Email?: string;
  Website?: string;
  Facebook?: string;
  Twitter?: string;
  Instagram?: string;
  Youtube?: string;
  Spotify?: string;
}

export interface EventRowProps {
  Event?: VipEvent;
  DarkMode?: boolean;
  SellerType?: SellerType;
  OpenUrl?: (url: string) => void;
}
