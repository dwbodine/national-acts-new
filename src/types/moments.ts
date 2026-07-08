export type MomentsFilterOption = {
  label: string;
  value: string;
};

export type MomentFilterPayload = {
  eventId?: string;
  sellerId?: string;
  startDate?: string;
};

export type MomentsFilterOptionsResponse = {
  activeDates: string[];
  bandOptions: MomentsFilterOption[];
  locationOptions: MomentsFilterOption[];
};

export type FanMomentKey = {
  eventId?: string;
  sellerId?: string;
  momentDate?: string;
  filename?: string;
  sellerName?: string;
  eventTitle?: string;
  eventVenue?: string;
  eventLocation?: string;
};

export type FanMoment = {
    key: FanMomentKey
    images?: string[]
};
