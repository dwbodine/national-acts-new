"use client";

import { Col, Container, Modal, Row } from "react-bootstrap";
import { EVENT_RELOAD_TIMEOUT, HOME_BANNER, HOME_BANNER_LINK } from "@/constants";
import { GetEventsResponse, GetSettingsResponse } from "@/types/responses";
import { JSX, useCallback, useEffect, useMemo, useState } from "react";
import { setEventReloadTime, setEvents, setIsLoading, setReloadEvents, setReloadSettings, setSettings } from "@/lib/globalSelectionSlice";
import { useDispatch, useSelector } from "react-redux";
import EventRow from "./EventRow";
import { PageProps } from "@/types/props";
import { RingLoader } from 'react-spinners';
import { RootState } from "@/lib/store";
import { VipEvent } from "@/types/public";
import debouce from 'lodash.debounce';
import moment from "moment";
import { useGetSettings } from "@/hooks/useGetSettings";
import { useSearchEvents } from "@/hooks/useSearchEvents";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Events(props: PageProps) {
    const globalSelection = useSelector((state: RootState) => state.globalSelection);
    const dispatch = useDispatch();
    const { searchEvents } = useSearchEvents();
    const { getSettings } = useGetSettings();
    const { page } = props;
    const windowSize = useWindowSize();
    const [show, setShow] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

    const debouncedResults = useMemo(() => debouce(setSearchTerm, 300), []);

    const internalDomain = `${process.env.NEXT_PUBLIC_DOMAIN}`;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const searchAllEvents = useCallback(() => {
        dispatch(setIsLoading(true));
        dispatch(setEventReloadTime(moment().unix()));
        searchEvents().then((response: GetEventsResponse) => {
            dispatch(setIsLoading(false));
            if (response.events && !response.error) {
                dispatch(setEvents(response.events));
            } else {
                dispatch(setEvents([]))
            }            
        });
    }, [dispatch, searchEvents]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const now = moment().unix();
            if (!globalSelection.settings && globalSelection.reloadSettings) {
                dispatch(setReloadSettings(false));
                getSettings().then((response: GetSettingsResponse) => {
                    if (response.settings && !response.error) {
                        dispatch(setSettings(response.settings));
                    } else {
                        dispatch(setSettings([]));
                    }                
                });
            } else if ((!globalSelection.events && globalSelection.reloadEvents) ||
                (globalSelection.events && globalSelection.eventReloadTime &&
                    (globalSelection.eventReloadTime + EVENT_RELOAD_TIMEOUT) <= now)) {
                dispatch(setReloadEvents(false));
                searchAllEvents();
            } else if (globalSelection.events && globalSelection.isLoading) {
                dispatch(setIsLoading(false));
            }
            document.title = page?.title;
        }, 250);
        return () => {
            debouncedResults.cancel();
            clearTimeout(timeoutId);
        };
    }, [
        dispatch, 
        getSettings, 
        searchAllEvents, 
        globalSelection.eventReloadTime, 
        globalSelection.events, 
        globalSelection.reloadEvents, 
        globalSelection.reloadSettings, 
        globalSelection.settings,
        page?.title,
        globalSelection.isLoading,
        debouncedResults
     ]);

    const openUrl = (url: string) => {
        const isInternal = (url.indexOf(internalDomain) > 0);
        if (isInternal) {
            if (windowSize.isMobile) {
                window.location.href = url;
            } else {
                window.open(url);
            }
        } else {
            handleShow();
            setTimeout(() => {
                if (windowSize.isMobile) {
                    window.location.href = url;
                } else {
                    window.open(url);
                }
                handleClose();
            }, 1500);
        }
    };

    const filterEvents = (events: VipEvent[]) => {
        if (events.length === 0) {
            return [];
        }

        let filteredEvents: VipEvent[] = events;
        if (searchTerm && searchTerm.length > 2) {
            const srch = searchTerm.toLowerCase();
            filteredEvents = events.filter(evt => (
                evt.title.toLowerCase().includes(srch) ||
                evt.venue?.name?.toLowerCase().includes(srch) ||
                evt.venue?.city?.toLowerCase().includes(srch) ||
                evt.venue?.state?.toLowerCase().includes(srch) ||
                evt.venue?.country?.countryName?.toLowerCase().includes(srch)
            ));
        }
        return filteredEvents;
    };

    const visibleEvents: VipEvent[] = globalSelection.events ?? [];
    const filteredEvents: VipEvent[] = filterEvents(visibleEvents);
    const eventRows: JSX.Element[] = [];
    for (const evt of filteredEvents) {
        eventRows.push(<EventRow key={evt.externalEventId} Event={evt} OpenUrl={openUrl} DarkMode={true} SellerType={evt.sellerType} />);
    }

    const homeBannerSetting = globalSelection.settings?.find(x => x.name === HOME_BANNER);
    const homeBannerLinkSetting = globalSelection.settings?.find(x => x.name === HOME_BANNER_LINK);

    const homeBannerImage = homeBannerSetting ? `${process.env.NEXT_PUBLIC_HOMEBANNERS_URL}${homeBannerSetting.value}` : '';
    const homeBannerLink = homeBannerLinkSetting ? `${process.env.NEXT_PUBLIC_SITE_URL}${homeBannerLinkSetting?.value}` : '';


    return (
        <section className="searchSection">
            <Container fluid>
                <Row>
                    <Col className="hero-image" hidden={!homeBannerImage || !homeBannerLink}>
                        <a href={homeBannerLink}>
                            { homeBannerImage && <img id="crowdPic" src={homeBannerImage} alt="Home" /> }
                        </a>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="select-col">
                    { <img id="home_select_500" src="/images/select_vip_500.jpg" alt="Select artist below to see VIP package details" /> }
                    </Col>
                </Row>
            </Container>
            <Container fluid hidden={!globalSelection.isLoading}>
                <Row>
                    <Col className="spinner-container">
                        <RingLoader size={150} color="#d12610" />
                    </Col>
                </Row>
            </Container>
            <Container hidden={globalSelection.isLoading}>
                <Row className="justify-content-center">
                    <Col sm={12} md={8} lg={6} className="front-page-search">
                        <div className="jumbotron">
                            <h1>Find an event</h1>
                            <input
                                name="search"
                                type="text" 
                                value={searchTerm ?? ''}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control search-text-input no-print"
                                placeholder="Search for events..."
                                hidden={!visibleEvents || visibleEvents.length === 0}
                                />
                        </div>
                    </Col>
                </Row>
                <Row>
					<Col hidden={eventRows.length > 0} className="no-events">No events at this time</Col>
					<Col hidden={eventRows.length === 0}>
						{eventRows}
					</Col>
				</Row>
                <Row>
					<Col>
						<Modal show={show} onHide={handleClose} centered dialogClassName="redirect-modal">
							<Modal.Body className="redirect-box-container">
								<div className="redirect-box">
									<div>You are being redirected to an external website</div>
								</div>
							</Modal.Body>
						</Modal>
					</Col>
				</Row>
            </Container>
        </section>
    );
}
