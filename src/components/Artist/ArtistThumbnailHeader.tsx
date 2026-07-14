'use client';

import ArtistHeaderThumbnailControl from './ArtistHeaderThumbnailControl';
import { ArtistPageProps } from '@/types/props';
import ArtistsEventsControlV2 from './ArtistEventsControlV2';

export default function ArtistThumbnailHeader(props: ArtistPageProps) {
  const { page } = props;

  return (
    <section className="artistSection" hidden={!page}>
      <ArtistHeaderThumbnailControl {...props} />
      <ArtistsEventsControlV2 {...props} />
    </section>
  );
}
