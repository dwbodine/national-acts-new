import { Col, Container, Row } from 'react-bootstrap';
import B2BHero from './B2B/B2BHero';
import BuiltForTouring from './B2B/BuiltForTouring';
import Focus from './B2B/Focus';
import HeroBottom from './common/HeroBottom';
import HomeTicker from './common/HomeTicker';
import Process from './B2B/Process';
import Starts from './B2B/Starts';
import TouringMoves from './B2B/TouringMoves';
import TouringReality from './B2B/TouringReality';
import WhatMakesSense from './B2B/WhatMakesSense';


export default function B2B() {
  return (
    <>
      <section className="b2bSection">
        <Container fluid>
          <div className="b2b-intro">
            <div className="b2b-intro__copy">
              <TouringReality />
            </div>
            <div className="b2b-intro__visual">
              <B2BHero />
            </div>
            <div className="b2b-intro__stats">
              <HeroBottom />
            </div>
          </div>
          <Row>
            <Col xs={12}>
              <HomeTicker className="b2b-home-ticker" logoSetRepeats={2} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <BuiltForTouring />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Focus />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Process />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TouringMoves />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Starts />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WhatMakesSense />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
