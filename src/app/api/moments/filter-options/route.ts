import type { MomentsFilterOption, MomentsFilterOptionsResponse } from '@/types/moments';
import { NextResponse } from 'next/server';

type MomentEvent = Record<string, unknown> & {
  eventId?: number | string;
  location?: string;
};

type MomentDate = Record<string, unknown> | string;

type MomentSeller = Record<string, unknown> & {
  Id?: number | string;
  Name?: string;
  SellerId?: number | string;
  id?: number | string;
  name?: string;
  sellerId?: number | string;
};

const getSortedUniqueOptions = (
  options: Array<MomentsFilterOption | undefined>,
): MomentsFilterOption[] => {
  const optionsByValue = new Map<string, MomentsFilterOption>();

  options.forEach((option) => {
    if (option && !optionsByValue.has(option.value)) {
      optionsByValue.set(option.value, option);
    }
  });

  return [...optionsByValue.values()].sort((firstOption, secondOption) =>
    firstOption.label.localeCompare(secondOption.label),
  );
};

const getStringProperty = (
  item: Record<string, unknown>,
  propertyNames: string[],
): string | undefined => {
  const propertyValue = propertyNames
    .map((propertyName) => item[propertyName])
    .find((value) => typeof value === 'string' && value.trim().length > 0);

  return typeof propertyValue === 'string' ? propertyValue.trim() : undefined;
};

const getIdProperty = (
  item: Record<string, unknown>,
  propertyNames: string[],
): string | undefined => {
  const propertyValue = propertyNames
    .map((propertyName) => item[propertyName])
    .find((value) => typeof value === 'number' || typeof value === 'string');

  return propertyValue ? `${propertyValue}` : undefined;
};

const normalizeDate = (dateValue: string): string | undefined => {
  const trimmedDateValue = dateValue.trim();

  if (/^\d{4}-\d{2}-\d{2}/u.test(trimmedDateValue)) {
    return trimmedDateValue.slice(0, 10);
  }

  const parsedDate = new Date(trimmedDateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  const year = parsedDate.getFullYear();
  const month = `${parsedDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${parsedDate.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getBandOption = (seller: MomentSeller): MomentsFilterOption | undefined => {
  const name = getStringProperty(seller, ['Name', 'name']);

  if (!name) {
    return undefined;
  }

  return {
    label: name,
    value: getIdProperty(seller, ['SellerId', 'sellerId', 'Id', 'id']) ?? name,
  };
};

const getLocationOption = (event: MomentEvent): MomentsFilterOption | undefined => {
  const label =
    getStringProperty(event, ['Location', 'location']) ??
    getStringProperty(event, ['VenueLocation', 'venueLocation']) ??
    getStringProperty(event, ['CityState', 'cityState']);

  if (!label) {
    return undefined;
  }

  return {
    label,
    value: getIdProperty(event, ['eventId', 'Id', 'id']) ?? label,
  };
};

const getActiveDate = (momentDate: MomentDate): string | undefined => {
  if (typeof momentDate === 'string') {
    return normalizeDate(momentDate);
  }

  const dateValue = getStringProperty(momentDate, [
    'Date',
    'date',
    'EventDate',
    'eventDate',
    'MomentDate',
    'momentDate',
  ]);

  return dateValue ? normalizeDate(dateValue) : undefined;
};

const getSortedUniqueDates = (dates: Array<string | undefined>): string[] =>
  [...new Set(dates.filter((date): date is string => Boolean(date)))].sort();

const getFilterOptions = (
  dates: MomentDate[],
  events: MomentEvent[],
  sellers: MomentSeller[],
): MomentsFilterOptionsResponse => ({
  activeDates: getSortedUniqueDates(dates.map(getActiveDate)),
  bandOptions: getSortedUniqueOptions(sellers.map(getBandOption)),
  locationOptions: getSortedUniqueOptions(events.map(getLocationOption)),
});

const fetchPublicData = async <ResponseData>(
  path: string,
  serviceUrl: string,
  apiKey: string,
): Promise<ResponseData> => {
  const url = new URL(path, serviceUrl);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return (await response.json()) as ResponseData;
};

export const GET = async (): Promise<NextResponse> => {
  const serviceUrl = process.env.NEXT_PUBLIC_SERVICE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!serviceUrl || !apiKey) {
    return NextResponse.json(
      { error: 'Missing public API configuration' },
      { status: 500 },
    );
  }

  try {
    const [dates, events, sellers] = await Promise.all([
      fetchPublicData<MomentDate[]>('/public/getAllMomentDates', serviceUrl, apiKey),
      fetchPublicData<MomentEvent[]>('/public/getAllMomentEvents', serviceUrl, apiKey),
      fetchPublicData<MomentSeller[]>('/public/getAllMomentSellers', serviceUrl, apiKey),
    ]);

    return NextResponse.json(getFilterOptions(dates, events, sellers));
  } catch {
    return NextResponse.json(
      { error: 'Unable to fetch moments filter options' },
      { status: 500 },
    );
  }
};
