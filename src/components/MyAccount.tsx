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
        <section className="my-account-section">
            <Container fluid>
                <Row>
                    <Col className="my-account-title">
                        <h1>My Account</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div title="USA Accounts" className="my-account-card" onClick={() => openUrl('https://secure.nationalactsvip.com/my-account')}>
                            <h3>North America</h3>
                            <p>VIPs for North America</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div title="Europe Accounts" className="my-account-card" onClick={() => openUrl('https://europe.nationalactsvip.com/my-account')}>
                            <h3>Europe/UK</h3>
                            <p>VIPs for Europe/UK</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div title="Australia Accounts" className="my-account-card" onClick={() => openUrl('https://australia.nationalactsvip.com/my-account')}>
                            <h3>Australia</h3>
                            <p>VIPs for Australia</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div title="USA Tickets" className="my-account-card" onClick={() => openUrl('https://tickets.nationalactsvip.com/my-account')}>
                            <h3>USA Tickets</h3>
                            <p>Non-VIP Tickets for USA</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div title="Japan Accounts" className="my-account-card" onClick={() => openUrl('https://japan.nationalactsvip.com/my-account')}>
                            <h3>Japan</h3>
                            <p>VIPs for Japan</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}