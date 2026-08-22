import {
  Faq,
  FaqCategory,
  FeaturedArtist,
  Page,
  RefundCategory,
  RefundPolicy,
  Seller,
  SiteSetting,
  Tour,
  VipEvent,
} from './public';

export interface GetResponseBase {
  statusCode?: number;
  error?: string;
}

export interface PostReponseBase extends GetResponseBase {
  success?: boolean;
  errorMessage?: string;
}

export interface GetFaqCategoriesResponse extends GetResponseBase {
  categories?: FaqCategory[];
}

export interface GetFaqsResponse extends GetResponseBase {
  faqs?: Faq[];
}

export interface GetRefundCategoriesResponse extends GetResponseBase {
  categories?: RefundCategory[];
}

export interface GetRefundPolicyResponse extends GetResponseBase {
  policy?: RefundPolicy;
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

export interface GetToursResponse extends GetResponseBase {
  tours?: Tour[];
}

export interface GetEventsResponse extends GetResponseBase {
  events?: VipEvent[];
}

export interface GetFeaturedArtistsResponse extends GetResponseBase {
  featuredArtists?: FeaturedArtist[];
}

export interface GetSellersResponse extends GetResponseBase {
  sellers?: Seller[];
}

export interface GetContactMessageResponse extends GetResponseBase {
  success?: boolean;
}

export interface PostSubscriberResponse extends PostReponseBase {
  subscriberId?: string | 1 | -1;
}
