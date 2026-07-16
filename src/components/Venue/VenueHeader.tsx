'use client';

import { ArtistBoxProps, PageProps } from '@/types/props';
import { FaFacebookF, FaGlobe, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { PageSeller } from '@/types/public';
import parse from 'html-react-parser';
import { useGetDisplayAddress } from '@/hooks/useGetDisplayAddress';

type SocialLink = {
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const getPrimaryVenue = (venues: PageSeller[]): PageSeller | undefined =>
  venues.find((venue) => venue.showDisplayName) ?? venues[0];

export default function VenueHeader(props: PageProps) {
    const { page } = props;
    const { getDisplayAddress } = useGetDisplayAddress();
  const venue = getPrimaryVenue(page.sellers ?? []);
  const title = page.title1 ?? venue?.displayName ?? page.title;
  const gradientStartColor = page.gradientStartColor ?? undefined;
  const pageImage = page.image
    ? `${process.env.NEXT_PUBLIC_HEADERS_URL}${page.image}`
    : '/images/crowd-web-color.jpg';
  const socialLinks: SocialLink[] = [
    { href: venue?.website, icon: FaGlobe, label: 'Website' },
    { href: venue?.facebook, icon: FaFacebookF, label: 'Facebook' },
    { href: venue?.instagram, icon: FaInstagram, label: 'Instagram' },
    { href: venue?.twitter, icon: FaXTwitter, label: 'X' },
    { href: venue?.youtube, icon: FaYoutube, label: 'YouTube' },
    { href: venue?.spotify, icon: FaSpotify, label: 'Spotify' },
  ].filter((socialLink) => socialLink.href);

  const boxProps: ArtistBoxProps = {
    Address: venue?.address,
    City: venue?.city,
    Country: venue?.country?.countryName ?? '',
    Email: venue?.email,
    Phone: venue?.phone,
    SellerId: 0,
    State: venue?.state,
    Zip: venue?.zip,
    key: '',
  };

  const addressBlock = getDisplayAddress(boxProps);

  return (
    <header className="venue-header">
      <div
        className="venue-header__hero"
        style={{
          background: `linear-gradient(180deg, #${gradientStartColor} 0%, #0c0c0c 87%), #0c0c0c`,
        }}
      >
        <div className="venue-header__intro">
          <img className="venue-header__image" src={pageImage} alt="" />

          <div className="venue-header__copy">
            <h1 className="venue-header__title">{title}</h1>
            {addressBlock && (
              <div className="venue-header__description">{parse(addressBlock)}</div>
            )}
          </div>
        </div>        
      </div>
      {socialLinks.length > 0 && (
          <nav className="venue-header__socials" aria-label={`${title} social links`}>
            {socialLinks.map((socialLink) => {
              const Icon = socialLink.icon;

              return (
                <a
                  key={socialLink.label}
                  className="venue-header__social-link"
                  href={socialLink.href}
                  target="_blank"
                  rel="noreferrer"
                  title={socialLink.label}
                >
                  <Icon className="venue-header__social-icon" aria-hidden="true" />
                  <span className="visually-hidden">{socialLink.label}</span>
                </a>
              );
            })}
          </nav>
        )}
    </header>
  );
}
