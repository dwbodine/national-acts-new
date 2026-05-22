"use client";

import type { MouseEvent } from 'react';

type MomentsButtonProps = {
  className?: string;
  label?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function MomentsButton({
  className,
  label = 'Load more',
  onClick,
  type = 'button',
}: MomentsButtonProps) {
  const wrapperClassName = 'fan-moments-button-wrapper';
  const buttonClassName = ['fan-moments-button', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName}>
      <button className={buttonClassName} type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
