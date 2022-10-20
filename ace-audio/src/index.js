import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import "bootstrap/dist/css/bootstrap.min.css";
import "react-sortable-tree/style.css";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
