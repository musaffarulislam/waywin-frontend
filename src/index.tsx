import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/GlobalStyles.css";
import App from "./App";
import "./styles/modules/Background.scss";
import "./index.css"
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
