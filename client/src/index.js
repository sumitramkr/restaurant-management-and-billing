import React from "react";
import ReactDOM from "react-dom/client";
import "./components/styles/index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-el261mjk5znyjcrw.us.auth0.com"
    clientId="XIySZrShLjWSjiA44eT7NSqwm5O27exQ"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
