import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SignUpProcess from "../components/SignUpProcess";
import Step1 from "./signup_courtier/Step1";
import Step2 from "./signup_courtier/Step2";

const SignUpCourtier = () => {

  const [step, setStep] = useState(1);

  return (
    <div className="flex h-full flex-col items-center py-10">
      <div className="w-2/3 mx-auto rounded shadow bg-white p-8 relative">
        <div className="text-center">
          <Link to={"/"} className="text-3xl font-bold text-red-500">
            <span className="text-green-500">Loca</span>Tech
          </Link>
          <p className="mt-2 text-lg font-semibold">Bienvenue Courtier</p>
        </div>
        {step === 1 ? (
          <Step1 setStep={setStep} />
        ) : step === 2 ? (
          <Step2 setStep={setStep} />
        ) : (
          <Step1 />
        )}

        <SignUpProcess currentStep={step} />
      </div>
    </div>
  );
};

const Input = ({ label, name, type = "text", required = false }) => (
  <div className="flex items-start w-1/2 flex-col">
    <label className="text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
      placeholder={label}
    />
  </div>
);

export default SignUpCourtier;
