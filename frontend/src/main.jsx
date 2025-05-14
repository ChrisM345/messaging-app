import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/index.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
