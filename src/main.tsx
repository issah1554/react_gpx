// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";

// Global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

// App + Context
import App from "./App";
import { UIProvider } from "./context/UIContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </React.StrictMode>
);
