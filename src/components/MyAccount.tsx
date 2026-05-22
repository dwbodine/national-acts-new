"use client";

import { Col, Container, Row } from "react-bootstrap";
import { PageProps } from "@/types/props";
import { useEffect } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";


export default function MyAccount(props: PageProps) {
    const { page } = props;
    const windowSize = useWindowSize();

    useEffect(() => {
        document.title = page?.title;
    }, [page?.title]);

    const usaTitle = page?.title1 || "USA";
    const usaText = page?.subtitle1 || "";

    const europeTitle = page?.title2 || "Europe";
    const europeText = page?.subtitle2 || "";

    const openUrl = (url: string) => {
        if (windowSize.isMobile) {
            window.location.href = url;
        } else {
            window.open(url);
        }
    };

    return (
        <section className="faqSection">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <h1>My Account</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xl={4} lg={5} md={6} sm={12}>
                        <div className="faq-card" onClick={() => openUrl('https://secure.nationalactsvip.com/my-account')}>
                            <img alt="USA Accounts" src="/images/logo_icon.jpg" />
                            <h3>{usaTitle}</h3>
                            <p hidden={!usaText}>{usaText}</p>
                            <button>Go</button>
                        </div>
                    </Col>
                    <Col xl={4} lg={5} md={6} sm={12}>
                        <div className="faq-card" onClick={() => openUrl('https://europe.nationalactsvip.com/my-account')}>
                            <img alt="Europe Accounts" src="/images/logo_icon.jpg" />
                            <h3>{europeTitle}</h3>
                            <p hidden={!europeText}>{europeText}</p>
                            <button>Go</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}