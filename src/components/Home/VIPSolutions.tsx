"use client";

import Link from 'next/link';
import { MouseEvent } from 'react';

type VipSolutionItem = {
  title: string;
};

type VIPSolutionsProps = {
  className?: string;
  onPartnerWithUsClick?: () => void;
};

const vipSolutionsBackground =
  'images/vip_solutions.jpg';

const vipSolutionsItems: VipSolutionItem[] = [
  {
    title: 'VIP package design & management',
  },
  {
    title: 'Payment & ticketing infrastructure',
  },
  {
    title: 'On-site ops & access control',
  },
  {
    title: 'Fan capture, data, and post-show engagement',
  },
];

export default function VIPSolutions({ className, onPartnerWithUsClick }: VIPSolutionsProps) {
  const wrapperClassName = ['vip-solutions', className].filter(Boolean).join(' ');

  const handlePartnerWithUsClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (!onPartnerWithUsClick) {
        return;
      }
  
      event.preventDefault();
      onPartnerWithUsClick();
    };

  return (
    <section className={wrapperClassName} aria-labelledby="vip-solutions-title">
      <div className="vip-solutions__bg" aria-hidden="true">
        <img className="vip-solutions__bg-image" src={vipSolutionsBackground} alt="" />
        <div className="vip-solutions__bg-overlay" />
      </div>

      <div className="vip-solutions__inner">
        <div className="vip-solutions__copy">
          <p className="vip-solutions__eyebrow">
            For talent, management companies &amp; record labels
          </p>
          <h2 className="vip-solutions__title" id="vip-solutions-title">
            Professional VIP Solutions for Live Entertainment
          </h2>
        </div>

        <div className="vip-solutions__grid">
          {vipSolutionsItems.map((item) => (
            <article key={item.title} className="vip-solutions__card">
              <p className="vip-solutions__card-title">{item.title}</p>
            </article>
          ))}
        </div>

        <div className="vip-solutions__footer">
          <div className="vip-solutions__actions">
            <Link className="vip-solutions__button vip-solutions__button--primary" href="#" onClick={handlePartnerWithUsClick}>
              Partner With Us
            </Link>
            <Link
              className="vip-solutions__button vip-solutions__button--secondary"
              href="/b2b"
            >
              See Artist Experience Solutions
            </Link>
          </div>
          <p className="vip-solutions__note">
            National Acts supports artists, management companies &amp; record labels
          </p>
        </div>
      </div>
    </section>
  );
}
