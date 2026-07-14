"use client";

import ArtistEventsControl from "./ArtistEventsControl";
import ArtistHeaderOriginalControl from "./ArtistHeaderOriginalControl";
import { ArtistPageProps } from "@/types/props";

export default function ArtistOriginal(props: ArtistPageProps) {
    const { page } = props;	

	return (
        <section className="artistSection" hidden={!page}>
			<ArtistHeaderOriginalControl {...props} />
			<ArtistEventsControl {...props} />
		</section>
	);

}
