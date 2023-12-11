import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
// import AuthApp from "./authentication/AuthApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthApp /> */}
    <App />
  </React.StrictMode>
);
