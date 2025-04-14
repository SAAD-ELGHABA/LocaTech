import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import verifiiedIcon from "../assets/verifiied-icon.png";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions";
const VerifyEmail = () => {
  const { id, hash } = useParams();
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [allowed, setAllowed] = useState(false);
  axios.defaults.withCredentials = true;
  const getCsrfToken = async () => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  };
  const dispatch = useDispatch();
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
        setMessage("Email a été verifieé !");
        if (response.status >= 200 && response.status <= 300) {
          setAllowed(true);
          dispatch(register(token, response.data.user));
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
    <div className="flex items-center justify-center min-h-screen ">
      {loading ? (
        <div className="w-1/5 flex justify-center">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin " />
        </div>
      ) : (
        <div className="text-center flex flex-col justify-center ">
          <img
            src={verifiiedIcon}
            alt="email-verified"
            className="w-20 mx-auto"
          />
          <h2>{message}</h2>
          {allowed ? (
            <Link to={"/user"} target="_blank" className="text-green-500 px-4">
              Aller au LocaTech
            </Link>
          ) : (
            <div className="">
              <p className="text-gray-500">
                s'il y a un problème, revenez en arrière et renvoyez un e-mail
                de vérification{" "}
              </p>
              <Link className="text-blue-400" to={"/resend_verification_email"}>
                aller retourner
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
