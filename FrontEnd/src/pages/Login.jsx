import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import asideimg from "../assets/login-signup-img.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleLanding from "../components/GoogleLanding";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/Logo";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { sendNotification } from "../components/sendNotifications/sendNotifications";



const LoginPage = () => {
  const [showpwtd, setShowPwt] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.email || !data.password) {
      toast.error("Veuillez remplir tous les champs !");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200) {
        toast.success(response.data.message);
        console.log(response.data.user);
        dispatch(login(response.data.token, response.data.user));
        localStorage.setItem("token", response.data.token);


        sendNotification(`✅ ${response.data.user.name || "Utilisateur"} s'est connecté avec succès.`);



        setTimeout(() => {
          if (response.data.user.role === "user") {
            nav("/");
          } else if (response.data.user.role === "courtier") {
            nav("/courtier-index");
          }
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex ">
      <div className="w-full md:w-1/3  flex mt-32 justify-center  ">
        <div className="max-w-md w-4/6 space-y-2">
          <div className="text-center flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            <p className="mt-2 text-lg font-semibold">Bienvenue</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Veuillez entrer votre adresse email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showpwtd ? "text" : "password"}
                  placeholder="Veuillez entrer votre mot de passe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPwt(!showpwtd)}
                >
                  {showpwtd ? (
                    <AiOutlineEye className="text-gray-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-300" />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className={`text-sm w-full py-3 px-4  text-white font-semibold rounded-lg  focus:outline-none focus:ring-2  transition duration-200 flex items-center justify-center ${
                isloading
                  ? "cursor-not-allowed bg-red-300"
                  : "cursor-pointer bg-red-500 hover:bg-red-600 focus:ring-red-400"
              }`}
            >
              {isloading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "Connexion"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            <Link to={"/forgot-password"} className="hover:underline">
              Mot de passe oublié !
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600">
            Vous n’avez pas encore de compte ?{" "}
            <Link to={"/register"} className="font-semibold hover:underline">
              Créer un compte
            </Link>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">ou</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="w-full flex items-center justify-center">
            <GoogleLanding />
          </div>

          <p className="text-xs text-center text-gray-500 mt-6">
            © LocaTech - Les Conditions générales et mentions légales et la
            Politique de confidentialité  de Digital
          </p>
        </div>
      </div>

      <div
        className="hidden md:block w-2/3 bg-cover bg-center"
        style={{
          backgroundImage: "url(accueil 1.png)",
        }}
      >
        <img src={asideimg} alt="aside image" className="w-full" />
      </div>
    </div>
  );
};

export default LoginPage;
