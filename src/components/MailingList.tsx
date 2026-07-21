"use client";

import { Col, Container, Row } from "react-bootstrap";
import MailingListControls from "./common/MailingListControls";
import { PageProps } from "@/types/props";
import { useEffect } from "react";

export default function MailingList(props: PageProps) {
    const { page } = props;

    useEffect(() => {
        document.title = page?.title;
    }, [page?.title]);

    return (
        <section className="mailListSection">
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <MailingListControls />
                    </Col>
                </Row>
            </Container>
        </section>   
    );
}