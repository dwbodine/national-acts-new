import { Col, Container, Modal, Row } from 'react-bootstrap';
import { SellerType, VipEvent } from '@/types/public';
import EventRowV2 from '../common/EventRowV2';
import { JSX } from 'react/jsx-runtime';
import { PageProps } from '@/types/props';
import { useState } from 'react';

export default function VenueEventsControl(props: PageProps) {
  const { page } = props;

  const [show, setShow] = useState<boolean>(false);

  const internalDomain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openUrl = (url: string) => {
    const isInternal = url.indexOf(internalDomain) > 0;
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

  const events: VipEvent[] = page?.events ?? [];

  const eventRows: JSX.Element[] = [];
  for (const evt of events) {
    eventRows.push(
      <EventRowV2
        key={evt.externalEventId}
        Event={evt}
        OpenUrl={openUrl}
        SellerType={SellerType.Venue}
      />,
    );
  }

  return (
    <Container className="venueSection">
      <Row>
        <Col>
          <h3 className="upcoming-events">Upcoming Events</h3>
        </Col>
      </Row>
      <Row>
        <Col hidden={eventRows.length > 0} className="no-events">
          No events at this time
        </Col>
        <Col hidden={eventRows.length === 0}>{eventRows}</Col>
      </Row>
      <Row>
        <Col>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="redirect-modal"
          >
            <Modal.Body className="redirect-box-container">
              <div className="redirect-box">
                <div>You are being redirected to an external website</div>
              </div>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
