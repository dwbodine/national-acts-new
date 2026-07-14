"use client";

import ArtistHeaderFullControl from "./ArtistHeaderFullControl";
import { ArtistPageProps } from "@/types/props";
import ArtistsEventsControlV2 from "./ArtistEventsControlV2";


export default function ArtistFullHeader(props: ArtistPageProps) {
    const { page } = props;

	return (
        <section className="artistSection" hidden={!page}>
			<ArtistHeaderFullControl {...props} />
			<ArtistsEventsControlV2 {...props} />
		</section>
	);

}
