import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
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
            <Router>
              <App />
            </Router>
          </GeneralProvider>
        </ChatProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
