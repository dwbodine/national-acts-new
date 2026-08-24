"use client";

import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

type FooterLink = {
  external?: boolean;
  href: string;
  label: string;
};

type SocialLink = {
  ariaLabel: string;
  href: string;
  icon: typeof faFacebook;
};

const logoSrc = '/images/nlogo.png';

const primaryLinks: FooterLink[] = [
  { href: '/', label: 'Home' },
  { href: '/vipclients', label: 'Artists' },
  { href: '/events', label: 'Search Events' },
  { href: '/moments', label: 'Moments' },
  { href: '/faq', label: 'FAQ' },
  { href: '/b2b', label: 'Work With Us' },
  { href: '/contact-us', label: 'Contact Us' },  
];

const secondaryLinks: FooterLink[] = [
  { external: true, href: 'https://users.nationalactsvip.com', label: 'Client Portal' },
  { href: '/contact-us', label: 'Fan support email' },
  {
    external: true,
    href: 'https://stripe.com/docs/security/stripe',
    label: 'Payment encryption security',
  },
];

const legalLinks: FooterLink[] = [
  { href: '/terms', label: 'Terms of Use' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refunds', label: 'Refund Policy' },
];

const socialLinks: SocialLink[] = [
  {
    ariaLabel: 'Facebook',
    href: 'https://www.facebook.com/NationalActs',
    icon: faFacebook,
  },
  {
    ariaLabel: 'Instagram',
    href: 'https://www.instagram.com/nationalactsvip',
    icon: faInstagram,
  },
];

const renderFooterLink = ({ external, href, label }: FooterLink) => {
  if (external) {
    return (
      <a href={href} rel="noreferrer" target="_blank">
        {label}
      </a>
    );
  }

  return <Link href={href}>{label}</Link>;
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__divider" />
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <Link className="site-footer__brand" href="/" aria-label="National Acts home">
            <Image alt="National Acts VIP" src={logoSrc} width={221} height={40} />
          </Link>

          <div className="site-footer__nav-group">
            <ul className="site-footer__link-list site-footer__link-list--primary">
              {primaryLinks.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>

            <ul className="site-footer__link-list site-footer__link-list--secondary">
              {secondaryLinks.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__meta">
            <p>Copyright &copy; {year} National Acts. All rights reserved.</p>
            <p>All transactions secured through Stripe Payments with bank-level encryption.</p>
          </div>

          <ul className="site-footer__legal-list">
            {legalLinks.map((link) => (
              <li key={link.label}>{renderFooterLink(link)}</li>
            ))}
          </ul>

          <div className="site-footer__socials">
            {socialLinks.map((link) => (
              <a
                key={link.ariaLabel}
                aria-label={link.ariaLabel}
                className="site-footer__social-link"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
