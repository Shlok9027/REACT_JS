import React from "react";
import App from "./App.jsx";
import ReactDom from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextprovider from "./context/AppContext.jsx";
import { createRoot } from 'react-dom/client'

ReactDom.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextprovider>
      <App />
    </AppContextprovider>
  </BrowserRouter>
)

