import {useEffect, useRef, useState} from 'react';
import type {ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import clsx from 'clsx';

import styles from './styles.module.css';

type Choice = 'light' | 'dark' | null;

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const OPTIONS: {value: Choice; label: string; icon: ReactNode}[] = [
  {value: 'light', label: 'Claro', icon: <SunIcon />},
  {value: 'dark', label: 'Escuro', icon: <MoonIcon />},
  {value: null, label: 'Auto', icon: <AutoIcon />},
];

export default function ColorModeDropdown(): ReactNode {
  const {colorModeChoice, setColorMode} = useColorMode();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', closeOnClickOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnClickOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const current = OPTIONS.find((o) => o.value === colorModeChoice) ?? OPTIONS[2];

  return (
    <div ref={rootRef} className={styles.dropdown}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Tema: ${current.label}`}>
        <span className={styles.icon}>{current.icon}</span>
        <span className={styles.triggerLabel}>{current.label}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(styles.chevron, open && styles.chevronOpen)}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label="Tema">
          {OPTIONS.map((opt) => {
            const selected = opt.value === current.value;
            return (
              <li key={opt.label} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={clsx(styles.option, selected && styles.optionActive)}
                  onClick={() => {
                    setColorMode(opt.value);
                    setOpen(false);
                  }}>
                  <span className={styles.icon}>{opt.icon}</span>
                  <span className={styles.optionLabel}>{opt.label}</span>
                  {selected && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.check}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
