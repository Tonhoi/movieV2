import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// translation
import i18n from "./translation/i18n";
import { I18nextProvider } from "react-i18next";

import { GlobalStyle } from "./components/common/GlobalStyle";
import store from "./store/configStore.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./hooks/ScrollToTop";

const container = document.getElementById("root");
const root = createRoot(container);

// const loader = document.querySelector(".wrapper-loader");

// const showLoader = () => loader.classList.remove("loader--hide");

// const hideLoader = () => loader.classList.add("loader--hide");
root.render(
  <Router>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <GlobalStyle>
          <ScrollToTop />
          <App />
        </GlobalStyle>
      </I18nextProvider>
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
