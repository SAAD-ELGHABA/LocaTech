import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function GoogleLanding() {
  const nav = useNavigate();
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
        setTimeout(() => {
          nav("/");
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
