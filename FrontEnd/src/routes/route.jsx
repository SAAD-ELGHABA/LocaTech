import { createBrowserRouter } from "react-router-dom";
import Index from "../layouts/UserLayout/Index.user";
import Accueil from "../pages/Accueil";
import Blog from "../pages/Blog";
import ContactUs from "../pages/ContactUs";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Block from "../pages/Block";
import GoogleLanding from "../components/GoogleLanding";
import ResetPassword from "../pages/ResetPassword";
import ForgetPassword from "../pages/ForgetPassword";
import SignUpClient from "../pages/SignUpClient";
import RESEND_EMAIL_VERIFICATION from "../pages/RESEND_EMAIL_VERIFICATION";
import VerifyEmail from "../pages/VerifyEmail";
const REGISTER = "/register";
const LOGIN = "/login";
const FORGOT_PASSWORD = "/forgot-password";
const RESET_PASSWORD = "/reset-password";
const CLIENT_SIGNUP = "/client-signup";
const COURTIE_SIGNUP = "/courtier-signup";
const VERIFY_EMAIL = '/verify-email/:id/:hash'
const RESEND_EMAIL_VERIFICATION_PATH = "/resend_verification_email";
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
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/block",
        element: <Block />,
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
      },
      {
        path: RESEND_EMAIL_VERIFICATION_PATH,
        element: <RESEND_EMAIL_VERIFICATION />,
      },
      {
        path:VERIFY_EMAIL,
        element:<VerifyEmail/>
      }
    ],
  },
]);

export default Router;
