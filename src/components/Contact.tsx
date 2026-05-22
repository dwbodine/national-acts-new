"use client";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { EmailMessage } from "@/types/public";
import { GetContactMessageResponse } from "@/types/responses";
import Link from "next/link";
import { PageProps } from "@/types/props";
import moment from "moment";
import { toast } from "react-toastify";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useSendContactEmail } from "@/hooks/useSendContactEmail";

export default function Contact(props: PageProps) {
    const { page } = props;
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const { sendContactEmail } = useSendContactEmail();

    const { executeRecaptcha } = useGoogleReCaptcha();

    const contactEmail = `${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`;

    const [name, setName] = useState<string | undefined>('');
    const [bandName, setBandName] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');
    const [subject, setSubject] = useState<string | undefined>('');
    const [eventDate, setEventDate] = useState<string | undefined>('');
    const [venue, setVenue] = useState<string | undefined>('');
    const [message, setMessage] = useState<string | undefined>('');

    useEffect(() => {
        document.title = page?.title;
    }, [page?.title]);

    const validateEmail = (eml: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(eml);
    }

    const validateForm = () => {
        if (!name) {
            toast.warning("Name is required");
            return false;
        }
        if (!email) {
            toast.warning("Email is required");
            return false;
        }
        if (!bandName) {
            toast.warning("Band Name is required");
            return false;
        }
        if (!validateEmail(email)) {
            toast.warning("Must enter a valid email address");
            return false;
        }
        if (!subject) {
            toast.warning("Subject is required");
            return false;
        }
        if (!venue) {
            toast.warning("Venue Name is required");
            return false;
        }
        if (!eventDate) {
            toast.warning("Event Date is required");
            return false;
        }
        if (!message) {
            toast.warning("Message is required");
            return false;
        }
        return true;
    }

    const sendMessage = () => {
        if (!validateForm()) {
            return;
        }

        let htmlMsg: string = "<html><body>";
        htmlMsg += `<p><b>Full name:</b> ${name}</p>`;
        htmlMsg += `<p><b>Email:</b> ${email}</p>`;
        htmlMsg += `<p><b>Band Name:</b> ${bandName}</p>`;
        htmlMsg += `<p><b>Subject:</b> ${subject}</p>`;
        htmlMsg += `<p><b>Date of Event:</b> ${moment(eventDate).format('MM/DD/YYYY')}</p>`;
        htmlMsg += `<p><b>Venue:</b> ${venue}</p>`;
        htmlMsg += `<p><b>Message:</b> ${message}</p>`;
        htmlMsg += "</body></html>";

        const emailMsg: EmailMessage = {
            fromName: `National Acts VIP`,
            html: htmlMsg,
            replyTo: email,
            replyToName: name,
            subject: `New Inquiry From - ${name} - ${email}`,
            to: contactEmail,
            toName: `National Acts VIP`,
        };

        sendContactEmail(emailMsg).then((response: GetContactMessageResponse) => {
            if (response.error) {
                toast.error(response.error);
            } else {
                setEmailSent(true);
            }
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            return;
        }

        const token = await executeRecaptcha('signup');

        const res = await fetch('/api/verify-recaptcha', {
            body: JSON.stringify({ token }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        })

        const data = await res.json();

        if (data.success) {
            sendMessage();
        } else {
            toast.error('Unable to verify sender');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Container className="contactSection" hidden={emailSent}>
                    <Row>
                        <Col className="contact-header">
                            <h1>Contact Us</h1>
                            <p>Thank you for contacting National Acts Customer Support.<br />
                                Please complete the form below so we can provide quick and efficient service.</p>
                            <p>PLEASE DO NOT EMAIL US ABOUT MEET AND GREET TIMES! WE WILL REACH OUT TO EVERYONE ONCE THE BAND HAS CONFIRMED THE TIME.</p>
                            <p>For your convenience we have a very extensive FAQ section that can answer most questions.<br />
                                <Link href="/faq">CLICK HERE</Link></p>
                            <p>Please note that ALL tickets and VIP Packages are sold on a final sale basis and are nonrefundable unless a show has been canceled.</p>
                            <p>All service fees are nonrefundable for any reason, including a show cancelation.</p>
                            <p>We will not respond to Refund requests outside of a show cancelation.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12} className="form-cell">
                            <label>Name:</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                required
                                type="text"
                            />
                        </Col>
                        <Col md={6} sm={12} className="form-cell">
                            <label>Email:</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                                type="email"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12} className="form-cell">
                            <label>Subject:</label>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="form-control"
                                required
                                type="text"
                            />
                        </Col>
                        <Col md={6} sm={12} className="form-cell">
                            <label>Band Name:</label>
                            <input
                                value={bandName}
                                onChange={(e) => setBandName(e.target.value)}
                                className="form-control"
                                required
                                type="text"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12} className="form-cell">
                            <label>Venue Name:</label>
                            <input
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                className="form-control"
                                required
                                type="text"
                            />
                        </Col>
                        <Col md={6} sm={12} className="form-cell">
                            <label>Event Date:</label>
                            <Form.Control
                                type="date"
                                id="eventDate"
                                onChange={(e) => setEventDate(e.currentTarget.value)}
                                required
                                value={eventDate}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Message:</label>
                            <Form.Control as="textarea"
                                rows={3}
                                id="message"
                                onChange={(e) => setMessage(e.currentTarget.value)}
                                required
                                value={message}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <Button type="submit" className="contact-header-submit-button">Submit</Button>

                        </Col>
                    </Row>
                </Container>
            </form>
            <Container className="contactSection" hidden={!emailSent}>
                <Row className="justify-content-center">
                    <Col className="contact-section-response">
                        <h1>Hi there!</h1>
                        <p>We have received your message.  We typically respond to all requests within 24 hours.<br />For your convenience we have a very extensive &quot;Frequently Asked Questions&quot; (FAQ) section that can answer most of your questions.</p>
                        <p>Please note...due to policies defined by our clients, National Acts is prohibited from issuing refunds after a purchase has been made.<br />All sales are final.</p>
                        <p>Visit our Frequently Asked Questions Page <Link href="/faq">here</Link>.</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
