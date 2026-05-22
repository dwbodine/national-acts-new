"use client";

import { Col, Container, Row } from "react-bootstrap";
import { FAQProps, FAQType } from "@/types/props";
import { JSX, useEffect } from "react";
import { setGeneralFAQ, setReloadGeneralFAQs, setReloadVIPFAQs, setVIPFAQ } from "@/lib/globalSelectionSlice";
import { useDispatch, useSelector } from "react-redux";
import FAQuestion from "./common/FAQuestion";
import { Faq } from "@/types/public";
import { GetFaqsResponse } from "@/types/responses";
import { RootState } from "@/lib/store";
import { useGetFAQs } from "@/hooks/useGetFAQs";

export default function FAQs(props: FAQProps) {
    const { page, faqType } = props;
    const globalSelection = useSelector((state: RootState) => state.globalSelection);
    const dispatch = useDispatch();
    const { getFAQs } = useGetFAQs();

    useEffect(() => {
        if (faqType === FAQType.General && globalSelection.reloadGeneralFaqs) {
            dispatch(setReloadGeneralFAQs(false));
            getFAQs(FAQType.General).then((response: GetFaqsResponse) => {
                if (response.faqs && !response.error) {
                    dispatch(setGeneralFAQ(response.faqs));
                }
            });
        } else if (faqType === FAQType.VIP && globalSelection.reloadVIPFAQs) {
            dispatch(setReloadVIPFAQs(false));
            getFAQs(FAQType.VIP).then((response: GetFaqsResponse) => {
                if (response.faqs && !response.error) {
                    dispatch(setVIPFAQ(response.faqs));
                }
            });
        }
        document.title = page?.title;
    }, [
        page?.title, 
        dispatch, 
        faqType, 
        getFAQs, 
        globalSelection.generalFAQ, 
        globalSelection.vipFAQ, 
        globalSelection.reloadGeneralFaqs, 
        globalSelection.reloadVIPFAQs
    ]);

    const questions: Faq[] | undefined = faqType === FAQType.VIP ? globalSelection.vipFAQ : globalSelection.generalFAQ;
    const sectionClass = faqType === FAQType.VIP ? 'faqVIPSection' : 'faqGeneralSection';
    const title = page?.subtitle1 ?? '';
    const subTitle = page?.subtitle2 ?? '';

    const questionRows: JSX.Element[] = [];
    if (questions && questions.length > 0) {
        questions.forEach((question: Faq, i: number) => {
            questionRows.push(<FAQuestion key={`question_${i}`} question={question} index={i} />);
        })
    }

    return (
        <section className={sectionClass}>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <h1>{title}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col className="text-center">
                                    <h2>{subTitle}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {questionRows}
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}