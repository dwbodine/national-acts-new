'use client';

import { FaArrowRight, FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF, FaGlobe, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa';
import { ArtistPageProps } from '@/types/props';
import Link from 'next/link';
import { PageSeller } from '@/types/public';

type SocialLink = {
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const getPrimaryArtist = (artists: PageSeller[]): PageSeller | undefined =>
  artists.find((artist) => artist.showDisplayName) ?? artists[0];

export default function ArtistHeaderThumbnailControl(props: ArtistPageProps) {
  const { page } = props;
  const artists = page.sellers ?? [];
  const primaryArtist = getPrimaryArtist(artists);
  const pageImage = page.image
    ? `${process.env.NEXT_PUBLIC_HEADERS_URL}${page.image}`
    : '/images/crowd-web-color.jpg';
  const title = page.title1 ?? primaryArtist?.displayName ?? page.title;
  const socialLinks: SocialLink[] = [
    { href: primaryArtist?.spotify, icon: FaSpotify, label: 'Spotify' },
    { href: primaryArtist?.facebook, icon: FaFacebookF, label: 'Facebook' },
    { href: primaryArtist?.instagram, icon: FaInstagram, label: 'Instagram' },
    { href: primaryArtist?.twitter, icon: FaXTwitter, label: 'X' },
    { href: primaryArtist?.youtube, icon: FaYoutube, label: 'YouTube' },
    { href: primaryArtist?.website, icon: FaGlobe, label: 'Website' },
  ];
  const visibleSocialLinks = socialLinks.filter((socialLink) => socialLink.href);

  return (
    <header className="artist-header-thumbnail">
      <div className="artist-header-thumbnail__inner">
        <section
          className="artist-header-thumbnail__hero"
          aria-labelledby="artist-header-thumbnail-title"
        >
          <div className="artist-header-thumbnail__intro">
            <img className="artist-header-thumbnail__image" src={pageImage} alt={title} />
            <div className="artist-header-thumbnail__copy">
              <h1
                className="artist-header-thumbnail__title"
                id="artist-header-thumbnail-title"
                hidden={!(page.artistPageSettings?.showTitle ?? false)}
              >
                {title}
              </h1>
            </div>
          </div>

          <nav
            className="artist-header-thumbnail__socials"
            aria-label={`${title} social links`}
          >
            {visibleSocialLinks.map((socialLink) => {
              const Icon = socialLink.icon;

              return (
                <a
                  key={socialLink.label}
                  className="artist-header-thumbnail__social-link"
                  href={socialLink.href}
                  target="_blank"
                  rel="noreferrer"
                  title={socialLink.label}
                >
                  <Icon
                    aria-hidden="true"
                    className="artist-header-thumbnail__social-icon"
                  />
                  <span className="visually-hidden">{socialLink.label}</span>
                </a>
              );
            })}
          </nav>

          <Link className="artist-header-thumbnail__moments-link" href="/moments" hidden={!props.HasFanMoments}>
            <span>Meet and Greet photos</span>
            <FaArrowRight aria-hidden="true" />
          </Link>
        </section>

        <section
          className="artist-header-thumbnail__included"
          aria-labelledby="artist-header-thumbnail-included-title"
        >
          <h2
            className="artist-header-thumbnail__included-title"
            id="artist-header-thumbnail-included-title"
          >
            What&apos;s included
          </h2>
          <div className="artist-header-thumbnail__included-panel">
            <h3>Meet and Greet</h3>
          </div>
        </section>
      </div>
    </header>
  );
}
