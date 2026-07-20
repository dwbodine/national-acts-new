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
import HeroBottom from './common/HeroBottom';
import HomeTicker from './common/HomeTicker';
import { PageProps } from '@/types/props';
import { useEffect } from 'react';

const detailCards = [
  [LuSparkles, 'VIP experience design and package structure'],
  [LuMonitor, 'Ticketing and VIP platform integrations'],
  [LuLockKeyhole, 'Secure payments, fraud protection, and customer support'],
  [LuMessageSquareText, 'Fan communication, check-in, and on-site workflows'],
  [LuCalendarDays, 'Venue coordination and show-day alignment'],
  [LuChartBar, 'Visibility, reporting, and post-show follow-through'],
  [
    LuGlobe,
    'Global tour coverage with built-in regional compliance and international currency support',
  ],
  [LuTrendingUp, 'Automatically expands and adapts as tour routing and markets change'],
] as const;

const accountCards = [
  [
    LuMonitor,
    'We build you a dedicated VIP landing page ',
    'that hosts all tour dates, event details, and VIP information in one place.',
  ],
  [
    LuClock3,
    'VIP dates are entered into our system and placed on sale within 48 hours ',
    'of receiving your confirmed tour itinerary.',
  ],
  [
    LuPhone,
    'We personally contact every VIP before each show ',
    'to confirm details, provide updates, and answer any questions about their experience.',
  ],
  [
    LuMessageSquareText,
    'We stay in daily contact with your tour manager or band representative ',
    'to share critical updates and ensure VIP operations run smoothly.',
  ],
  [
    LuChartBar,
    'Access real-time VIP sales data through our admin dashboard, ',
    'including reporting, VIP lists, T-shirt sizes, and other event details at any time.',
  ],
  [
    LuCircleDollarSign,
    'Choose flexible payout timing and methods, ',
    'with monthly or end-of-cycle payouts and payment options including wire transfer, PayPal, ACH direct deposit, or Zelle™.',
  ],
] as const;

