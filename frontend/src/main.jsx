import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </>
);
