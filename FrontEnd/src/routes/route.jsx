import { createBrowserRouter } from "react-router-dom";
import Index from "../layouts/UserLayout/Index.user";
import Accueil from "../pages/Accueil";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import GoogleLanding from "../components/GoogleLanding";
import ResetPassword from "../pages/ResetPassword";
import ForgetPassword from "../pages/ForgetPassword";
import SignUpClient from "../pages/SignUpClient";

const REGISTER = "/register";
const LOGIN = "/login";
const FORGOT_PASSWORD = "/forgot-password";
const RESET_PASSWORD = "/reset-password";
const CLIENT_SIGNUP = "/client-signup";
const COURTIE_SIGNUP = "/courtier-signup";
const GOOGLELANDING = "/google-langing";
const HOME = "/";
const Router = createBrowserRouter([
  {
    element: <Index />,
    children: [
      {
        path: HOME,
        index: true,
        element: <Accueil />,
      },
      {
        path: REGISTER,
        element: <SignUp />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: GOOGLELANDING,
        element: <GoogleLanding />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ForgetPassword />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: CLIENT_SIGNUP,
        element: <SignUpClient />,
      },
      {
        path: COURTIE_SIGNUP,
        // element: <SignUpClient />,
      }
    ],
  },
]);

export default Router;
