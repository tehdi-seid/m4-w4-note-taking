import React, { createContext, useState, type ReactNode } from "react";
import type { View } from "./types";
export type viewContextType = [view: View, setView: (view: View) => void];

export const viewContext = createContext<viewContextType | null>(null);

function ViewContextProvider({ children }: { children: ReactNode }) {
  const [view, toogleView] = useState<View>("all");
  function setView(view: View) {
    toogleView(view);
  }
  return (
    <viewContext.Provider value={[view, setView]}>
      {children}
    </viewContext.Provider>
  );
}

export default ViewContextProvider;
