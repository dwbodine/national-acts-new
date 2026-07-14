"use client";

import { Col, Container, Modal, Row } from "react-bootstrap";
import { JSX, useState } from "react";
import { PageSeller, SellerType, VipEvent } from "@/types/public";
import ArtistBox from "./ArtistBox";
import { ArtistPageProps } from "@/types/props";
import EventRow from "../common/EventRow";
import parse from 'html-react-parser';


export default function ArtistThumbnailHeader(props: ArtistPageProps) {
    const { page } = props;
    const [show, setShow] = useState<boolean>(false);

    const internalDomain = `${process.env.NEXT_PUBLIC_DOMAIN}`;
    const pageImage = page.image ? `${process.env.NEXT_PUBLIC_HEADERS_URL}${page.image}` : '/images/crowd-web-color.jpg';    

    const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    const openUrl = (url: string) => {
		const isInternal = (url.indexOf(internalDomain) > 0);
		if (isInternal) {
			window.open(url);
		} else {
			handleShow();
			setTimeout(() => {
				window.open(url);
				handleClose();
			}, 1500);
		}
	};

    const artists: PageSeller[] = page?.sellers ?? [];
	const events: VipEvent[] = page?.events ?? [];

	const artistBoxes = [];
    for (const artist of artists) {
		artistBoxes.push(<ArtistBox
			key={`artist_box_${artist.sellerId}`}
			SellerId={artist.sellerId}
			DisplayName={artist.displayName}
			ShowDisplayName={artist.showDisplayName}
			Website={artist.website}
			Facebook={artist.facebook}
			Twitter={artist.twitter}
			Instagram={artist.instagram}
			Youtube={artist.youtube}
			Spotify={artist.spotify}
		/>);
	}

	const eventRows: JSX.Element[] = [];
	for (const evt of events) {
		eventRows.push(<EventRow key={evt.externalEventId} Event={evt} OpenUrl={openUrl} SellerType={SellerType.Artist} />);
	}

	const title1 = page?.title1;
	const title2 = page?.title2;
	const htmlText = page?.htmlText ? parse(page.htmlText) : '';

	return (
        <section className="artistSection" hidden={!page}>
			<Container fluid>
                <Row className="artist-header justify-content-center" hidden={!page.image}>
                    <Col className="artist-image">
                        <img src={pageImage} alt={page.title} /> 
                    </Col>
                </Row>
				<Row className="artist-info-row">
					{artistBoxes}
				</Row>
				<Row className="artist-header">
					<Col>
						<h1 hidden={!title1} className="artist_title_1">{title1}</h1>
						<h2 hidden={!title2} className="artist_title_2">{title2}</h2>
						<h3 hidden={!htmlText} className="artist_text">{htmlText}</h3>
					</Col>
				</Row>
			</Container>
			<Container className="artistSection">
				<Row>
					<Col><h3 className="upcoming-events">Upcoming Events</h3></Col>
				</Row>
				<Row>
					<Col hidden={eventRows.length > 0} className="no-events">No events at this time</Col>
					<Col hidden={eventRows.length === 0}>
						{eventRows}
					</Col>
				</Row>
				<Row>
					<Col>
						<Modal show={show} onHide={handleClose} centered dialogClassName="redirect-modal">
							<Modal.Body className="redirect-box-container">
								<div className="redirect-box">
									<div>You are being redirected to an external website</div>
								</div>
							</Modal.Body>
						</Modal>
					</Col>
				</Row>
			</Container>
		</section>
	);

}
