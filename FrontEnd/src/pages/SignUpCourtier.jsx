import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SignUpProcess from "../components/SignUpProcess";
import Step1 from "./signup_courtier/Step1";
import Step2 from "./signup_courtier/Step2";
import Logo from "../components/Logo";

const SignUpCourtier = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex h-full flex-col items-center py-10 bg-white">
      <div className="w-[95%] lg:w-2/3 mx-auto rounded bg-white p-8 relative">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Link to={"/"} className="flex items-center">
              <Logo/>
            </Link>
          </div>
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


export default SignUpCourtier;
