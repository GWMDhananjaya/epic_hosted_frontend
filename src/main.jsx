import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./components/state/store.js";
import "flowbite";
import "./index.css";

// Check if we're on GitHub Pages or custom domain
const isGitHubPages = window.location.hostname.includes("github.io");
const basename = isGitHubPages ? "/epic_hosted_frontend/" : "/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
