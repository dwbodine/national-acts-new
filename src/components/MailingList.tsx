"use client";

import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { PageProps } from "@/types/props";
import parse from 'html-react-parser';
import { toast } from "react-toastify";

export default function MailingList(props: PageProps) {
    const { page } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        document.title = page?.title;
    }, [page?.title]);

    const validateEmail = (eml: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(eml);
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            toast.warning("Name is required");
            return false;
        }
        if (!email) {
            toast.warning("Email is required");
            return false;
        }
        if (!validateEmail(email)) {
            toast.warning("Must enter a valid email address");
            return false;
        }

        const data = {
            email,
            name,
        };

        const res = await fetch('/api/sendy-subscribe', {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        });

        const response = await res.json();

        if (response.success) {
            toast.success('Suscribed successfully');
        } else {
            toast.error(response.message ? response.message : 'Subscribe not successful - contact us for help');
        }

        return response.success;
    };


    return (
        <section className="mailListSection">
            <Container>
                <Row>
                    <Col>
                        <form acceptCharset="utf-8" onSubmit={submitForm}>
                            <Container>
                                <Row>
                                    <Col className="text-center contact-header">
                                        <h1><img alt="" src="/images/logo-new.png" width="300" className="mailingListLogo" /></h1>
                                        <p hidden={!page?.htmlText}>{page.htmlText ? parse(page.htmlText) : ''}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className="form-cell">
                                                <label htmlFor="name">Name</label><br />
                                                <input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="form-cell">
                                                <label htmlFor="email">Email</label><br />
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control"
                                                    type="email"
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <input type="submit" id="btnSubmit" value="Sign me up!" />
                                    </Col>
                                </Row>
                            </Container>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center contact-header">
                        <p><b>And don&apos;t forget to check out our social media sites below!</b></p>
                        <p style={{ fontSize: '3em' }}>
                            <a href="https://www.facebook.com/NationalActs" target="_blank"><FaFacebook /></a>&nbsp;
                            <a href="https://www.instagram.com/nationalactsvip/" target="_blank"><FaInstagram /></a>&nbsp;
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>   
    );
}