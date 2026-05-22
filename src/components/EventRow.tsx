"use client";

import { Col, Row } from "react-bootstrap";
import { FaCalendar, FaMapMarker } from "react-icons/fa";
import { EventRowProps } from "@/types/props";
import { MouseEvent } from "react";
import { SellerType } from "@/types/public";
import moment from "moment";

export default function EventRow(props: EventRowProps) {
    const eventRow = props.Event;
    const onOpenUrl = props.OpenUrl;    
    const sellerType = props.SellerType;
    const isVenue = sellerType === SellerType.Venue;

    const openUrl = (e: MouseEvent<HTMLAnchorElement>, url: string | undefined, isDisabled: boolean) => {
        e.preventDefault();
        if (!url || isDisabled) {
            e.stopPropagation();
            return;
        }
        if (onOpenUrl) {
            onOpenUrl(url);
        }
    };

    const date: moment.Moment | undefined = eventRow ? moment(eventRow.eventDate) : undefined;
    let eventTime: string = "";
    if (eventRow?.eventTime) {
        eventTime = moment(eventRow.eventTime).format('h:mm A');
        if (eventRow.venue?.timezone) {
            eventTime = `${eventTime} ${eventRow.venue.timezone}`;
        }
    }

    let eventDate: string = '';
    if (date) {
        eventDate = date.format('M/D/YYYY');
        if (eventTime) {
            eventDate = `${eventDate} ${eventTime}`;
        }
    }

    let thumb: string = `/images/logo_icon.jpg`;
    if (eventRow?.thumbnail && eventRow.thumbnail.length > 4) {
        if (eventRow.thumbnail.startsWith('http')) {
            thumb = eventRow.thumbnail;
        } else {
            thumb = `${process.env.NEXT_PUBLIC_THUMBNAILS_URL}${eventRow.thumbnail}`;
        }
    }

    let title: string = eventRow?.title ?? '';

    const ticketUrl: string = eventRow?.externalUrl?.trim() ?? "";
    let vipUrl: string = "";
    if (eventRow?.externalVipLink && eventRow.externalVipLink.trim().length > 0) {
        vipUrl = eventRow.externalVipLink;
    }
    else if (eventRow?.ticketSocketUrl && eventRow.ticketSocketUrl.trim().length > 0) {
        vipUrl = eventRow.ticketSocketUrl;
    }

    const ticketDisabled: boolean = eventRow?.disableLinkButton ?? false;
    let vipDisabled: boolean = eventRow?.disableVipLinkButton ?? false;

    let vipStyle: string = "";
    let vipText: string = isVenue ? "Tickets" : "VIP";
    let vipTextLeftPadding: number = isVenue ? 1.5 : 3.8;
    let vipTextRightPadding: number = isVenue ? 1.5 : 2.2;
    let ticketStyle: string = "";
    let ticketText: string = "Tickets";
    let ticketTextPadding: number = 4;

    if (eventRow?.isSoldOut ?? false) {
        vipDisabled = true;
        title = `${title} - SOLD OUT`;
        vipText = "SOLD OUT";
        const len = vipText.length;
        vipTextLeftPadding = isVenue ? 1 : (3.8 - ((len - 3) * 0.3));
        vipTextRightPadding = isVenue ? 1 : (2.2 - ((len - 3) * 0.3));
    } else if (!isVenue && (eventRow?.disableVipLinkReason ?? false)) {
        vipText = eventRow?.disableVipLinkReason ?? vipText;
        const len = vipText.length;
        vipTextLeftPadding = 3.8 - ((len - 3) * 0.3);
        vipTextRightPadding = 2.2 - ((len - 3) * 0.3);
    }

    if (!ticketUrl) {
        ticketStyle = " nolink";
    } else if (ticketDisabled) {
        ticketStyle = " nolink skewed-tab-disabled";
    }

    if (eventRow?.disableLinkReason ?? false) {
        ticketText = eventRow?.disableLinkReason ?? ticketText;
        const len = ticketText.length;
        ticketTextPadding = 4 - ((len - 7) * 0.5);
    }    

    if (!vipUrl) {
        vipStyle = " nolink";
    } else if (vipDisabled) {
        vipStyle = " nolink skewed-tab-disabled";
    }    

    const thumbnailStyle = {
        height: 'auto',
        margin: '5px 15px 5px 0',
        width: '100px',
    };

    const key = eventRow?.externalEventId ?? 0;

    const rowClassName = props.DarkMode ? 'event-row-dark' : 'event-row';
    const calClassName = props.DarkMode ? 'event-row-calendar-dark' : 'event-row-calendar';
    const mapClassName = props.DarkMode ? 'map-icon-dark' : 'map-icon';

    return (
        <>
            <Row hidden={!eventRow} className={rowClassName} key={key}>
                <Col xs={2} className="event-row-thumb">
                   { thumb && <img hidden={!thumb} src={thumb} alt={title} style={thumbnailStyle}></img> }
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h3>{title}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4><FaCalendar className={calClassName} />{eventDate}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6} lg={8}>
                            <h5>
                                <div className={mapClassName}><FaMapMarker /></div>
                                <div className="map-address">
                                    {eventRow?.venue?.name} <br />
                                    {eventRow?.venue?.address1} <br />
                                    {eventRow?.venue?.city}, {eventRow?.venue?.state} {eventRow?.venue?.postalCode} <br />
                                    <span hidden={!eventRow?.venue?.country}>
                                        {eventRow?.venue?.country?.country}
                                    </span>
                                </div>
                            </h5>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                            <ul className="tab-container" hidden={isVenue}>
                                <li className={`skewed-tab${ticketStyle}`}>
                                    <a href="#" onClick={(e) => openUrl(e, ticketUrl, ticketDisabled)} style={{ paddingRight: `${ticketTextPadding}rem` }}>
                                        <span>{ticketText}</span>
                                    </a>
                                </li>
                                <li className={`skewed-tab active${vipStyle}`}>
                                    <a href="#" onClick={(e) => openUrl(e, vipUrl, vipDisabled)} style={{ paddingLeft: `${vipTextLeftPadding}rem`, paddingRight: `${vipTextRightPadding}rem` }}>
                                        <span>{vipText}</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="tab-container" hidden={!isVenue}>
                                <li className={`ticket-tab active${vipStyle}`}>
                                    <a href="#" onClick={(e) => openUrl(e, vipUrl, vipDisabled)} style={{ paddingLeft: `${vipTextLeftPadding}rem`, paddingRight: `${vipTextRightPadding}rem` }}>
                                        <span>{vipText}</span>
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}