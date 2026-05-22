"use client";

import Link from 'next/link';

type VipExperienceProps = {
  className?: string;
};

const vipExperienceMaskA =
  '/images/vipexperience_maskA.svg';
const vipExperienceMaskB =
  '/images/vipexperience_maskB.png';

export default function VipExperience({ className }: VipExperienceProps) {
  const wrapperClassName = ['vip-experience', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-labelledby="vip-experience-title">
      <div className="vip-experience__mask-wrap" aria-hidden="true">
        <span
          className="vip-experience__mask-shape"
          style={
            {
              ['--vip-experience-mask-a' as string]: `url('${vipExperienceMaskA}')`,
              ['--vip-experience-mask-b' as string]: `url('${vipExperienceMaskB}')`,
            } as React.CSSProperties
          }
        />
      </div>

      <span className="vip-experience__ring vip-experience__ring--outer" aria-hidden="true" />
      <span className="vip-experience__ring vip-experience__ring--mid" aria-hidden="true" />
      <span className="vip-experience__ring vip-experience__ring--inner" aria-hidden="true" />
      <span className="vip-experience__bottom-fade" aria-hidden="true" />

      <div className="vip-experience__inner">
        <h2 className="vip-experience__title" id="vip-experience-title">
          Bring Your Concert Experience to Life
        </h2>

        <Link className="vip-experience__button" href="/events">
          Find VIP Experiences
        </Link>
      </div>
    </section>
  );
}
