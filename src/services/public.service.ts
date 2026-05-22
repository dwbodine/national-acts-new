import {
  EmailMessage,
  Faq,
  FaqCategory,
  FeaturedArtist,
  Menu,
  MenuItem,
  Page,
  Seller,
  SiteSetting,
  Tour,
  VipEvent,
} from '@/types/public';
import {
  GetContactMessageResponse,
  GetEventsResponse,
  GetFaqCategoriesResponse,
  GetFaqsResponse,
  GetFeaturedArtistsResponse,
  GetPagesResponse,
  GetSellersResponse,
  GetSettingsResponse,
  GetToursResponse,
  PostSubscriberResponse,
} from '@/types/responses';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { PageTypeKey } from '@/constants';
import moment from 'moment';

export class PublicService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  searchEvents = async (searchTerm?: string): Promise<GetEventsResponse> => {
    let url = `/public/events?site=1`;

    if (searchTerm && searchTerm.length > 0) {
      url += `&search=${searchTerm}`;
    }

    const response: GetEventsResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      response.events = res.data ? (res.data as VipEvent[]) : [];
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while searching events - please contact your administrator';
    }

    return response;
  };

  getAllFaqCategories = async (): Promise<GetFaqCategoriesResponse> => {
    const url = `/public/faq_categories`;

    const response: GetFaqCategoriesResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      response.categories = res.data ? (res.data as FaqCategory[]) : undefined;
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while fetching faq categories - please contact your administrator';
    }

    return response;
  };

  getFaqs = async (categoryId: number): Promise<GetFaqsResponse> => {
    const url = `/public/faq/${categoryId}`;

    const response: GetFaqsResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      response.faqs = res.data ? (res.data as Faq[]) : undefined;
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while fetching faqs - please contact your administrator';
    }

    return response;
  };

  getMenu = async (): Promise<Menu> => {
    const venues = await this.getPagesByType(PageTypeKey.Venue);
    const promoters = await this.getPagesByType(PageTypeKey.Promoter);

    const menu: Menu = {
      items: [],
      title: 'Main Menu',
    };

    menu.items.push({
      displayText: 'Search Events',
      route: 'events',
    });

    menu.items.push({
      displayText: 'Artists',
      route: 'vipclients',
    });

    if (venues && venues.pages && venues.pages.length > 0) {
      const venueMenuItem: MenuItem = {
        displayText: 'Venues',
        items: [],
        route: 'venues',
      };

      venues.pages.forEach((page) => {
        venueMenuItem.items?.push({
          displayText: page.title,
          route: page.route,
        });
      });

      menu.items.push(venueMenuItem);
    }

    if (promoters && promoters.pages && promoters.pages.length > 0) {
      const promoterMenuItem: MenuItem = {
        displayText: 'Promoters',
        items: [],
        route: 'promoters',
      };

      promoters.pages.forEach((page) => {
        promoterMenuItem.items?.push({
          displayText: page.title,
          route: page.route,
        });
      });

      menu.items.push(promoterMenuItem);
    }

    menu.items.push({
      displayText: 'Contact Us',
      route: 'contact-us',
    });

    return menu;
  };

  getPagesByType = async (pageTypeKey: PageTypeKey): Promise<GetPagesResponse> => {
    const url = `/public/pages/${pageTypeKey}`;

    const response: GetPagesResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      const pages = res.data ? (res.data as Page[]) : [];
      response.pages = pages.map((pg) => {
        pg.lastUpdated = moment().unix();
        return pg;
      });
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while fetching pages by type - please contact your administrator';
    }

    return response;
  };

  getFeaturedArtists = async (): Promise<GetFeaturedArtistsResponse> => {
    const url = `/public/featuredArtists`;

    const response: GetFeaturedArtistsResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      response.featuredArtists = res.data ? (res.data as FeaturedArtist[]) : [];
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while fetching featured artists - please contact your administrator';
    }

    return response;
  };

  getSellers = async (): Promise<GetSellersResponse> => {
    const url = `/public/sellers`;

    const response: GetSellersResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      response.sellers = res.data ? (res.data as Seller[]) : [];
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while fetching sellers - please contact your administrator';
    }

    return response;
  };

  getSiteSettings = async (): Promise<GetSettingsResponse> => {
    const url = `/public/settings`;

    const response: GetSettingsResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      response.settings = res.data ? (res.data as SiteSetting[]) : [];
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while fetching settings - please contact your administrator';
    }

    return response;
  };

  getTours = async (): Promise<GetToursResponse> => {
    const url = `/public/tours`;

    const response: GetToursResponse = {};

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.get(url, { headers });
      response.statusCode = res.status;
      response.tours = res.data ? (res.data as Tour[]) : [];
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while fetching tours - please contact your administrator';
    }

    return response;
  };

  sendContactEmail = async (
    message: EmailMessage,
  ): Promise<GetContactMessageResponse> => {
    const url = `/messaging/email`;

    const response: GetContactMessageResponse = {};

    const data = JSON.stringify(message);

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_MAIL_API_KEY}`,
    };

    try {
      const res = await this.instance.post(url, data, { headers });
      const bResponse = res.data ? (res.data as GetContactMessageResponse) : {};
      response.success = bResponse?.success ?? false;
      if (!response.success) {
        response.error = bResponse?.error ?? 'Unknown error sending email';
      }
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while sending email - please contact your administrator';
    }

    return response;
  };

  addOrConfirmSubscriber = async (email: string): Promise<PostSubscriberResponse> => {
    const url = `/public/addOrConfirmSubscriber`;

    const response: PostSubscriberResponse = {};

    const data = JSON.stringify({ email });

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    };

    try {
      const res = await this.instance.post(url, data, { headers });
      const subscriberId = JSON.stringify(res.data);
      response.subscriberId = parseInt(subscriberId);
      response.success = !isNaN(response.subscriberId) && response.subscriberId >= 0;
    } catch (e) {
      const err = e as AxiosError;
      response.statusCode = err?.response?.status ?? 500;
      response.error =
        err?.message ??
        'Unknown error while adding to mailing list - please contact the administrator';
    }

    return response;
  };
}
