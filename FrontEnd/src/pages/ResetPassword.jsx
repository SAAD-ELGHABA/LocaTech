import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import asideimg from "../assets/login-signup-img.png";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const handleFormData = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const info = {
      email: email,
      token: token,
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
    };
    setLoading(true);
    try {
      const toastLoading = toast.loading("attends ça ...");
      const response = await axios.post("/api/reset-password", info);
      if (response.status >= 200) {
        toast.dismiss(toastLoading);
        if (response) {
          toast.success(response.data.message, {
            duration: 5000,
            style: {
              backgroundColor: "#1F2937",
              color: "rgb(0, 182, 0)",
              border: "none",
            },
          });
          nav("/login");
        } else {
          toast.warning(response.data, {
            duration: 3000,
            style: {
              backgroundColor: "#1F2937",
              color: "yellow",
              border: "none",
            },
          });
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message, {
        duration: 3000,
        icon: (
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-red-600"
          />
        ),
        style: {
          backgroundColor: "#1F2937",
          color: "white",
          border: "none",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="md:block lg:w-1/2 w-full flex h-screen items-center justify-center  ">
        <form onSubmit={handleFormData} className=" lg:w-1/2 mx-auto lg:mt-52">
        <h1 className="text-xl font-bold">Réinitialisez votre mot de passe</h1>
          <div className="py-1 ">
            <label className="block text-sm mb-1">mot de passe</label>
            <div></div>
            <input
              type={`${visiblePassword ? "text" : "password"}`}
              name="password"
              placeholder="entrer votre nouveau mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="py-1 ">
            <label className="block text-sm mb-1">confirmer le mot de passe</label>
            <div></div>
            <input
              type={`${visiblePassword ? "text" : "password"}`}
              name="password_confirmation"
              placeholder="mot de passe confirmation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              name="show"
              id="show"
              onChange={() => setVisiblePassword(!visiblePassword)}
            />
            <label htmlFor="show" className="ms-2">
              voir password
            </label>
          </div>
          <button
            className={`cursor-pointer w-full text-sm ${
              loading ? "bg-slate-500 text-slate-800" : "bg-red-500 text-white"
            }   py-2 rounded hover:${loading ? "" : "bg-red-600"} transition `}
          >
            envoie réinitialiseation de mot de passe
          </button>
          <div className="text-center w-full mt-3">
            <Link
              to={"/login"}
              className="cursor-pointer text-red-400 text-sm hover:text-red-500"
            >
              return et s'inscrir
            </Link>
          </div>
        </form>
      </div>
      <div
        className="hidden md:block  w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url(accueil 1.png)", 
        }}
      >
        <img src={asideimg} alt="aside image" />
      </div>
    </div>
  );
};

export default ResetPassword;
