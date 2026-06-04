import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { worker } from "@/mocks/browser";

// This app has no real backend, so MSW always serves its requests.
await worker.start({
  onUnhandledRequest: "bypass",
  serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element "#root" not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
