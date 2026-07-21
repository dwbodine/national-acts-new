"use client";

import Link from 'next/link';
import parse from 'html-react-parser';
import { useEffect } from 'react';

type PrivacyHeading = { id: string; label: string };

const buildPrivacyDocument = (html?: string) => {
  if (!html) return { headings: [] as PrivacyHeading[], html: '' };
  const headings: PrivacyHeading[] = [];
  const usedIds = new Map<string, number>();
  const formattedHtml = html.replace(/<h3\b([^>]*)>([\s\S]*?)<\/h3>/gi, (_match, attributes: string, contents: string) => {
    const label = contents.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();
    const baseId = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `privacy-section-${headings.length + 1}`;
    const occurrence = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, occurrence + 1);
    const id = occurrence === 0 ? baseId : `${baseId}-${occurrence + 1}`;
    headings.push({ id, label });
    const cleanAttributes = attributes.replace(/\s+id=(['"])[\s\S]*?\1/i, '');
    return `<h3${cleanAttributes} id="${id}">${contents}</h3>`;
  });
  return { headings, html: formattedHtml };
};

const formatLastUpdated = (value?: number) => {
  if (!value) return null;
  const timestamp = value < 10_000_000_000 ? value * 1000 : value;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

export default function Privacy({ page }: import('@/types/props').PageProps) {
  useEffect(() => { document.title = page?.title; }, [page?.title]);
  const privacyDocument = buildPrivacyDocument(page?.htmlText);
  const content = privacyDocument.html ? parse(privacyDocument.html) : null;
  const lastUpdated = formatLastUpdated(page?.lastUpdated);

  return (
    <main className="terms-page privacy-page" id="privacy-top">
      <header className="terms-page__hero">
        <p>Legal</p>
        <h1>Privacy Policy</h1>
        <p>Learn how National Acts collects, uses, and protects your personal information.</p>
      </header>

      <div className="terms-page__content">
        <p className="terms-page__breadcrumb"><Link href="/faq">Support</Link><span aria-hidden="true">›</span>Privacy Policy</p>
        <div className="terms-page__columns">
          <aside aria-label="Privacy policy navigation">
            <strong>On this page</strong>
            <nav>{privacyDocument.headings.map((heading) => <a href={`#${heading.id}`} key={heading.id}>{heading.label}</a>)}</nav>
          </aside>
          <article className="terms-page__card">
            {lastUpdated && <p className="terms-page__updated">Last updated: {lastUpdated}</p>}
            <div className="terms-page__body">{content}</div>
            <a className="terms-page__back-top" href="#privacy-top">Back to top ↑</a>
          </article>
        </div>
      </div>

      <section className="terms-page__support">
        <div aria-hidden="true"><span /><span /></div>
        <h2>Questions About Your Privacy?</h2>
        <p>We&apos;re here to help you understand how your information is used and protected.</p>
        <Link href="/contact">Contact Support</Link>
      </section>
    </main>
  );
}
