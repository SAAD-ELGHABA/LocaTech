import { useState, useRef, useEffect } from "react";
import { Bell, BellOff, ConciergeBell, Eye, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  const notifications = useSelector((state) => state.notificationsReducer);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`cursor-pointer text-white hover:bg-gray-800 p-2.5 rounded-full relative`}
      >
        <Bell className={`h-5 w-5 ${open && "fill-white"}`} />
        {notifications?.length > 0 && (
          <div className="bg-red-500 w-2.5 h-2.5 rounded-full absolute top-1.5 right-1.5"></div>
        )}
      </button>

      {open && (
        <div className="absolute right-1 top-full w-96 bg-white shadow-lg rounded-md overflow-hidden z-50 min-h-[80vh] max-h-[80vh] overflow-y-scroll border border-gray-300 custom-scrollbar">
          {notifications?.length > 0 ? (
            notifications?.map((n) => (
              <Link
                to={n?.data?.link}
                key={n?.id}
                className={`block mx-3 my-1 p-2 hover:bg-red-100 rounded text-black`}
              >
                <h2 className="text-sm font-bold ">{n?.object}</h2>
                <p className=" text-xs">{n?.body}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-xs mt-2">
                      {n?.created_at ? (
                        n?.created_at &&
                        new Date(n.created_at).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      ) : (
                        <div className="flex items-center space-x-1">
                          <ConciergeBell className="h-3 w-3" />
                          <p>Juste maintenant</p>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center space-y-3 h-100 w-full ">
              <h1>Aucune notification pour le moment</h1>
              <BellOff className="w-10 h-10 text-gray-500" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
