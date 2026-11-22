import { useContext } from "react";
import { viewContext } from "./ViewContextProvider";

export function useView() {
  const view = useContext(viewContext);
  if (view === null) {
    throw new Error("view context must be wraped byt the provider");
  }
  return view;
}
