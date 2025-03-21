import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./context/LanguageContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </LanguageProvider>
);
