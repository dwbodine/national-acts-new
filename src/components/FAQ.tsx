"use client";

import { Col, Container, Row } from "react-bootstrap";
import { FAQType, PageProps } from "@/types/props";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FAQ(props: PageProps) {
    const { page } = props;
    const router = useRouter();

    useEffect(() => {
        document.title = page?.title;
    }, [page?.title]);

    const goToFaq = (faq: FAQType) => {
        const route = faq === FAQType.VIP ? '/faq_vip' : '/faq_general';
        router.push(route);
    }

    return (
        <section className="faqSection">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <h1>Frequently Asked Questions</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xl={4} lg={5} md={6} sm={12}>
                        <div className="faq-card" onClick={() => goToFaq(FAQType.General)}>
                            <img src="/images/logo_icon.jpg" alt="General Questions about Concert Tickets" />
                            <h3>General Questions about Concert Tickets</h3>
                            <button>Read More</button>
                        </div>
                    </Col>
                    <Col xl={4} lg={5} md={6} sm={12}>
                        <div className="faq-card" onClick={() => goToFaq(FAQType.VIP)}>
                            <img src="/images/logo_icon.jpg" alt="General Questions About VIP Meet And Greets" />
                            <h3>General Questions About VIP Meet And Greets</h3>
                            <button>Read More</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}