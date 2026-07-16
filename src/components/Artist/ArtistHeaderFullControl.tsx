'use client';

import { ArtistTitlePosition, PageSeller } from '@/types/public';
import { FaArrowRight, FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF, FaGlobe, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { ArtistPageProps } from '@/types/props';
import Link from 'next/link';
import parse from 'html-react-parser';

type SocialLink = {
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
};

const getPrimaryArtist = (artists: PageSeller[]): PageSeller | undefined =>
  artists.find((artist) => artist.showDisplayName) ?? artists[0];

export default function ArtistHeaderFullControl(props: ArtistPageProps) {
  const { page } = props;
  const artists = page.sellers ?? [];
  const primaryArtist = getPrimaryArtist(artists);
  const pageImage = page.image
    ? `${process.env.NEXT_PUBLIC_HEADERS_URL}${page.image}`
    : '/images/crowd-web-color.jpg';
  const [imageAspectRatio, setImageAspectRatio] = useState<number>();

  useEffect(() => {
    const image = new Image();
    image.onload = () => setImageAspectRatio(image.naturalWidth / image.naturalHeight);
    image.src = pageImage;

    return () => {
      image.onload = null;
    };
  }, [pageImage]);

  const title = page.title1 ?? primaryArtist?.displayName ?? page.title;
  const socialLinks: SocialLink[] = [
    { className: 'icoSpotify', href: primaryArtist?.spotify, icon: FaSpotify, label: 'Spotify' },
    { className: 'icoFacebook', href: primaryArtist?.facebook, icon: FaFacebookF, label: 'Facebook' },
    { className: 'icoInstagram', href: primaryArtist?.instagram, icon: FaInstagram, label: 'Instagram' },
    { className: 'icoTwitter', href: primaryArtist?.twitter, icon: FaXTwitter, label: 'X' },
    { className: 'icoYouTube', href: primaryArtist?.youtube, icon: FaYoutube, label: 'YouTube' },
    { className: 'icoWebsite', href: primaryArtist?.website, icon: FaGlobe, label: 'Website' },
  ];
  const visibleSocialLinks = socialLinks.filter((socialLink) => socialLink.href);

  const vipPackageContents = page.artistPageSettings?.vipPackageContents ?? undefined;
  const artistDescription = page.artistPageSettings?.artistDescription ?? undefined;

  return (
    <header className="artist-header-full-control">
      <div className="artist-header-full-control__inner">
        <section
          className="artist-header-full-control__hero"
          aria-labelledby="artist-header-full-control-title"
          style={{
            aspectRatio: imageAspectRatio,
            backgroundImage: `url(${pageImage})`,
          }}
        >
          <div className="artist-header-full-control__intro">
            <div
              className={`artist-header-full-control__copy ${
                page.artistPageSettings?.titlePosition === ArtistTitlePosition.TOP
                  ? 'artist-header-full-control__copy_top'
                  : 'artist-header-full-control__copy_bottom'
              }`}
            >
              <h1
                className={
                  page.artistPageSettings?.titlePosition === ArtistTitlePosition.TOP
                    ? 'artist-header-full-control__title_top'
                    : 'artist-header-full-control__title_bottom'
                }
                id="artist-header-full-control-title"
                hidden={!page.artistPageSettings?.showTitle}
              >
                {title}
              </h1>
              <p
                className="artist-header-full-control__description"
                hidden={!artistDescription}
              >
                {artistDescription}
              </p>
            </div>
          </div>

          
        </section>
        <section className="artist-header-full-control__socials-container">
          <nav
            className="artist-header-full-control__socials"
            aria-label={`${title} social links`}
          >
            {visibleSocialLinks.map((socialLink) => {
              const Icon = socialLink.icon;

              const className = socialLink.className
                ? `artist-header-thumbnail__social-link ${socialLink.className}`
                : 'artist-header-thumbnail__social-link';

              return (
                <a
                  key={socialLink.label}
                  className={className}
                  href={socialLink.href}
                  target="_blank"
                  rel="noreferrer"
                  title={socialLink.label}
                >
                  <Icon
                    aria-hidden="true"
                    className="artist-header-full-control__social-icon"
                  />
                  <span className="visually-hidden">{socialLink.label}</span>
                </a>
              );
            })}
          </nav>
          <Link
            className="artist-header-full-control__moments-link"
            href="/moments"
            hidden={!props.HasFanMoments}
          >
            <span>Meet and Greet Photos</span>
            <FaArrowRight aria-hidden="true" />
          </Link>
        </section>
        <section
          hidden={!vipPackageContents}
          className="artist-header-full-control__included"
          aria-labelledby="artist-header-full-control-included-title"
        >
          <h2
            className="artist-header-full-control__included-title"
            id="artist-header-full-control-included-title"
          >
            What&apos;s included
          </h2>
          <div className="artist-header-full-control__included-panel">
            {parse(vipPackageContents || '')}
          </div>
        </section>
      </div>
    </header>
  );
}
