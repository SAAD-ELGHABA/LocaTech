import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function AccessRouteCourtier({ children, role = "courtier", path = "/" }) {
  const token = useSelector((state) => state.userReducer.token);
  const user = useSelector(
    (state) =>
      (state.userReducer.userInfo && state.userReducer.userInfo.user) ||
      state.userReducer.userInfo
  );
  const userRole = user ? user.role : null;
console.log(user);

  return user && user.email_verified_at && userRole === role ? (
    children
  ) : (
    <Navigate to={path} />
  );
}

export default AccessRouteCourtier;
