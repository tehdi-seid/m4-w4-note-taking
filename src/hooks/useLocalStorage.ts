import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function resolveInitial<T>(initial: T | (() => T)): T {
  return typeof initial === "function" ? (initial as () => T)() : initial;
}

function readStorage<T>(
  storageKey: string,
  initial: T | (() => T),
  revive?: (value: unknown) => T | undefined,
): T {
  const fallback = () => resolveInitial(initial);
  if (typeof window === "undefined") return fallback();

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw === null) return fallback();

    const parsed: unknown = JSON.parse(raw);
    if (!revive) return parsed as T;

    const revived = revive(parsed);
    return revived === undefined ? fallback() : revived;
  } catch {
    return fallback();
  }
}

/**
 * Persist JSON state under a versioned key (`${key}:v${version}`).
 * The read is lazy, and every storage call is guarded so a locked or
 * corrupted store falls back to `initial` instead of throwing.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T | (() => T),
  version = 1,
  revive?: (value: unknown) => T | undefined,
) {
  const storageKey = `${key}:v${version}`;

  const [value, setValue] = useState<T>(() =>
    readStorage(storageKey, initial, revive),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Quota exceeded or storage disabled: keep the in-memory value.
    }
  }, [storageKey, value]);

  return [value, setValue] as const satisfies readonly [
    T,
    Dispatch<SetStateAction<T>>,
  ];
}
