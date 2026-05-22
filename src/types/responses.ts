import { Faq, FaqCategory, Page, Seller, SiteSetting, VipEvent } from './public';

export interface GetResponseBase {
  statusCode?: number;
  error?: string;
}

export interface GetFaqCategoriesResponse extends GetResponseBase {
  categories?: FaqCategory[];
}

export interface GetFaqsResponse extends GetResponseBase {
  faqs?: Faq[];
}

export interface GetPageResponse extends GetResponseBase {
  page?: Page;
}

export interface GetPagesResponse extends GetResponseBase {
  pages?: Page[];
}

export interface GetSettingsResponse extends GetResponseBase {
  settings?: SiteSetting[];
}

export interface GetEventsResponse extends GetResponseBase {
  events?: VipEvent[];
}

export interface GetSellersResponse extends GetResponseBase {
  sellers?: Seller[];
}

export interface GetContactMessageResponse extends GetResponseBase {
  success?: boolean;
}
