import { createBrowserRouter } from "react-router-dom";
import Index from "../layouts/UserLayout/Index.user";
import Accueil from "../pages/Accueil";
import Blog from "../pages/Blog";
import ContactUs from "../pages/ContactUs";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import GoogleLanding from "../components/GoogleLanding";

const REGISTER = "/register";
const LOGIN = "/login";
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
    ],
  },
]);

export default Router;
