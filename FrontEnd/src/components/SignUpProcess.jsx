import React from "react";
const steps = ["personnelles info", "Agence info"];
function SignUpProcess({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-4 my-10  ">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex items-center gap-2 ">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold
            ${
              isActive
                ? "bg-green-600 text-white"
                : isCompleted
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }
          `}
            >
              {stepNumber}
            </div>
            <span
              className={`text-xs ${
                isActive ? "text-green-600  font-semibold" : "text-gray-600"
              }`}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-10 h-1 ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                } mx-1`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SignUpProcess;
