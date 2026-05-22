"use client";

import { Col, Container, Row } from "react-bootstrap";
import { JSX, useEffect } from "react";
import { setArtists, setPages, setReloadArtists } from "@/lib/globalSelectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetPagesResponse } from "@/types/responses";
import { Page } from "@/types/public";
import { PageProps } from "@/types/props";
import { PageTypeKey } from "@/constants";
import { RootState } from "@/lib/store";
import { useGetPagesByType } from "@/hooks/useGetPagesByType";
import { useRouter } from 'next/navigation';

export default function VIPClients(props: PageProps) {
    const globalSelection = useSelector((state: RootState) => state.globalSelection);
    const dispatch = useDispatch();
    const { page } = props;
    const router = useRouter();
    const { getPagesByType } = useGetPagesByType();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!globalSelection.artists && globalSelection.reloadArtists) {
                dispatch(setReloadArtists(false));
                getPagesByType(PageTypeKey.Artist).then((response: GetPagesResponse) => {
                    if (response.pages && !response.error) {
                        const currentPages = globalSelection.pages ? [...globalSelection.pages] : [];
                        if (currentPages.length > 0) {  
                            response.pages.forEach((pg: Page) => {
                                const existingPage = currentPages.find(x => x.route === pg.route);
                                if (!existingPage) {
                                    currentPages.push(pg);
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
                    document.title = "VIP Clients";
                });
            }
            document.title = page?.title;
        }, 250);
        return () => {
            clearTimeout(timeoutId);
        };        
    }, [page?.title, dispatch, getPagesByType, globalSelection.artists, globalSelection.reloadArtists, globalSelection.pages]);

    const goToClient = (route: string) => {
        router.push(`/${route}`);
    };

    const artistCols: JSX.Element[] = [];
    if (globalSelection.artists && globalSelection.artists.length > 0) {
        globalSelection.artists.forEach((artistPage: Page, i: number) => {
            if (artistPage.thumbnail) {
                artistCols.push(
                    <Col key={`artistCol_${i}`} lg={6} xl={4} className="featImgContainer" onClick={() => goToClient(artistPage.route)} style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_THUMBNAILS_URL}${artistPage.thumbnail})`}}></Col>
                );
            }
        });
    }

    return (
        <section className="clientSection">
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <h1 className="text-center">Click below for VIP package details</h1>
                    </Col>
                </Row>
                 <Row className="justify-content-center">
                    {artistCols}
                </Row>
            </Container>
        </section>
    );

}