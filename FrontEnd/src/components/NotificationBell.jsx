import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    { id: 1, message: "Nouvelle annonce approuvée" },
    { id: 2, message: "Un message de l’agence X" },
    { id: 3, message: "Votre profil a été mis à jour" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer text-white hover:bg-gray-800 p-2.5 rounded-full"
      >
        <Bell className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 min-h-96 border border-gray-300">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              Aucune notification
            </div>
          ) : (
            notifications.map((note) => (
              <div
                key={note.id}
                className="p-3 text-sm text-black hover:bg-gray-100 cursor-pointer  last:border-none"
              >
                {note.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
