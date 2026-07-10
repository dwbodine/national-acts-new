'use client';

type AvatarCard = {
  alt: string;
  className: string;
  image: string;
};

type HeroBottomProps = {
  className?: string;
};

type StatItem = {
  description: string;
  modifier?: string;
  title: string;
};

const avatarCards: AvatarCard[] = [
  {
    alt: 'Lord of the Lost',
    className: 'hero-bottom__avatar-card--left',
    image: '/images/hero_collage/Lord3.jpg',
  },
  {
    alt: 'Exodus',
    className: 'hero-bottom__avatar-card--center',
    image: '/images/hero_collage/Ex1.jpg',
  },
  {
    alt: 'Lord of the Lost',
    className: 'hero-bottom__avatar-card--right',
    image: '/images/hero_collage/Lord2.jpg',
  },
];

const statItems: StatItem[] = [
  {
    description: 'VIP Packages sold worldwide',
    title: '100,000+',
  },
  {
    description: 'across a range of genres',
    modifier: 'hero-bottom__stat--bordered',
    title: 'Over 70+ artists',
  },
  {
    description: 'of Ticketmaster & Live Nation',
    modifier: 'hero-bottom__stat--bordered',
    title: 'Official Partners',
  },
];

export default function HeroBottom({ className }: HeroBottomProps) {
  const wrapperClassName = ['hero-bottom', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName} data-name="Bottom">
      <div className="hero-bottom__avatars" data-name="avatar">
        {avatarCards.map((card) => (
          <div
            key={card.className}
            className={`hero-bottom__avatar-card ${card.className}`}
            role="img"
            aria-label={card.alt}
            style={{
              backgroundImage: `url(${card.image})`,
            }}
          />
        ))}
      </div>

      <div className="hero-bottom__stats">
        {statItems.map((item) => (
          <div
            key={item.title}
            className={['hero-bottom__stat', item.modifier].filter(Boolean).join(' ')}
          >
            <p className="hero-bottom__stat-title">{item.title}</p>
            <p className="hero-bottom__stat-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
