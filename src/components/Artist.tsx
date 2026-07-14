'use client';

import ArtistFullHeader from './Artist/ArtistFullHeader';
import ArtistOriginal from './Artist/ArtistOriginal';
import { ArtistPageProps } from '@/types/props';
import { ArtistTemplate } from '@/constants';
import ArtistThumbnailHeader from './Artist/ArtistThumbnailHeader';

export default function Artist(props: ArtistPageProps) {
  const { ArtistTemplateType } = props;

  switch (ArtistTemplateType) {
    case ArtistTemplate.NewTemplateFullHeader:
      return <ArtistFullHeader {...props} />;
    case ArtistTemplate.NewTemplateThumbnailHeader:
      return <ArtistThumbnailHeader {...props} />;
    default:
      return <ArtistOriginal {...props} />;
  }
}
