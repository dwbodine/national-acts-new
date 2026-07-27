import { NextResponse } from 'next/server';

const filterParamNames = ['startDate', 'sellerId', 'eventId'];

export const GET = async (request: Request): Promise<NextResponse> => {
  const serviceUrl = process.env.NEXT_PUBLIC_SERVICE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!serviceUrl || !apiKey) {
    return NextResponse.json(
      { error: 'Missing public API configuration' },
      { status: 500 },
    );
  }

  try {
    const requestUrl = new URL(request.url);
    const url = new URL('/public/moments/filter', serviceUrl);

    filterParamNames.forEach((paramName) => {
      const paramValue = requestUrl.searchParams.get(paramName);

      if (paramValue) {
        url.searchParams.set(paramName, paramValue);
      }
    });

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Unable to fetch moments' },
        { status: response.status },
      );
    }

    return NextResponse.json(await response.json(), {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Unable to fetch moments' }, { status: 500 });
  }
};
