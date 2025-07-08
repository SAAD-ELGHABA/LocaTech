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
import Users from "../layouts/AdminLayout/adminPages/Users";
import ActivateCourtiers from "../layouts/AdminLayout/adminPages/ActivateCourtiers";
import RecentCourtiers from "../layouts/AdminLayout/adminPages/RecentCourtiers";
import Assistants from "../layouts/AdminLayout/adminPages/Assistants";
import Agences from "../layouts/AdminLayout/adminPages/Agences";
import Admins from "../layouts/AdminLayout/adminPages/Admins";
import AssistantIndex from "../layouts/AssistantLayout/AssistantIndex";
import DashboardAssistant from "../layouts/AssistantLayout/AssistantPages/DashboardAssistant";
import ChatRealTimePage from "../pages/ChatRealTime/ChatRealTimePage";
import IndexPage from "../pages/ChatRealTime/ChatPages/IndexPage";
import Conversation from "../pages/ChatRealTime/ChatPages/Conversation";
import AccessRouteAssistant from "./accessRoute.jsx/AccessRouteAssistant";
import Conversations from "../layouts/AssistantLayout/AssistantPages/Conversations";
import Profile from "../layouts/UserLayout/userPages/Profile";
import CentreAide from "../layouts/UserLayout/userPages/CentreAide";
import Evaluations from "../layouts/AdminLayout/adminPages/Evaluations";
import ProfileCourtier from "../layouts/CourtierLayout/Courtierpages/ProfileCourtier";
import Control from "../layouts/AssistantLayout/AssistantPages/Control";
import ControlAccord from "../layouts/AssistantLayout/AssistantPages/ControlAccord";
import SignalControl from "../layouts/AssistantLayout/AssistantPages/SignalControl";
import AccordControl from "../layouts/AssistantLayout/AssistantPages/AccordControl";
import BlogDetails from "../components/BlogDetails";
import Affaires from "../layouts/AdminLayout/adminPages/Affaires";
import AccessRouteAdmin from "./accessRoute.jsx/AccessRouteAdmin";
import AffaireDetails from "../layouts/AdminLayout/AdminComponents/AffaireDetails";
import TransactionDetails from "../pages/TransactionDetails";
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
const RECENT_COURTIERS = "recent-courtiers";

const COURTIE_INDEX = "/courtier-index";
const MESBIENS = "/MesBiens";

const CONSULTER_BIENS = "/consulter-bien";
const TABLEA_DE_BORD_ADMIN = "tableau-de-bord-admin";
const ASSISTANTS_ADMIN = "assistants-admin";

// const DETAILS_BIEN = "/bien/:ville/:slag";
const DETAILS_BIEN_CLIENT = "/bien/:ville/:slag";

const GET_USERS = "utilisateurs";
const COURTIERS = "courtiers";
const GET_COURTIER = "activate-courtier";

const ADMIN_INDEX = "/admin-index";

const ASSISTANT_INDEX = "/assistant-index";

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
      {
        path: "/profile-client",
        element: <Profile />,
      },
      {
        path: "/parametre-client",
        element: <></>,
      },
      {
        path: "/centre-aide",
        element: <CentreAide />,
      },
      {
        path: "/blog-article-details/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/transactions/:transactionId",
        element: <TransactionDetails />,
      },
    ],
  },
  {
    element: <ChatRealTimePage />,
    children: [
      {
        path: "/chat/negocier",
        element: <IndexPage />,
      },
      {
        path: "/chat/conversation/:idConversation",
        element: <Conversation />,
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
      {
        path: "/profile-courtier",
        element: <ProfileCourtier />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AccessRouteAdmin>
        <IndexAdmin />
      </AccessRouteAdmin>
    ),
    children: [
      {
        path: TABLEA_DE_BORD_ADMIN,
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: RECENT_COURTIERS,
        element: <RecentCourtiers />,
      },
      {
        path: GET_USERS,
        element: <Users />,
      },
      {
        path: GET_COURTIER,
        element: <ActivateCourtiers />,
      },
      {
        path: COURTIERS,
        element: <Courtiers />,
      },
      {
        path: TABLEA_DE_BORD_ADMIN,
        element: <DashboardIndex />,
      },
      {
        path: ASSISTANTS_ADMIN,
        element: <Assistants />,
      },
      {
        path: "agences",
        element: <Agences />,
      },
      {
        path: "admins",
        element: <Admins />,
      },
      {
        path: "evaluations",
        element: <Evaluations />,
      },
      {
        path: "affaires",
        element: <Affaires />,
      },
      {
        path: "affaire/:courtierId/:clientId/:accordId",
        element: <AffaireDetails />,
      },
    ],
  },
  {
    element: (
      <AccessRouteAssistant>
        <AssistantIndex />
      </AccessRouteAssistant>
    ),
    children: [
      {
        index: true,
        path: ASSISTANT_INDEX,
        element: <DashboardAssistant />,
      },
      {
        path: ASSISTANT_INDEX,
        element: <DashboardAssistant />,
      },
      {
        path: "/all-conversations",
        element: <Conversations />,
      },
      {
        path: "/control-courtiers",
        element: <Control />,
      },
      {
        path: "/control-accord",
        element: <ControlAccord />,
      },
      {
        path: "/signal-control",
        element: <SignalControl />,
      },
      {
        path: "/accord-control",
        element: <AccordControl />,
      },
    ],
  },
]);

export default Router;
