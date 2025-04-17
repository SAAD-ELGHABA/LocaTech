import { createBrowserRouter } from "react-router-dom";
import Index from "../layouts/UserLayout/Index.user";
import Accueil from "../pages/Accueil";
import Blog from "../pages/Blog";
import Apropos from "../pages/Apropos";
import Merci from "../pages/Merci";
import ContactUs from "../pages/ContactUs";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Block from "../pages/Block";
import Acheter from "../pages/Acheter";
import Louer from "../pages/Louer";
// import ChatAI from "../components/ChatAI/ChatAI";
import GoogleLanding from "../components/GoogleLanding";
import ResetPassword from "../pages/ResetPassword";
import ForgetPassword from "../pages/ForgetPassword";
import SignUpClient from "../pages/SignUpClient";
import RESEND_EMAIL_VERIFICATION from "../pages/RESEND_EMAIL_VERIFICATION";
import VerifyEmail from "../pages/VerifyEmail";
import SignUpCourtier from "../pages/SignUpCourtier";
import Courtier from "../pages/signup_courtier/courtier";
import IndexCourtier from "../layouts/CourtierLayout/IndexCourtier";
import AccessRouteCourtier from "./accessRoute.jsx/AccessRouteCourtier";
import IndexAdmin from "../layouts/AdminLayout/IndexAdmin";
import DashboardIndex from "../layouts/AdminLayout/adminPages/DashboardIndex";
import Courtiers from "../layouts/AdminLayout/adminPages/Courtiers";
import DashboardIndexCourtier from "../layouts/CourtierLayout/Courtierpages/DashboardIndexCourtier";
import MesBiens from "../layouts/CourtierLayout/Courtierpages/MesBiens";
import DetailsBien from "../components/DetailsBien";
import ConsulterBiens from "../pages/ConsulterBiens";
const REGISTER = "/register";
const LOGIN = "/login";
const FORGOT_PASSWORD = "/forgot-password";
const RESET_PASSWORD = "/reset-password";
const CLIENT_SIGNUP = "/client-signup";

const COURTIE_SIGNUP = "/courtier-signup";

const COURTIE = "/courtier";

const VERIFY_EMAIL = "/verify-email/:id/:hash";
const RESEND_EMAIL_VERIFICATION_PATH = "/resend_verification_email";
const GOOGLELANDING = "/google-langing";
const COURTIERS = "/courtiers";

const COURTIE_INDEX = "/courtier-index";
const MESBIENS = "/MesBiens";

const CONSULTER_BIENS = "/consulter-bien";

const DETAILS_BIEN = "/details-bien/:id";
const DETAILS_BIEN_CLIENT = "/details-bien-client/:id";

const ADMIN_INDEX = "/admin-index";
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
        path: "/acheter",
        element: <Acheter />,
      },
      {
        path: "/louer",
        element: <Louer />,
      },
      {
        path: "/Apropos",
        element: <Apropos />,
      },
      {
        path: "/merci",
        element: <Merci />,
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
        element: <SignUpCourtier />,
      },
      {
        path: RESEND_EMAIL_VERIFICATION_PATH,
        element: <RESEND_EMAIL_VERIFICATION />,
      },
      {
        path: VERIFY_EMAIL,
        element: <VerifyEmail />,
      },
      {
        path: COURTIE,
        element: <Courtier />,
      },
      {
        path: DETAILS_BIEN_CLIENT,
        element: <DetailsBien />,
      },
      {
        path: CONSULTER_BIENS,
        element: <ConsulterBiens />,
      },
    ],
  },
  {
    element: (
      <AccessRouteCourtier>
        <IndexCourtier />
      </AccessRouteCourtier>
    ),
    children: [
      {
        path: COURTIE_INDEX,
        index: true,
        element: <DashboardIndexCourtier />,
      },
      {
        path: MESBIENS,
        element: <MesBiens />,
      },
      // {
      //   path: DETAILS_BIEN,
      //   element: <DetailsBien />,
      // },
    ],
  },
  {
    element: <IndexAdmin />,
    children: [
      {
        path: ADMIN_INDEX,
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: COURTIERS,
        element: <Courtiers />,
      },
    ],
  },
]);

export default Router;
