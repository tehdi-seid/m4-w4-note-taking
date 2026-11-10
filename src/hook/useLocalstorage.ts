import { useEffect, useState } from "react";

function readLocalStorage<T>(key: string, initilVal: T) {
  try {
    const raw = localStorage.getItem(key);

    return raw === null ? initilVal : JSON.parse(raw);
  } catch {
    return initilVal;
  }
}
function useLocalStorage<T>(key: string, initialVal: T) {
  const [value, setValue] = useState(() => {
    return readLocalStorage(key, initialVal);
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.log("unable to store in the local storage");
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
