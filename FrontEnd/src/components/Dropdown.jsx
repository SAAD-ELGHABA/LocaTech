import axios from "axios";
import { Check, LoaderCircle, Trash } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { sendNotification } from "../functions/NotificationSender";
import { useSelector } from "react-redux";
const Dropdown = ({ idAccord, placeholder, setAccordUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userReducer.userInfo);
  const onValidate = async () => {
    setIsLoading(true);
    if (selected) {
      console.log("Option validée :", selected);
      try {
        const response = await axios.post(
          "/api/accords/validate",
          { idAccord, status: selected === "Valider" ? "validé" : "refusé" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        toast.success("Accord a été traité avec succès");
        await sendNotification(
          user?.id,
          -1,
          "Validation d'un accord",
          `Le status de cet accord devient ${selected} par l'assistant !`,
          {
            link: "/admin/affaires",
          }
        );
        setAccordUpdated((prev) => !prev);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsOpen(false);
      }
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const options = [
    {
      value: "Valider",
      label: "Valider et lancer à l'administration",
      icon: <Check className="h-4 w-4" />,
    },
    {
      value: "Refuser",
      label: "Refuser et supprimer l'accord",
      icon: <Trash className="h-4 w-4" />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-66">
      <div
        onClick={toggleDropdown}
        className="border border-gray-300 rounded px-4 py-2 cursor-pointer bg-white flex justify-between items-center"
      >
        {selected
          ? options.find((opt) => opt.value === selected)?.label
          : placeholder}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <label
                key={index}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              >
                <input
                  type="radio"
                  name="dropdown-option"
                  value={option.value}
                  checked={selected === option.value}
                  onChange={() => setSelected(option.value)}
                  className="accent-red-500 cursor-pointer"
                />
                <div className="flex items-center space-x-1">
                  {option.icon && (
                    <span className="inline-block mr-2">{option.icon}</span>
                  )}
                  <span>{option.label}</span>
                </div>
              </label>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options</div>
          )}

          <div className="border-t mx-4 border-gray-300 py-2 flex justify-end items-center">
            <button
              onClick={() => {
                onValidate();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer min-w-20 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="animate-spin">
                  <LoaderCircle className="h-4 w-4" />
                </span>
              ) : (
                <span>Valider</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
