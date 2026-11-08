import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Who gets the interactive layer (assembling cursors, mini-games, misregistration).
 *
 * - `reading`  — the visitor turned on "reading mode" in the header (persisted).
 * - `reduced`  — the OS asks for reduced motion.
 * - `touch`    — no fine pointer; animations are trimmed, games use taps.
 * - `animated` — the interactive layer is on (not reading, not reduced).
 */
interface MotionPrefs {
  reading: boolean;
  setReading: (v: boolean) => void;
  reduced: boolean;
  touch: boolean;
  animated: boolean;
}

const STORAGE_KEY = 'portfolio:reading-mode';

const MotionPrefsContext = createContext<MotionPrefs | undefined>(undefined);

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function useMedia(query: string, fallback: boolean) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? fallback : window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export function MotionPrefsProvider({ children }: { children: ReactNode }) {
  const [reading, setReadingState] = useState(readStored);
  const reduced = useMedia('(prefers-reduced-motion: reduce)', false);
  const touch = !useMedia('(pointer: fine)', true);

  const setReading = useCallback((v: boolean) => {
    setReadingState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v ? '1' : '0');
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-reading', reading);
  }, [reading]);

  return (
    <MotionPrefsContext.Provider
      value={{ reading, setReading, reduced, touch, animated: !reading && !reduced }}
    >
      {children}
    </MotionPrefsContext.Provider>
  );
}

export function useMotionPrefs() {
  const ctx = useContext(MotionPrefsContext);
  if (!ctx) throw new Error('useMotionPrefs must be used within MotionPrefsProvider');
  return ctx;
}
