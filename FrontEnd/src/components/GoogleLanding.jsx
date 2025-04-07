import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode'
function GoogleLanding() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(jwtDecode(credentialResponse.credential));
          
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default GoogleLanding;
