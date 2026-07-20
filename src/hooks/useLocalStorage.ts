import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const savedValue = window.localStorage.getItem(key);
      return savedValue ? (JSON.parse(savedValue) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // LocalStorage can fail in private mode or restricted browsers.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
