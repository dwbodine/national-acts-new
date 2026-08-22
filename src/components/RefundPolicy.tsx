'use client';

import { PageProps, RefundPolicyType } from '@/types/props';
import {
  setGeneralRefundPolicy,
  setReloadGeneralRefundPolicies,
  setReloadVIPRefundPolicies,
  setVIPRefundPolicy,
} from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetRefundPolicyResponse } from '@/types/responses';
import Link from 'next/link';
import { RefundPolicy } from '@/types/public';
import { RootState } from '@/lib/store';
import parse from 'html-react-parser';
import { useGetRefundPolicy } from '@/hooks/useGetRefundPolicy';

type UnifiedRefundPolicyProps = PageProps & {
  initialTab?: RefundPolicyType;
};

export default function RefundPolicyPage({
  page,
  initialTab = RefundPolicyType.VIP,
}: UnifiedRefundPolicyProps) {
  const globalSelection = useSelector((state: RootState) => state.globalSelection);
  const dispatch = useDispatch();
  const { getRefundPolicy } = useGetRefundPolicy();
  const [activeTab, setActiveTab] = useState(initialTab);
  
  useEffect(() => {
    if (globalSelection.reloadGeneralRefundPolicies) {
      dispatch(setReloadGeneralRefundPolicies(false));
      getRefundPolicy(RefundPolicyType.General).then(
        (response: GetRefundPolicyResponse) => {
          if (response.policy && !response.error)
            dispatch(setGeneralRefundPolicy(response.policy));
        },
      );
    }
    if (globalSelection.reloadVIPRefundPolicies) {
      dispatch(setReloadVIPRefundPolicies(false));
      getRefundPolicy(RefundPolicyType.VIP).then(
        (response: GetRefundPolicyResponse) => {
          if (response.policy && !response.error)
            dispatch(setVIPRefundPolicy(response.policy));
        },
      );
    }
    document.title = page?.title;
  }, [
    dispatch,
    getRefundPolicy,
    globalSelection.reloadGeneralRefundPolicies,
    globalSelection.reloadVIPRefundPolicies,
    page?.title,
  ]);

  useEffect(() => setActiveTab(initialTab), [initialTab]);

  const policy: RefundPolicy | undefined =
    activeTab === RefundPolicyType.VIP
      ? globalSelection.vipRefundPolicy
      : globalSelection.generalRefundPolicy;
  
  const selectTab = (tab: RefundPolicyType) => {
    setActiveTab(tab);
  };

  return (
    <main className="refund-page">
      <header className="refund-page__hero">
        <div className="refund-page__hero-inner">
          <p className="refund-page__breadcrumb">
            Guest Support <span>/</span> Refund Policies
          </p>
          <h1>Refund Policies</h1>
          <p>
            Everything you need to know about refunds with
            National Acts.
          </p>
        </div>
      </header>

      <div className="refund-page__content">
        <div className="refund-page__filters" role="tablist" aria-label="Refund categories">
          <button
            className={activeTab === RefundPolicyType.VIP ? 'is-active' : ''}
            type="button"
            role="tab"
            aria-selected={activeTab === RefundPolicyType.VIP}
            onClick={() => selectTab(RefundPolicyType.VIP)}
          >
            <span aria-hidden="true">✦</span> VIP Packages
          </button>
          <button
            className={activeTab === RefundPolicyType.General ? 'is-active' : ''}
            type="button"
            role="tab"
            aria-selected={activeTab === RefundPolicyType.General}
            onClick={() => selectTab(RefundPolicyType.General)}
          >
            <span aria-hidden="true">▣</span> Tickets
          </button>
        </div>

        <section
          className="refund-policy"
          role="tabpanel"
          aria-label={
            activeTab === RefundPolicyType.VIP
              ? 'VIP refund policies'
              : 'Ticket refund policies'
          }
        >
          {parse(policy?.policyText || '')}
        </section>

        <div className="refund-page__support">
          <p>Can&apos;t find what you&apos;re looking for?</p>
          <Link href="/contact-us">Contact Support</Link>
        </div>
      </div>
    </main>
  );
}
