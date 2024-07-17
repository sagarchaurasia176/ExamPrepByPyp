import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// redux apply here so we get
import { store } from "./constant/Store.jsx";
import { Provider } from "react-redux";

// main file
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
