import {
  LuCalendarDays,
  LuChartBar,
  LuCircleDollarSign,
  LuClock3,
  LuGlobe,
  LuLockKeyhole,
  LuMessageSquareText,
  LuMonitor,
  LuPhone,
  LuSparkles,
  LuTrendingUp,
} from 'react-icons/lu';
import { PageProps } from "@/types/props";
import { useEffect } from 'react';

const detailCards = [
  [LuSparkles, 'VIP experience design and package structure'],
  [LuMonitor, 'Ticketing and VIP platform integrations'],
  [LuLockKeyhole, 'Secure payments, fraud protection, and customer support'],
  [LuMessageSquareText, 'Fan communication, check-in, and on-site workflows'],
  [LuCalendarDays, 'Venue coordination and show-day alignment'],
  [LuChartBar, 'Visibility, reporting, and post-show follow-through'],
  [LuGlobe, 'Global coverage, regional compliance, and international currency support'],
  [LuTrendingUp, 'Automatically adapts as routing and markets change'],
] as const;

const accountCards = [
  [LuMonitor, 'A dedicated VIP landing page for all tour dates, event details, and VIP information.'],
  [LuClock3, 'Confirmed VIP dates are entered and placed on sale within 48 hours.'],
  [LuPhone, 'We personally contact every VIP before each show with details and updates.'],
  [LuMessageSquareText, 'Daily contact with your tour manager keeps VIP operations running smoothly.'],
  [LuChartBar, 'Real-time sales, reporting, VIP lists, sizes, and event details are always available.'],
  [LuCircleDollarSign, 'Flexible monthly or end-of-cycle payouts via wire, PayPal, ACH, or Zelle.'],
] as const;

const heroImages = [
  '/images/hero_collage/Lord3.jpg',
  '/images/moments/deathtoall_bg.jpg',
  '/images/hero_collage/Ex1.jpg',
  '/images/moments/lordofthelost_bg.jpg',
  '/images/moments/exodus_bg.jpg',
  '/images/moments/testament_bg.jpg',
  '/images/moments/orpheum_bg.jpg',
  '/images/moments/deathtoall_fg.jpg',
];

const artistCards = [
  ['Death To All', '/images/moments/deathtoall_bg.jpg'],
  ['Exodus', '/images/moments/exodus_bg.jpg'],
  ['Lord of the Lost', '/images/moments/lordofthelost_bg.jpg'],
  ['Testament', '/images/moments/testament_bg.jpg'],
  ['Orpheum', '/images/moments/orpheum_bg.jpg'],
  ['Death To All', '/images/moments/deathtoall_fg.jpg'],
  ['Exodus', '/images/moments/exodus2_bg.jpg'],
  ['Lord of the Lost', '/images/moments/lordofthelost2_bg.jpg'],
  ['Testament', '/images/moments/testament3_bg.jpg'],
  ['National Acts', '/images/crowd-web-color.jpg'],
];

const partnerLogos = [
  ['/images/ticker/ticketmaster.png', 'Ticketmaster'],
  ['/images/ticker/ln-logo-white.svg', 'Live Nation'],
  ['/images/ticker/fm.png', 'FM Music Management'],
  ['/images/ticker/bsa.png', 'BSA'],
  ['/images/ticker/m7ent.png', 'M7 Entertainment'],
  ['/images/ticker/awa.png', 'Artist Worldwide Agency'],
];

