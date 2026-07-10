"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Artist from "../Artist";
import B2B from "../B2B";
import ComingSoon from "./ComingSoon";
import Contact from "../Contact";
import Downloads from "../Downloads";
import Events from "../Events";
import FAQ from "../FAQ";
import FanMoments from "../Moments/FanMoments";
import Footer from "./Footer";
import MailingList from "../MailingList";
import MyAccount from "../MyAccount";
import OnePager from "../OnePager";
import { PageProps } from "@/types/props";
import { PageTypeKey } from "@/constants";
import { RootState } from "@/lib/store";
import SiteHeader from "./SiteHeader";
import Terms from "../Terms";
import VIPClients from "../VIPClients";
import Venue from "../Venue";
import { setPages } from "@/lib/globalSelectionSlice";

const removeInjectedNodes = (nodes: Node[]) => {
    nodes.forEach((node) => {
        node.parentNode?.removeChild(node);
    });
};

const createInjectedNodes = (html: string): Node[] => {
    const template = document.createElement("template");
    template.innerHTML = html.trim();

    return Array.from(template.content.childNodes).map((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === "script") {
            const sourceScript = node as HTMLScriptElement;
            const script = document.createElement("script");

            Array.from(sourceScript.attributes).forEach((attribute) => {
                script.setAttribute(attribute.name, attribute.value);
            });

            script.text = sourceScript.text;
            return script;
        }

        return node.cloneNode(true);
    });
};

const appendHtmlToElement = (target: HTMLElement, html: string): Node[] => {
    const nodes = createInjectedNodes(html);
    nodes.forEach((node) => {
        target.appendChild(node);
    });
    return nodes;
};

const prependHtmlToElement = (target: HTMLElement, html: string): Node[] => {
    const nodes = createInjectedNodes(html);
    const { firstChild } = target;

    nodes.forEach((node) => {
        target.insertBefore(node, firstChild);
    });

    return nodes;
};

export default function PageLoader(props: PageProps) {
    const { page } = props;
    const [pageTypeId, setPageTypeId] = useState<number | undefined>(undefined);
    const injectedHeadNodesRef = useRef<Node[]>([]);
    const injectedBodyNodesRef = useRef<Node[]>([]);
    const globalSelection = useSelector((state: RootState) => state.globalSelection);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!globalSelection.pages) {
                dispatch(setPages([page]));
            } else if (globalSelection.pages && page) {
                let pages = [...globalSelection.pages];
                const existingPage = pages.find(x => x.route === page.route);
                if (existingPage && (existingPage.lastUpdated ?? 0) < (page.lastUpdated ?? 0)) {
                    pages = globalSelection.pages.map(pg => 
                       pg.route === page.route ? page : pg
                    );
                    dispatch(setPages(pages));
                } else if (!existingPage) {
                    pages.push(page);
                    dispatch(setPages(pages));
                }
                if (!pageTypeId && page.pageType && page.pageType.pageTypeId) {
                    setPageTypeId(page.pageType.pageTypeId);
                }  
            }
        }, 300);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [page, pageTypeId, dispatch, globalSelection.pages]);

    useEffect(() => {
        removeInjectedNodes(injectedHeadNodesRef.current);
        injectedHeadNodesRef.current = [];

        if (!page.extraHtmlHead) {
            return undefined;
        }

        injectedHeadNodesRef.current = appendHtmlToElement(document.head, page.extraHtmlHead);

        return () => {
            removeInjectedNodes(injectedHeadNodesRef.current);
            injectedHeadNodesRef.current = [];
        };
    }, [page.extraHtmlHead, page.route]);

    useEffect(() => {
        removeInjectedNodes(injectedBodyNodesRef.current);
        injectedBodyNodesRef.current = [];

        if (!page.extraHtmlBody) {
            return undefined;
        }

        injectedBodyNodesRef.current = prependHtmlToElement(document.body, page.extraHtmlBody);

        return () => {
            removeInjectedNodes(injectedBodyNodesRef.current);
            injectedBodyNodesRef.current = [];
        };
    }, [page.extraHtmlBody, page.route]);

    const renderPage = (pageTypeKey: PageTypeKey) => {
        switch (pageTypeKey) {
            case PageTypeKey.Artist:
                return <Artist page={page} />
                break;
            case PageTypeKey.B2B:
                return <B2B />
                break;
            case PageTypeKey.Contact:
                return <Contact page={page} />
                break;
            case PageTypeKey.Downloads:
                return <Downloads page={page} />
                break;
            case PageTypeKey.Events:
                return <Events page={page} />
                break;
            case PageTypeKey.FAQ:
                return <FAQ page={page} />
                break;
            case PageTypeKey.MailingList:
                return <MailingList page={page} />
                break;
            case PageTypeKey.Moments:
                return <FanMoments />
                break;
            case PageTypeKey.MyAccount:
                return <MyAccount page={page} />
                break;
            case PageTypeKey.Partner:
                return <ComingSoon />
                break;
            case PageTypeKey.Terms:
                return <Terms page={page} />
                break;
            case PageTypeKey.VIPClients:
                return <VIPClients page={page} />
                break;
            case PageTypeKey.Venue:
                return <Venue page={page} />
                break;
            case PageTypeKey.Privacy:
                return <ComingSoon />
                break;
            case PageTypeKey.OnePager:
                return <OnePager page={page} />
                break; 
            default:
                return undefined;
                break;
        }
    }

    const pageTypeKey: PageTypeKey = pageTypeId ?? 1;
    const pageToRender = renderPage(pageTypeKey);
    return (
       pageToRender ?
        <>
            <SiteHeader />
            {pageToRender}
            <Footer />
        </>
        : ''
    );
}
