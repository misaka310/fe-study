'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { GlossaryEntry } from '../content/glossary';

export function GlossaryTooltip({ entry }: { entry: GlossaryEntry }) {
  const [open, setOpen] = useState(false);
  const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLSpanElement>(null);
  const dialogId = `glossary-${entry.term.toLocaleLowerCase('en-US').replace(/[^a-z0-9]+/g, '-')}`;

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && event.target !== buttonRef.current) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [open]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <span className="glossary-term">
      <button
        aria-controls={dialogId}
        aria-expanded={open}
        aria-label={`${entry.term} 用語解説`}
        className="glossary-trigger"
        disabled={!hydrated}
        onClick={() => setOpen((value) => !value)}
        ref={buttonRef}
        type="button"
      >
        {entry.term}
      </button>
      {open ? (
        <span
          aria-label={`${entry.term} 用語解説`}
          className="glossary-popover"
          id={dialogId}
          onKeyDown={(event) => { if (event.key === 'Escape') close(); }}
          ref={dialogRef}
          role="dialog"
          tabIndex={-1}
        >
          <span className="glossary-popover-head">
            <strong>{entry.term}{entry.expansion ? <span>{entry.expansion}</span> : null}</strong>
            <button aria-label={`${entry.term}の解説を閉じる`} className="glossary-close" onClick={close} type="button">×</button>
          </span>
          <span className="glossary-popover-copy"><b>意味</b>{entry.meaning}</span>
          <span className="glossary-popover-copy"><b>試験の決め手</b>{entry.examCue}</span>
          {entry.contrast ? <span className="glossary-popover-copy"><b>混同注意</b>{entry.contrast}</span> : null}
        </span>
      ) : null}
    </span>
  );
}
