import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import emailVerify from '../assets/e-mail-verify.gif'
function RESEND_EMAIL_VERIFICATION() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const handleResendEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/email/verification-notification",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setMessage(response.data.message);
      if (response.status >= 200) {
        toast.success(message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to resend email.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen text-center bg-white">
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin w-8" />
      ) : (
        <div> 
          <img src={emailVerify} alt="verify-email" className="w-20 mx-auto"/>
          <h1 className="">
            nous vous avons envoyé un e-mail, vérifiez-le pour terminer votre
            inscription !
          </h1>
          <p>
            ou{"  "}
            <span>
              <button onClick={handleResendEmail}>
                <p className="text-red-500 cursor-pointer">renvoie email</p>
              </button>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default RESEND_EMAIL_VERIFICATION;
