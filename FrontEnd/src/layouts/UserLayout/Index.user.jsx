import React from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Outlet, useLocation } from "react-router-dom";
import PhoneNav from "../../components/PhoneNav";

function Index() {
  const location = useLocation();
  const hideNavBarInPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/courtier-signup",
    "/verify-email/:id/:hash",
    "/client-signup",
  ];

  const shouldHide = hideNavBarInPages.some(path => location.pathname.startsWith(path));

  return (
    <div>
      {!shouldHide && <Navbar />}
      
      <Outlet />
      {!shouldHide && <PhoneNav/>}
      {!shouldHide && <Footer />}
    </div>
  );
}

export default Index;
