'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { GetPagesResponse, GetSettingsResponse } from '@/types/responses';
import {
  setArtists,
  setPages,
  setReloadArtists,
  setReloadSettings,
  setSettings,
} from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CurrentTours from './Home/CurrentTours';
import Footer from './common/Footer';
import HeroBottom from './common/HeroBottom';
import HeroHeadline from './Home/HeroHeadline';
import HeroSlider from './Home/HeroSlider';
import HomeContact from './Home/HomeContact';
import HomeMoments from './Home/Moments';
import HomeTicker from './common/HomeTicker';
import MailingListControls from './common/MailingListControls';
import { Page } from '@/types/public';
import { PageTypeKey } from '@/constants';
import { RootState } from '@/lib/store';
import SiteHeader from './common/SiteHeader';
import VIPSolutions from './Home/VIPSolutions';
import VipExperience from './Home/VipExperience';
import { useGetPagesByType } from '@/hooks/useGetPagesByType';
import { useGetSettings } from '@/hooks/useGetSettings';

export default function Home() {
  const globalSelection = useSelector((state: RootState) => state.globalSelection);
  const dispatch = useDispatch();
  const { getSettings } = useGetSettings();
  const { getPagesByType } = useGetPagesByType();
  const [homeContactDialogRequest, setHomeContactDialogRequest] = useState<{
    id: number;
    type: 'Start a Conversation';
  }>();

  const openHomeContactDialog = () => {
    setHomeContactDialogRequest({
      id: Date.now(),
      type: 'Start a Conversation',
    });
  };

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
                const existingPage = currentPages.find((x) => x.route === page.route);
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
          document.title = 'National Acts VIP';
        });
      }
    }, 250);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    dispatch,
    getPagesByType,
    getSettings,
    globalSelection.settings,
    globalSelection.artists,
    globalSelection.pages,
    globalSelection.reloadArtists,
    globalSelection.reloadSettings,
  ]);

  return (
    <>
      <SiteHeader />
      <section className="homeSection">
        <Container fluid>
          <div className="homeSection__hero-shell">
            <Row className="homeSection__hero-row">
              <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <HeroHeadline />
                <HeroBottom />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <HeroSlider />
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs={12}>
              <HomeTicker />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <CurrentTours />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <HomeMoments />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <MailingListControls />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <VIPSolutions onPartnerWithUsClick={openHomeContactDialog} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <VipExperience />
            </Col>
          </Row>
        </Container>
        <HomeContact dialogRequest={homeContactDialogRequest} />
      </section>
      <Footer />
    </>
  );
}
