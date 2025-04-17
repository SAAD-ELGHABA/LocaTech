import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function AccessRouteCourtier({ children, role = "user", path = "/courtier-index" }) {
  const token = useSelector((state) => state.userReducer.token);
  const user = useSelector((state) => state.userReducer.user);
  const userRole = useSelector((state) =>
    user ? state.userReducer.user.user.role : null
  );
  
  return user && user.user.email_verified_at && userRole === role ? (
    children
  ) : (
    <Navigate to={path} />
  );
}

export default AccessRouteCourtier;
