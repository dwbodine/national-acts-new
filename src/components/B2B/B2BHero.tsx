type B2BHeroProps = {
  className?: string;
};

export default function B2BHero({ className }: B2BHeroProps) {
  const wrapperClassName = ['b2b-hero', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName} role="img" aria-label="Artists and fans at a live show">
      <img className="b2b-hero__image" src="/images/b2b/hero.webp" alt="" />
    </div>
  );
}
