import App from "./App";
import WelcomePage from "./components/WelcomePage";
import SignupPage from "./components/SignupPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
];

export default routes;
