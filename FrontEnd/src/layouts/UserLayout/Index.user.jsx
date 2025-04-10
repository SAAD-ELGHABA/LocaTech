import React from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Outlet, useLocation } from "react-router-dom";

function Index() {
  const location = useLocation();
  const hideNavBarInPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const shouldHide = hideNavBarInPages.some(path => location.pathname.startsWith(path));

  return (
    <div>
      {!shouldHide && <Navbar />}
      
      <Outlet />
      
      {!shouldHide && <Footer />}
    </div>
  );
}

export default Index;
