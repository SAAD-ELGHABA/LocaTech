import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchInitialData } from "../functions/fetchInitialData";
import { sendNotification } from "./sendNotifications/sendNotifications";

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
        await fetchInitialData(dispatch, response.data.token);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "courtier") {
          dispatch({
            type: "ActuelCourtier",
            payload: response.data.courtier,
          });
        }
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        dispatch({
          type: "LOGIN",
          payload: response.data.user,
        });

        sendNotification(`✅ ${response.data.user.name || "Utilisateur"} s'est connecté avec Google.`);
        setTimeout(() => {
          if (response.data.user.role === "user") {
            nav("/");
          } else if (response.data.user.role === "courtier") {
            nav("/courtier-index");
          }
        }, 100);
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.log(error);
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
