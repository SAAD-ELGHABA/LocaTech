import React from "react";
import success from "../../assets/success-icon.png";
import { Link } from "react-router-dom";
function Courtier() {
  return (
    <div className="h-screen flex justify-center items-center flex-col text-center">
      <div>
        <img src={success} alt="succès" className="h-20"/>
      </div>
      <p className="w-1/3">
        vous avez crée votre compte avec succès.. après environ 24h votre compte
        sera accepté par l'administration puis vous pourrez poster des biens... <Link className="text-blue-500">
            lire plus
        </Link>
      </p>
    </div>
  );
}

export default Courtier;
