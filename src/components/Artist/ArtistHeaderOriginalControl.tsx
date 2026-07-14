
import { Col, Container, Row } from 'react-bootstrap';
import ArtistBox from './ArtistBox';
import { ArtistPageProps } from '@/types/props';
import { PageSeller } from '@/types/public';
import parse from "html-react-parser";



export default function ArtistHeaderOriginalControl(props: ArtistPageProps) {
  const { page } = props;
  const pageImage = page.image ? `${process.env.NEXT_PUBLIC_HEADERS_URL}${page.image}` : '/images/crowd-web-color.jpg';  

  const artists: PageSeller[] = page?.sellers ?? [];
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

  const title1 = page?.title1;
    const title2 = page?.title2;
    const htmlText = page?.htmlText ? parse(page.htmlText) : '';

  return (
    <Container fluid>
      <Row className="artist-header justify-content-center" hidden={!page.image}>
        <Col className="artist-image">
          <img src={pageImage} alt={page.title} />
        </Col>
      </Row>
      <Row className="artist-info-row">{artistBoxes}</Row>
      <Row className="artist-header">
        <Col>
          <h1 hidden={!title1} className="artist_title_1">
            {title1}
          </h1>
          <h2 hidden={!title2} className="artist_title_2">
            {title2}
          </h2>
          <h3 hidden={!htmlText} className="artist_text">
            {htmlText}
          </h3>
        </Col>
      </Row>
    </Container>
  );
}
