import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function GoogleLanding() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const response = await axios.post("/api/googleAuth", decoded, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200) {
        toast.success(response.data.message);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        dispatch({
          type:'LOGIN',
          payload:response.data.user
        })
        setTimeout(() => {
          if (response.data.user.role === "user") {
            nav("/");
          } else if (response.data.user.user.role === "courtier") {
            nav("/courtier-index");
          }
        }, 2000);
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleLoginError = () => {
    toast.error("Login Failed");
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        auto_select={true}
      />
    </div>
  );
}

export default GoogleLanding;
