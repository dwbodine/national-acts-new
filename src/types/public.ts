export enum SiteSettingType {
  Image = 'Image',
  Number = 'Number',
  Text = 'Text',
}

export enum SellerType {
  Artist = 1,
  Venue = 2,
  Promoter = 3,
}

export interface SellerEventCategory {
  sellerId: number;
  ticketSocketId: number;
  eventCategoryId?: number;
  sellerEventCategoryId?: number;
  hasEvents?: boolean;
  isVisibleOnSite?: boolean;
  isVisibleOnPortal?: boolean;
}

export interface TimeZone {
  timezoneId: number;
  timezoneName: string;
  timezoneAbbrev: string;
}

export interface Country {
  countryCodeId: number;
  country: string;
  countryCode: string;
  countryName: string;
  timezones?: TimeZone[];
}

export interface Venue {
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: Country;
  timezone?: string;
}

export interface VipEvent {
  externalEventId: number;
  ticketSocketEventId?: number;
  title: string;
  venue?: Venue;
  eventDate: string;
  thumbnail?: string;
  externalThumbnail?: string;
  ticketSocketUrl?: string;
  isActive: boolean;
  eventTime?: string;
  sellerId?: number;
  sellerType?: SellerType;
  externalUrl?: string;
  disableLinkButton?: boolean;
  disableLinkReason?: string;
  disableVipLinkButton?: boolean;
  disableVipLinkReason?: string;
  externalVipLink?: string;
  isVip?: boolean;
  isDeleted: boolean;
  isExternal: boolean;
  sellerName?: string;
  isHidden?: boolean;
  isCancelled?: boolean;
  doorsOpen?: string;
  meetAndGreetTime?: string;
  isSoldOut?: boolean;
}

export interface SiteSetting {
  settingId: number;
  name: string;
  displayName: string;
  type: SiteSettingType;
  value: string;
  filePath?: string;
  dirty?: boolean;
}

export interface FaqCategory {
  categoryId: number;
  categoryName?: string;
}

export interface Faq {
  faqId?: number;
  category?: FaqCategory;
  order?: number;
  question?: string;
  answer?: string;
}

export type GlobalSelection = {
  menu?: Menu;
  reloadMenu: boolean;
  artists?: Page[];
  events?: VipEvent[];
  eventReloadTime?: number;
  featuredArtists?: FeaturedArtist[];
  reloadArtists: boolean;
  reloadEvents: boolean;
  reloadFeaturedArtists: boolean;
  reloadGeneralFaqs: boolean;
  reloadVIPFAQs: boolean;
  reloadTours: boolean;
  pages?: Page[];
  tours?: Tour[];
  settings?: SiteSetting[];
  reloadSettings: boolean;
  isLoading: boolean;
  generalFAQ: Faq[];
  vipFAQ: Faq[];
};

export interface Menu {
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  route: string;
  displayText: string;
  items?: MenuItem[];
}

export interface PageType {
  pageTypeId: number;
  pageTypeName: string;
}

export interface EmailMessage {
  to: string;
  toName: string;
  subject: string;
  html: string;
  replyTo?: string;
  replyToName?: string;
  ccEmails?: string[];
  fromAddress?: string;
  fromName?: string;
}

export interface PageSeller {
  pageSellerId: number;
  pageId: number;
  sellerId: number;
  displayName?: string;
  showDisplayName?: boolean;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: Country;
  phone?: string;
  email?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  spotify?: string;
  website?: string;
  websiteDisplayText?: string;
}

export interface Seller {
  sellerId: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: Country;
  phone?: string;
  email?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  spotify?: string;
  website?: string;
  websiteDisplayText?: string;
  hideInList?: boolean;
  isActive?: boolean;
  sellerType: SellerType;
  sellerEventCategories?: SellerEventCategory[];
}

export interface Tour {
  tourId: number;
  sellers?: Seller[];
  tourName: string;
  isActive: boolean;
  announceDate: string;
  coverImage?: string;
  href?: string;
}

export interface Page {
  pageId: number;
  route: string;
  title: string;
  pageType: PageType;
  image?: string;
  thumbnail?: string;
  linkPreviewImage?: string;
  logoOnlyImage?: string;
  title1?: string;
  subtitle1?: string;
  title2?: string;
  subtitle2?: string;
  htmlText?: string;
  isActive: boolean;
  useIncludeDates?: boolean;
  includeStart?: string;
  includeEnd?: string;
  useExcludeDates?: boolean;
  excludeStart?: string;
  excludeEnd?: string;
  googleAnalyticsId?: string;
  pageOrder?: number;
  sellers?: PageSeller[];
  events?: VipEvent[];
  lastUpdated?: number;
  extraHtmlHead?: string;
  extraHtmlBody?: string;
}

export interface EmailMessage {
  to: string;
  toName: string;
  subject: string;
  html: string;
  replyTo?: string;
  replyToName?: string;
  ccEmails?: string[];
  fromAddress?: string;
  fromName?: string;
}

export interface FeaturedArtist {
  featuredArtistOrder: number;
  title: string;
  backgroundImage?: string;
  previewImage: string;
  logoImage: string;
  href: string;
}
