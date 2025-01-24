import React from "react";

import { createRoot } from 'react-dom/client';

import { HashRouter } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap.min.js";

//import * as serviceWorker from "./serviceWorker";
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
