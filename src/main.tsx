import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import NoteContextProvider from "./hook/NoteContext.tsx";
import ThemeProvider from "./hook/ThemeProvider.tsx";
import { NotesProvider } from "./hook/NoteProvider.tsx";
import ViewContextProvider from "./hook/ViewContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NotesProvider>
        <ViewContextProvider>
          <App />
        </ViewContextProvider>
      </NotesProvider>
    </ThemeProvider>
  </StrictMode>,
);