const heroImages = [
  '/images/hero_collage/Lord3.jpg',
  '/images/moments/deathtoall_bg.jpg',
  '/images/moments/orpheum_bg.jpg',
  '/images/hero_collage/Ex1.jpg',
  '/images/moments/lordofthelost_bg.jpg',
  '/images/moments/exodus_bg.jpg',
  '/images/moments/testament_bg.jpg',
  '/images/moments/deathtoall_fg.jpg',
  '/images/moments/lordofthelost2_bg.jpg',
  '/images/moments/exodus2_bg.jpg',
  '/images/moments/testament3_bg.jpg',
  '/images/crowd-web-color.jpg',
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
          <img
            className="one-pager__logo"
            src="/images/logo-long-trans.png"
            alt="National Acts"
          />
          <h1>VIP, Built for Touring Reality</h1>
          <p>
            We design and operate VIP experiences for artists and their teams—without
            adding friction to the tour.
          </p>
          <HeroBottom />
        </div>
        <div className="one-pager__collage" aria-hidden="true">
          {heroImages.map((image, index) => (
            <img src={image} alt="" key={image + index} />
          ))}
        </div>
      </section>

      <HomeTicker className="b2b-home-ticker" logoSetRepeats={2} />

      <section className="one-pager__section one-pager__details">
        <header>
          <h2>We Handle the Details. You Focus on the Show.</h2>
          <p>
            National Acts runs VIP end-to-end—so your team isn&apos;t managing fan
            communication, payments, logistics, or show-day edge cases while also running
            a tour.
          </p>
        </header>
        <div className="one-pager__card-grid">
          {detailCards.map(([Icon, text]) => (
            <article key={text}>
              <span>
                <Icon />
              </span>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="one-pager__callout">
          If it touches the fan or shows up on show day, it&amp;s already built into the
          process.
        </p>
      </section>

      <section className="one-pager__section one-pager__software">
        <h2 className="one-pager__center-title">Comprehensive Software</h2>
        <div className="one-pager__split">
          <div className="one-pager__product-mockup">
            <img
              className="one-pager__product-monitor"
              src="/images/one-pager/software-monitor.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="one-pager__product-image"
              src="/images/one-pager/software.webp"
              alt="VIP management software dashboard"
            />
          </div>
          <div className="one-pager__feature-list">
            <article>
              <h3>Track VIP sales and revenue in real time</h3>
              <p>
                for all upcoming events (24/7, 365) from any desktop or mobile device.
              </p>
            </article>
            <article>
              <h3>Access complete VIP purchaser and guest details</h3>
              <p>
                ahead of meet &amp; greets, including names, shirt sizes, contact info,
                and pricing tiers.
              </p>
            </article>
            <article>
              <h3>Streamlined Mobile Check-In</h3>
              <p>
                Check guests in directly from your phone - no printed lists, no manual
                cross-referencing. Instantly verify purchasers, track arrivals in real
                time, and manage VIP flow from anywhere on-site.
              </p>
            </article>
            <article>
              <h3>Centralized VIP Data Management</h3>
              <p>
                Maintain complete purchaser and guest records across events, tours, and
                markets — organized, searchable, and export-ready.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="one-pager__section one-pager__account">
        <h2 className="one-pager__center-title">Account Management</h2>
        <img
          src="/images/one-pager/Boom.png"
          alt="National Acts account management across devices"
        />
        <div className="one-pager__account-grid">
          {accountCards.map(([Icon, lead, detail]) => (
            <article key={lead}>
              <span>
                <Icon />
              </span>
              <p>
                <strong>{lead}</strong>
                {detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="one-pager__section one-pager__bundling">
        <header>
          <h2>Optional Concert Ticket + VIP Bundling</h2>
          <div className="one-pager__bundling-logos">
            <img src="/images/one-pager/ticketmaster-white.png" alt="Ticketmaster" />
            <img src="/images/one-pager/live-nation-white.png" alt="Live Nation" />
          </div>
          <p>
            Custom design, production, and fulfillment through trusted partners—built
            specifically for touring artists and VIP programs.
          </p>
        </header>
        <div className="one-pager__three-cards">
          <article>
            <h3>Seamless Fan Experience</h3>
            <p>
              Through our partnership with Ticketmaster and Live Nation, VIP experiences
              can be bundled directly with standard concert tickets at checkout.
            </p>
          </article>
          <article>
            <h3>Built for Scale &amp; Conversion</h3>
            <p>
              Bundled offers operate within Ticketmaster&amp;s commercial framework and
              consistently outperform standalone VIP sales, leveraging platform reach and
              built-in demand.
            </p>
          </article>
          <article>
            <h3>Flexible Across Ticketing Systems</h3>
            <p>
              For venues using alternative ticketing platforms, VIP bundling is supported
              through coordinated workflows managed by our team.
            </p>
          </article>
        </div>
      </section>

      <section className="one-pager__section one-pager__merch">
        <div className="one-pager__merch-copy">
          <article>
            <h2>VIP Merchandise, Simplified</h2>
            <p>
              Custom design, production, and fulfillment through trusted partners—built
              specifically for touring artists and VIP programs.
            </p>
          </article>
          <article>
            <h2>On-Tour Inventory Support</h2>
            <p>
              Mid-tour restocks and direct delivery ensure consistent availability,
              streamlined logistics, and uninterrupted VIP revenue.
            </p>
          </article>
        </div>
        <div className="one-pager__merch-image">
          <img src="/images/one-pager/merch.png" alt="Selection of VIP merchandise" />
        </div>
      </section>

      <section className="one-pager__process">
        <div className="one-pager__process-bg" aria-hidden="true" />
        <h2>How It Typically Starts</h2>
        <div className="one-pager__steps">
          <article>
            <span>1</span>
            <div>
              <h3>Align</h3>
              <p>
                We align with the artist, the tour, and what VIP should—and
                shouldn&apos;t—be.
              </p>
            </div>
          </article>
          <article>
            <span>2</span>
            <div>
              <h3>Build</h3>
              <p>
                Packages and logistics are shaped using proven structures, tailored to the
                artist and the run.
              </p>
            </div>
          </article>
          <article>
            <span>3</span>
            <div>
              <h3>Execute</h3>
              <p>We run point on VIP operations while your team runs the tour.</p>
            </div>
          </article>
        </div>
        <div className="one-pager__model">
          <header>
            <h2>A Model Aligned With Performance</h2>
            <p>
              National Acts does not require upfront fees to launch VIP. Our model is
              designed to align incentives and remove operational risk.
            </p>
          </header>
          <ul>
            <li>VIP experiences are sold directly to fans</li>
            <li>No upfront costs to the artist or team</li>
            <li>Revenue is shared through percentage-based sales</li>
            <li>No hidden fees, backend surprises, or layered markups</li>
          </ul>
          <strong>
            When VIP performs, everyone benefits—without adding friction to the tour.
          </strong>
        </div>
      </section>

      <section className="one-pager__metrics">
        <span className="one-pager__metrics-watermark" aria-hidden="true">
          n
        </span>
        <div className="one-pager__metrics-grid">
          {[
            ['100,000+', 'VIP experiences delivered'],
            ['15+ years', 'Operating VIP programs'],
            ['70+', 'Active artists and teams'],
            ['Global', 'Touring coverage'],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="one-pager__contact">
        <div className="one-pager__contact-copy">
          <h2>Let&apos;s Talk</h2>
          <p>Get in touch to discuss how we can support your tour.</p>
        </div>
        <address>
          <strong>TJ Chopelas</strong>
          <a href="tel:+19165428424">
            <span aria-hidden="true">📞</span>916-542-8424
          </a>
          <a href="mailto:info@nationalactsvip.com">
            <span aria-hidden="true">✉️</span>info@nationalactsvip.com
          </a>
          <a href="https://nationalactsvip.com">
            <span aria-hidden="true">🌐</span>nationalactsvip.com
          </a>
        </address>
      </footer>
    </main>
  );
}
