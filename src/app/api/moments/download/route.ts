import { NextResponse } from 'next/server';

const getFilename = (imageUrl: URL): string => {
  const encodedFilename = imageUrl.pathname.split('/').pop();

  if (!encodedFilename) {
    return 'fan-moment';
  }

  try {
    return decodeURIComponent(encodedFilename);
  } catch {
    return encodedFilename;
  }
};

const getContentDisposition = (filename: string): string => {
  const fallbackFilename = filename.replace(/[^\w.-]/gu, '_');
  const encodedFilename = encodeURIComponent(filename).replace(/'/gu, '%27');

  return `attachment; filename="${fallbackFilename}"; filename*=UTF-8''${encodedFilename}`;
};

export const GET = async (request: Request): Promise<Response> => {
  const momentsUrl = process.env.NEXT_PUBLIC_MOMENTS_URL;
  const requestedUrl = new URL(request.url).searchParams.get('url');

  if (!momentsUrl || !requestedUrl) {
    return NextResponse.json({ error: 'Invalid download request' }, { status: 400 });
  }

  try {
    const allowedBaseUrl = new URL(momentsUrl);
    const imageUrl = new URL(requestedUrl);
    const allowedPath = `${allowedBaseUrl.pathname.replace(/\/$/u, '')}/`;

    if (
      imageUrl.origin !== allowedBaseUrl.origin ||
      !imageUrl.pathname.startsWith(allowedPath)
    ) {
      return NextResponse.json({ error: 'Invalid download URL' }, { status: 400 });
    }

    const imageResponse = await fetch(imageUrl, { cache: 'no-store' });

    if (!imageResponse.ok || !imageResponse.body) {
      return NextResponse.json(
        { error: 'Unable to download image' },
        { status: imageResponse.status },
      );
    }

    const headers = new Headers({
      'Cache-Control': 'no-store',
      'Content-Disposition': getContentDisposition(getFilename(imageUrl)),
      'Content-Type':
        imageResponse.headers.get('Content-Type') ?? 'application/octet-stream',
    });
    const contentLength = imageResponse.headers.get('Content-Length');

    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    return new Response(imageResponse.body, { headers });
  } catch {
    return NextResponse.json({ error: 'Invalid download request' }, { status: 400 });
  }
};
