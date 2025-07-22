import React from "react";

const steps = ["Infos personnelles", "Agence"];

function SignUpProcess({ currentStep }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-8 mt-8">
      <div className="flex items-center justify-between relative">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex-1 flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg scale-105"
                    : isCompleted
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {stepNumber}
              </div>

              <div
                className={`mt-2 text-[0.7rem] text-center sm:text-sm ${
                  isActive ? "text-red-600 font-medium" : "text-gray-600"
                }`}
              >
                {label}
              </div>
            </div>
          );
        })}

        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 z-0 mx-5 sm:mx-8 rounded">
          <div
            className="h-1 bg-red-500 rounded transition-all duration-300"
            style={{
              width:
                steps.length > 1
                  ? `${((currentStep - 1) / (steps.length - 1)) * 100}%`
                  : "0%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SignUpProcess;
