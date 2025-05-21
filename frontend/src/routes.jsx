import App from "./App";
import WelcomePage from "./components/WelcomePage";
import SignupPage from "./components/SignupPage";
import ApplicationPage from "./components/ApplicationPage/ApplicationPage";

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
      {
        path: "/MessagingApp/Account/:username",
        element: <ApplicationPage />,
      },
    ],
  },
];

export default routes;
