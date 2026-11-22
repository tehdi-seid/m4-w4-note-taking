import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function readStorage<T>(key: string, fallback: () => T): T {
  if (typeof window === "undefined") return fallback();
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback() : (JSON.parse(raw) as T);
  } catch {
    return fallback(); // bad JSON or storage disabled
  }
}

export function useLocalStorage<T>(key: string, initial: T | (() => T)) {
  const initialRef = useRef(initial);
  const getInitial = useCallback(() => {
    const i = initialRef.current;
    return typeof i === "function" ? (i as () => T)() : i;
  }, []);

  const [value, setValue] = useState<T>(() => readStorage(key, getInitial));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.log("couldn't saved the data to local storage");
    }
  }, [key, value]);

  // Bonus: follow changes made in another tab
  //   useEffect(() => {
  //     function onStorage(e: StorageEvent) {
  //       if (e.key === key) setValue(readStorage(key, getInitial));
  //     }
  //     window.addEventListener("storage", onStorage);
  //     return () => window.removeEventListener("storage", onStorage);
  //   }, [key, getInitial]);

  return [value, setValue] as const satisfies readonly [
    T,
    Dispatch<SetStateAction<T>>,
  ];
}
