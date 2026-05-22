"use client";

import { Col, Container, Row } from "react-bootstrap";
import { PageProps } from "@/types/props";
import parse from 'html-react-parser';
import { useEffect } from "react";

export default function Terms(props: PageProps) {
    const { page } = props;

    useEffect(() => {
        document.title = page?.title;
    }, [page?.title]);

    const terms = page?.htmlText ? parse(page.htmlText) : '';

    return (
        <section className="termsSection">
            <Container>
                <Row>
                    <Col>
                        <h1>Terms of Service</h1>
                        {terms}
                    </Col>
                </Row>
            </Container>
        </section>
    );
}