"use client";

import Link from 'next/link';
import parse from 'html-react-parser';
import { useEffect } from 'react';

type TermsHeading = {
  id: string;
  label: string;
};

const buildTermsDocument = (html?: string) => {
  if (!html) return { headings: [] as TermsHeading[], html: '' };
  const headings: TermsHeading[] = [];
  const usedIds = new Map<string, number>();
  const formattedHtml = html.replace(
    /<h3\b([^>]*)>([\s\S]*?)<\/h3>/gi,
    (_match, attributes: string, contents: string) => {
      const label = contents.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();
      const baseId = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `terms-section-${headings.length + 1}`;
      const occurrence = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, occurrence + 1);
      const id = occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`;
      headings.push({ id, label });
      const cleanAttributes = attributes.replace(/\s+id=(['"])[\s\S]*?\1/i, '');
      return `<h3${cleanAttributes} id="${id}">${contents}</h3>`;
    },
  );
  return { headings, html: formattedHtml };
};

const formatLastUpdated = (value?: number) => {
  if (!value) return null;
  const timestamp = value < 10_000_000_000 ? value * 1000 : value;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

export default function Terms({ page }: import('@/types/props').PageProps) {
  useEffect(() => { document.title = page?.title; }, [page?.title]);
  const termsDocument = buildTermsDocument(page?.htmlText);
  const terms = termsDocument.html ? parse(termsDocument.html) : null;
  const lastUpdated = formatLastUpdated(page?.lastUpdated);

  return (
    <main className="terms-page" id="terms-top">
      <header className="terms-page__hero">
        <p>Legal</p>
        <h1>Terms of Service</h1>
        <p>By using any of National Acts&apos; services, including any services found on the website, you agree to voluntarily consent to any and all Terms of Service found herein.<br />
        National Acts has the right to modify this Terms of Service agreement at our discretion, and the terms will become effective immediately upon publication to this website.</p>
      </header>

      <div className="terms-page__content">
        <p className="terms-page__breadcrumb"><Link href="/faq">Support</Link><span aria-hidden="true">›</span>Terms of Service</p>
        <div className="terms-page__columns">
          <aside aria-label="Terms navigation">
            <h5 className="terms__on-this-page">On this page</h5>
            <nav>
              {termsDocument.headings.map((heading) => <a href={`#${heading.id}`} key={heading.id}>{heading.label}</a>)}
            </nav>
          </aside>
          <article className="terms-page__card">
            {lastUpdated && <p className="terms-page__updated">Last updated: {lastUpdated}</p>}
            <div className="terms-page__body">{terms}</div>
            <a className="terms-page__back-top" href="#terms-top">Back to top ↑</a>
          </article>
        </div>
      </div>

      <section className="terms-page__support">
        <div aria-hidden="true"><span /><span /></div>
        <h2>Questions About Our Terms?</h2>
        <p>Our support team is here to help clarify anything you need.</p>
        <Link href="/contact-us">Contact Support</Link>
      </section>
    </main>
  );
}
