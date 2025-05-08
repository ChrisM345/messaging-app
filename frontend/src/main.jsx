import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/index.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
