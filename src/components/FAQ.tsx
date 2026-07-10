"use client";

import { FAQType, PageProps } from '@/types/props';
import { setGeneralFAQ, setReloadGeneralFAQs, setReloadVIPFAQs, setVIPFAQ } from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import FAQuestion from './common/FAQuestion';
import { Faq } from '@/types/public';
import { GetFaqsResponse } from '@/types/responses';
import Link from 'next/link';
import { RootState } from '@/lib/store';
import { useGetFAQs } from '@/hooks/useGetFAQs';

type UnifiedFAQProps = PageProps & {
  initialTab?: FAQType;
};

export default function FAQ({ page, initialTab = FAQType.VIP }: UnifiedFAQProps) {
  const globalSelection = useSelector((state: RootState) => state.globalSelection);
  const dispatch = useDispatch();
  const { getFAQs } = useGetFAQs();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (globalSelection.reloadGeneralFaqs) {
      dispatch(setReloadGeneralFAQs(false));
      getFAQs(FAQType.General).then((response: GetFaqsResponse) => {
        if (response.faqs && !response.error) dispatch(setGeneralFAQ(response.faqs));
      });
    }
    if (globalSelection.reloadVIPFAQs) {
      dispatch(setReloadVIPFAQs(false));
      getFAQs(FAQType.VIP).then((response: GetFaqsResponse) => {
        if (response.faqs && !response.error) dispatch(setVIPFAQ(response.faqs));
      });
    }
    document.title = page?.title;
  }, [dispatch, getFAQs, globalSelection.reloadGeneralFaqs, globalSelection.reloadVIPFAQs, page?.title]);

  useEffect(() => setActiveTab(initialTab), [initialTab]);

  const questions: Faq[] = activeTab === FAQType.VIP ? globalSelection.vipFAQ : globalSelection.generalFAQ;
  const filteredQuestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return questions;
    return questions.filter((faq) => `${faq.question ?? ''} ${faq.answer ?? ''}`.toLowerCase().includes(normalizedQuery));
  }, [query, questions]);

  const selectTab = (tab: FAQType) => {
    setActiveTab(tab);
    setQuery('');
  };

  return (
    <main className="faq-page">
      <header className="faq-page__hero">
        <div className="faq-page__hero-inner">
          <p className="faq-page__breadcrumb">Guest Support <span>/</span> FAQ</p>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about VIP packages and ticket purchases through National Acts.</p>
        </div>
      </header>

      <div className="faq-page__content">
        <label className="faq-page__search">
          <span className="visually-hidden">Search questions</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions..." type="search" />
        </label>

        <div className="faq-page__filters" role="tablist" aria-label="FAQ categories">
          <button className={activeTab === FAQType.VIP ? 'is-active' : ''} type="button" role="tab" aria-selected={activeTab === FAQType.VIP} onClick={() => selectTab(FAQType.VIP)}><span aria-hidden="true">✦</span> VIP Packages</button>
          <button className={activeTab === FAQType.General ? 'is-active' : ''} type="button" role="tab" aria-selected={activeTab === FAQType.General} onClick={() => selectTab(FAQType.General)}><span aria-hidden="true">▣</span> Tickets</button>
        </div>

        <section className="faq-accordion" role="tabpanel" aria-label={activeTab === FAQType.VIP ? 'VIP package questions' : 'Ticket questions'}>
          {filteredQuestions.map((question, index) => <FAQuestion key={`${activeTab}-${question.faqId ?? `${question.question}-${index}`}`} question={question} index={index} />)}
          {filteredQuestions.length === 0 && <p className="faq-page__empty">No questions match your search.</p>}
        </section>

        <div className="faq-page__support">
          <p>Can&apos;t find what you&apos;re looking for?</p>
          <Link href="/contact-us">Contact Support</Link>
        </div>
      </div>
    </main>
  );
}
