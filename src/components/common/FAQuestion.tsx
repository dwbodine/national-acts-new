"use client";

import { useId, useState } from 'react';
import { FAQuestionProps } from '@/types/props';
import parse from 'html-react-parser';

export default function FAQuestion({ question, index }: FAQuestionProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const answerId = useId();
  const answer = question.answer ? parse(question.answer) : '';

  if (!question.question) return null;

  return (
    <article className={['faq-accordion__item', expanded ? 'is-expanded' : null].filter(Boolean).join(' ')}>
      <button
        className="faq-accordion__trigger"
        type="button"
        aria-expanded={expanded}
        aria-controls={answerId}
        onClick={() => setExpanded((value) => !value)}
      >
        <span>{question.question}</span>
        <span className="faq-accordion__chevron" aria-hidden="true" />
      </button>
      <div className="faq-accordion__answer" id={answerId} hidden={!expanded}>
        {answer}
      </div>
    </article>
  );
}
