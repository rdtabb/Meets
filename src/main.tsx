import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ChatProvider } from "./context/ChatContext";
import { GeneralProvider } from "./context/GeneralContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <GeneralProvider>
            <App />
          </GeneralProvider>
        </ChatProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
