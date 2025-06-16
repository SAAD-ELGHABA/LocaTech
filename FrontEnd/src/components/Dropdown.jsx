import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  options = [],
  selected,
  setSelected,
  placeholder = "Select",
  onValidate = () => console.log("Validated:", selected),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen(!isOpen);

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
    <div ref={dropdownRef} className="relative inline-block text-left w-48">
      <div
        onClick={toggleDropdown}
        className="border border-gray-300 rounded px-4 py-2 cursor-pointer bg-white flex justify-between items-center"
      >
        {selected || placeholder}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <label
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
              >
                <input
                  type="radio"
                  name="dropdown-option"
                  value={option}
                  checked={selected === option}
                  onChange={() => setSelected(option)} 
                  className="accent-red-500 cursor-pointer"
                />
                <span>{option}</span>
              </label>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options</div>
          )}

          <div className="border-t mx-4 border-gray-400 py-2 flex justify-end items-center">
            <button
              onClick={() => {
                onValidate(selected);
                setIsOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
