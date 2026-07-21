'use client';

import ConcertExperiences from './common/ConcertExperiences';
import { PageProps } from '@/types/props';
import VenueEventsControl from './Venue/VenueEventsControl';
import VenueHeader from './Venue/VenueHeader';

export default function Venue(props: PageProps) {
  const { page } = props; 

  return (
    <section className="venueSection" hidden={!page}>
      <VenueHeader {...props} />
      <VenueEventsControl {...props } />
      <ConcertExperiences />
    </section>
  );
}
