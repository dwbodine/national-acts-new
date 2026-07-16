"use client";

import { Container, Row } from "react-bootstrap";
import { JSX, useEffect } from "react";
import { setArtists, setIsLoading, setPages, setReloadArtists } from "@/lib/globalSelectionSlice";
import { useDispatch, useSelector } from "react-redux";
import ConcertExperiences from "./common/ConcertExperiences";
import { GetPagesResponse } from "@/types/responses";
import { Page } from "@/types/public";
import { PageProps } from "@/types/props";
import { PageTypeKey } from "@/constants";
import { RingLoader } from "react-spinners";
import { RootState } from "@/lib/store";
import VipClient from "./VIPClients/VipClient";
import VipClientHeader from "./VIPClients/VipClientHeader";
import { useGetPagesByType } from "@/hooks/useGetPagesByType";

export default function VIPClients(props: PageProps) {
    const globalSelection = useSelector((state: RootState) => state.globalSelection);
    const dispatch = useDispatch();
    const { page } = props;
    const { getPagesByType } = useGetPagesByType();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!globalSelection.artists && globalSelection.reloadArtists) {
                dispatch(setReloadArtists(false));
                dispatch(setIsLoading(true));
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
                    dispatch(setIsLoading(false));
                });
            }
            document.title = page?.title;
        }, 250);
        return () => {
            clearTimeout(timeoutId);
        };        
    }, [page?.title, dispatch, getPagesByType, globalSelection.artists, globalSelection.reloadArtists, globalSelection.pages]);

    

    const artistCols: JSX.Element[] = [];
    if (globalSelection.artists && globalSelection.artists.length > 0) {
        globalSelection.artists.forEach((artistPage: Page, i: number) => {
            if (artistPage.thumbnail) {
                artistCols.push(
                    <VipClient key={`artistCol_${i}`} page={artistPage} />
                );
            }
        });
    }

    return (
        <section className="clientSection">
            <Container>
                <VipClientHeader />
                <div className="spinner-container" hidden={!globalSelection.isLoading}>
                    <RingLoader size={150} color="#d12610" />
                </div>
                 <Row className="justify-content-center" hidden={globalSelection.isLoading}>
                    {artistCols}
                </Row>
                <ConcertExperiences hidden={globalSelection.isLoading} />
            </Container>
        </section>
    );

}
