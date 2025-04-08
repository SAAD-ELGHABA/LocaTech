import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const VerifyEmail = () => {
  const { id, hash } = useParams();
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [allowed, setAllowed] = useState(false);
  axios.defaults.withCredentials = true;
  const getCsrfToken = async () => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const verifyEmail = async () => {
      await getCsrfToken();
      try {
        const response = await axios.get(`/api/email/verify/${id}/${hash}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setMessage(response.data.message);
        if (response.status >= 200) {
          setAllowed(true);
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed.");
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [id, hash, token]);

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      {loading ? (
        <div className="w-1/5 flex justify-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin " />
        </div>
      ) : (
        <div className="text-center">
          <h2>{message}</h2>
          {allowed ? (
            <Link to={"/user"} target="_blank" className="text-green-500 px-4">
              Go to the next
            </Link>
          ) : (
            <div className="">
              <p className="text-gray-500">
                if there is a probleme go back and resend a verifcation email{" "}
              </p>
              <Link className="text-blue-400" to={"/resend_verification_email"}>
                go back
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
