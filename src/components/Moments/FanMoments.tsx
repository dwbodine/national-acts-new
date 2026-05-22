import { Col, Container, Row } from "react-bootstrap";
import MomentsButton from "./MomentsButton";
import MomentsFilter from "./MomentsFilter";
import MomentsHeader from "./MomentsHeader";
import MomentsPhotoViewer from "./MomentsPhotoViewer";

export default function FanMoments() {
    return (
        <section className="fan-moments-section">
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <MomentsHeader />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <MomentsFilter />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <MomentsPhotoViewer />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <MomentsButton />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}