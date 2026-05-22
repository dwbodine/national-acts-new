"use client";

import { Col, Container, Row} from 'react-bootstrap';
import { GetPagesResponse, GetSettingsResponse } from '@/types/responses';
import { HOME_BANNER, HOME_BANNER_LINK, PageTypeKey } from '@/constants';
import { JSX, useEffect } from "react";
import { setArtists, setPages, setReloadArtists, setReloadSettings, setSettings } from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './common/Footer';
import Header from './common/Header';
import { Page } from '@/types/public';
import { RootState } from '@/lib/store';
import { useGetPagesByType } from '@/hooks/useGetPagesByType';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useRouter } from 'next/navigation';

export default function Home() {
    const globalSelection = useSelector((state: RootState) => state.globalSelection);
    const dispatch = useDispatch();
    const { getSettings } = useGetSettings();
    const { getPagesByType } = useGetPagesByType();
    const router = useRouter();
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!globalSelection.settings && globalSelection.reloadSettings) {
                dispatch(setReloadSettings(false));
                getSettings().then((response: GetSettingsResponse) => {
                    if (response.settings && !response.error) {
                        dispatch(setSettings(response.settings));
                    } else {
                        dispatch(setSettings([]));
                    }                
                });
            } else if (!globalSelection.artists && globalSelection.reloadArtists) {
                dispatch(setReloadArtists(false));
                getPagesByType(PageTypeKey.Artist).then((response: GetPagesResponse) => {
                    if (response.pages && !response.error) {
                        const currentPages = globalSelection.pages ? [...globalSelection.pages] : [];
                        if (currentPages.length > 0) {  
                            response.pages.forEach((page: Page) => {
                                const existingPage = currentPages.find(x => x.route === page.route);
                                if (!existingPage) {
                                    currentPages.push(page);
                                }
                            });
                            dispatch(setPages(currentPages));
                        } else {
                            dispatch(setPages(response.pages));
                        }
                        dispatch(setArtists(response.pages));
                    } else {
                        dispatch(setArtists([]));
                    }
                    document.title = "National Acts VIP";
                });
            }
        }, 250);
        return () => {
          clearTimeout(timeoutId);
        };
    }, [dispatch, getPagesByType, getSettings, globalSelection.settings, globalSelection.artists, globalSelection.pages, globalSelection.reloadArtists, globalSelection.reloadSettings]);

    const goToClient = (route: string) => {
        router.push(`/${route}`);
    };

    const homeBannerSetting = globalSelection.settings?.find(x => x.name === HOME_BANNER);
    const homeBannerLinkSetting = globalSelection.settings?.find(x => x.name === HOME_BANNER_LINK);

    const homeBannerImage = homeBannerSetting ? `${process.env.NEXT_PUBLIC_HOMEBANNERS_URL}${homeBannerSetting.value}` : '';
    const homeBannerLink = homeBannerLinkSetting ? `${process.env.NEXT_PUBLIC_SITE_URL}${homeBannerLinkSetting?.value}` : '';

    const artistCols: JSX.Element[] = [];
    if (globalSelection.artists && globalSelection.artists.length > 0) {
        globalSelection.artists.forEach((artistPage: Page, i: number) => {
            if (artistPage.logoOnlyImage) {
                artistCols.push(
                    <Col key={`artistCol_${i}`} md={4} sm={6} className="homeVipImgContainer" onClick={() => goToClient(artistPage.route)} style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_LOGOS_URL}${artistPage.logoOnlyImage})`}}></Col>
                );
            }
        });
    }

    return (
        <>
        <Header />
        <section className="homeSection">
            <Container fluid>
                <Row>
                    <Col className="hero-image" hidden={!homeBannerImage || !homeBannerLink}>
                        <a href={homeBannerLink}>
                            { homeBannerImage && <img id="crowdPic" src={homeBannerImage} alt="Home" /> }
                        </a>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="banner-col">
                        { <img id="home_banner" src="/images/home_banner_769.jpg" alt="National Acts VIP Meet & Greet" /> }
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="select-col">
                    { <img id="home_select_500" src="/images/select_vip_500.jpg" alt="Select artist below to see VIP package details" /> }
                    </Col>
                </Row>
                <Row className="justify-content-center home-vip-col">
                    {artistCols}
                </Row>
            </Container>        
        </section>
        <Footer />
        </>        
    );
}