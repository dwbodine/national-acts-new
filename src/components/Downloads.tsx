"use client";

import { Col, Container, Row } from "react-bootstrap";
import { PageProps } from "@/types/props";
import parse from 'html-react-parser';
import { useEffect } from "react";

export default function Downloads(props: PageProps) {
    const { page } = props;
    
        useEffect(() => {
            document.title = page?.title;
        }, [page?.title]);
    
        const downloads = page?.htmlText ? parse(page.htmlText) : '';

    return (
        <section className="downloadsSection">
            <Container>
                <Row className="downloadsHeader">
                    <Col className="text-center">
                        <h1>Downloads</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <p hidden={!downloads}>{downloads}</p>
                    </Col>
                    <Col sm={12} md={6}>
                        <a href="/na-graphics/logo-long-wt.zip" target="_blank"><img alt="National Acts Vip" src="/na-graphics/logo-long-wt.jpg" /></a>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <a href="/na-graphics/logo1.zip" target="_blank"><img alt="National Acts Logo 1" src="/na-graphics/logo1.jpg" /></a>
                    </Col>
                    <Col sm={12} md={6}>
                        <a href="/na-graphics/logo2.zip" target="_blank"><img alt="National Acts Logo 2" src="/na-graphics/logo2.jpg" /></a>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <a href="/na-graphics/logo3.zip" target="_blank"><img alt="National Acts Logo 3" src="/na-graphics/logo3.jpg" /></a>
                    </Col>
                    <Col sm={12} md={6}>
                        <a href="/na-graphics/logo4.zip" target="_blank"><img alt="National Acts Logo 4" src="/na-graphics/logo4.jpg" /></a>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}