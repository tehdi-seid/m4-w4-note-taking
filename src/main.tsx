import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NoteContextProvider from "./hook/NoteContext.tsx";
import ThemeProvider from "./hook/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
