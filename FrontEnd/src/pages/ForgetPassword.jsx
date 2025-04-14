import React, { useState } from "react";
import asideimg from "../assets/login-signup-img.png";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import {
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  const handleForgetPwt = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const info = {
      email: data.get("email"),
    };
    setLoading(true);
    try {
      const toastLoading = toast.loading("wait for it ...");
      const response = await axios.post("/api/forgot-password", info);
      if (response.status >= 200) {
        toast.dismiss(toastLoading);
        if (response) {
          toast.success(response.data.message, {
            duration: 5000,
            description: (
              <span className="text-white">
                Accédez à votre boîte mail et consultez nos messages, puis
                réinitialisez votre mot de passe.
              </span>
            ),
            style: {
              backgroundColor: "#1F2937",
              color: "rgb(0, 182, 0)",
              border: "none",
            },
          });
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
    <div>
      <div className="flex">
        <div className="w-full md:w-1/3 flex mt-32 justify-center ">
          <div className="max-w-md w-4/6 space-y-2 mt-20">
            {/* Logo */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-500">
                <span className="text-green-500">Loca</span>Tech
              </h1>
              <p className="mt-2 text-lg font-semibold">Bienvenue</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleForgetPwt}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Entrez votre adresse email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
                />
              </div>

              <button
                type="submit"
                className={`cursor-pointer text-sm w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 flex items-center justify-center ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-600"
                }`}
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="text-green-500 hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div
          className="hidden md:block w-2/3 bg-cover bg-center"
          style={{
            backgroundImage: "url(accueil 1.png)", // Replace with actual path
          }}
        >
          <img src={asideimg} alt="aside image" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
