import React from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Outlet } from "react-router-dom";

function index() {
  const hideNavBarInPages = [
    "/login",
    "/register",
    "/forget_password",
    "/reset-password",
  ];
  return <div>
    {/* <Navbar /> */}
    <div>
          {!hideNavBarInPages.includes(location.pathname) && <Navbar /> }
          {/* <ParticlesBackground /> */}
          <Outlet />
          {!hideNavBarInPages.includes(location.pathname) && <Footer />}
      </div>
    
    
  </div>;
}

export default index;