export default function OnePager(props: PageProps) {
  const { page } = props;
      
  useEffect(() => {
      document.title = page?.title;
  }, [page?.title]);
      
  return (
    <main className="one-pager">
      <section className="one-pager__hero">
        <div className="one-pager__hero-copy">
          <img className="one-pager__logo" src="/images/logo-long-trans.png" alt="National Acts" />
          <h1>VIP, Built for Touring Reality</h1>
          <p>We design and operate VIP experiences for artists and their teams—without adding friction to the tour.</p>
          <div className="one-pager__hero-stats">
            <span><strong>100,000+</strong>VIP packages sold worldwide</span>
            <span><strong>70+ artists</strong>across a range of genres</span>
            <span><strong>Official partners</strong>of Ticketmaster &amp; Live Nation</span>
          </div>
        </div>
        <div className="one-pager__collage" aria-hidden="true">
          {heroImages.map((image, index) => <img src={image} alt="" key={image + index} />)}
        </div>
      </section>

      <section className="one-pager__partners">
        <p>Trusted by</p>
        <div>{partnerLogos.map(([src, alt]) => <img src={src} alt={alt} key={alt} />)}</div>
      </section>

      <section className="one-pager__section one-pager__details">
        <header><h2>We Handle the Details. You Focus on the Show.</h2><p>National Acts runs VIP end-to-end—so your team isn’t managing logistics, fan communication, payments, or edge cases on the road.</p></header>
        <div className="one-pager__card-grid">
          {detailCards.map(([Icon, text]) => <article key={text}><span><Icon /></span><p>{text}</p></article>)}
        </div>
        <p className="one-pager__callout">If it touches the fan or shows up on show day, it’s already built into the process.</p>
      </section>

      <section className="one-pager__section">
        <h2 className="one-pager__center-title">Comprehensive Software</h2>
        <div className="one-pager__split">
          <img className="one-pager__product-image" src="/images/one-pager/software.webp" alt="VIP management software dashboard" />
          <div className="one-pager__feature-list">
            <article><h3>Track VIP sales and revenue in real time</h3><p>See performance across every date and market from one dashboard.</p></article>
            <article><h3>Access complete VIP purchaser and guest details</h3><p>Keep guest information organized and available to your team.</p></article>
            <article><h3>Streamlined Mobile Check-In</h3><p>Give on-site teams fast, accurate tools for arrivals and fulfillment.</p></article>
            <article><h3>Centralized VIP Data Management</h3><p>Reporting, lists, sizes, and event details stay in one reliable place.</p></article>
          </div>
        </div>
      </section>

      <section className="one-pager__section one-pager__account">
        <h2 className="one-pager__center-title">Account Management</h2>
        <img src="/images/one-pager/account.webp" alt="National Acts account management across devices" />
        <div className="one-pager__card-grid one-pager__card-grid--two">
          {accountCards.map(([Icon, text]) => <article key={text}><span><Icon /></span><p>{text}</p></article>)}
        </div>
      </section>

      <section className="one-pager__section one-pager__bundling">
        <header><h2>Optional Concert Ticket + VIP Bundling</h2><p>Our partnerships support a unified checkout experience while preserving flexible workflows across ticketing platforms.</p></header>
        <div className="one-pager__three-cards">
          <article><h3>Seamless Fan Experience</h3><p>VIP experiences can be bundled directly with standard concert tickets at checkout.</p></article>
          <article><h3>Built for Scale &amp; Conversion</h3><p>Bundled offers leverage platform reach and consistently outperform standalone VIP sales.</p></article>
          <article><h3>Flexible Across Ticketing Systems</h3><p>Alternative platforms are supported through coordinated workflows managed by our team.</p></article>
        </div>
      </section>

      <section className="one-pager__section one-pager__merch">
        <div><article><h2>VIP Merchandise, Simplified</h2><p>We coordinate design, sourcing, production, and fulfillment so merchandise complements the experience.</p></article><article><h2>On-Tour Inventory Support</h2><p>Our team plans quantities, manages logistics, and helps ensure the right items arrive where they need to be.</p></article></div>
        <img src="/images/one-pager/merch.webp" alt="Selection of VIP merchandise" />
      </section>

      <section className="one-pager__process">
        <div className="one-pager__process-bg" aria-hidden="true" />
        <h2>How It Typically Starts</h2>
        <div className="one-pager__steps">
          <article><span>1</span><h3>Align</h3><p>We align on the artist, the tour, and what VIP should—and shouldn’t—be.</p></article>
          <article><span>2</span><h3>Build</h3><p>Packages and logistics are shaped using proven structures, tailored as needed.</p></article>
          <article><span>3</span><h3>Execute</h3><p>We run point on VIP operations while your team runs the tour.</p></article>
        </div>
        <div className="one-pager__model"><h2>A Model Aligned With Performance</h2><p>National Acts does not require upfront fees to launch or operate a VIP program.</p><ul><li>VIP experiences are sold directly to fans</li><li>No upfront costs to the artist or team</li><li>Revenue is shared through percentage-based sales</li><li>No hidden fees or layered markups</li></ul><strong>When VIP performs, everyone benefits—without adding friction to the tour.</strong></div>
      </section>

      <section className="one-pager__section one-pager__artists">
        <h2 className="one-pager__center-title">Artists and Teams We Support</h2>
        <div>{artistCards.map(([name, image]) => <article key={name + image}><img src={image} alt="" /><strong>{name}</strong></article>)}</div>
      </section>

      <section className="one-pager__metrics">
        {[['100,000+', 'VIP experiences delivered'], ['15+ years', 'Operating VIP programs'], ['70+', 'Active artists and teams'], ['Global', 'Touring coverage']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <footer className="one-pager__contact">
        <div><h2>Let’s Talk</h2><p>Get in touch to discuss how we can support your tour.</p></div>
        <address><strong>TJ Chopelas</strong><a href="tel:+19168388986">916-838-8986</a><a href="mailto:tj@national-acts.com">tj@national-acts.com</a><a href="https://national-acts.com">national-acts.com</a></address>
      </footer>
    </main>
  );
}
