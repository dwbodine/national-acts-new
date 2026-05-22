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
                    <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={12}>
                        <div className="faq-card" onClick={() => openUrl('https://secure.nationalactsvip.com/my-account')}>
                            <img alt="USA Accounts" src="/images/logo_icon.jpg" />
                            <h3>North America</h3>
                            <p>VIPs for North America</p>
                            <button>Go</button>
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={12}>
                        <div className="faq-card" onClick={() => openUrl('https://europe.nationalactsvip.com/my-account')}>
                            <img alt="Europe Accounts" src="/images/logo_icon.jpg" />
                            <h3>Europe/UK</h3>
                            <p>VIPs and Tix for Europe/UK</p>
                            <button>Go</button>
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={12}>
                        <div className="faq-card" onClick={() => openUrl('https://australia.nationalactsvip.com/my-account')}>
                            <img alt="Australia Accounts" src="/images/logo_icon.jpg" />
                            <h3>Australia</h3>
                            <p>VIPs and Tix for Australia</p>
                            <button>Go</button>
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={12}>
                        <div className="faq-card" onClick={() => openUrl('https://tickets.nationalactsvip.com/my-account')}>
                            <img alt="USA Tickets" src="/images/logo_icon.jpg" />
                            <h3>USA Tickets</h3>
                            <p>Non-VIP Tickets for USA</p>
                            <button>Go</button>
                        </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={12}>
                        <div className="faq-card" onClick={() => openUrl('https://japan.nationalactsvip.com/my-account')}>
                            <img alt="Japan Accounts" src="/images/logo_icon.jpg" />
                            <h3>Japan</h3>
                            <p>VIPs and Tix for Japan</p>
                            <button>Go</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}