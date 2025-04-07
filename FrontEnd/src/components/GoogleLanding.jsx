import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "sonner";

function GoogleLanding() {
  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const { email, email_verified } = decoded;
    const formData = {
      email: email,
      email_verified: email_verified,
    };
    try {
      const response = await axios.post("/api/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200) {
        toast.success(response.data.message);
        console.log(response);
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
