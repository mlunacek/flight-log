

if (localStorage.getItem("appVersion") !== __APP_VERSION__) {
  localStorage.setItem("appVersion", __APP_VERSION__);
  window.location.replace(import.meta.env.BASE_URL);
}

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./router";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);