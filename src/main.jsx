import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "../src/components/ui/provider";
import { Theme } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <Theme appearance="light">
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>
);
