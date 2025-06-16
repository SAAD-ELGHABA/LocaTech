import axios from "axios";
import { BellOff, BellRing, ConciergeBell, Eye, Trash, X } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Notifications({ onClose }) {
  const notifications = useSelector((state) => state.notificationsReducer);
  useEffect(() => {
    const markAsReadfun = async () => {
      const res = await axios.get(`/api/mark-notifications-read`);
    };
    markAsReadfun();
  }, []);
  return (
    <div
      className="fixed w-[100vw] top-0 right-0 h-screen bg-[#0000006b] flex justify-center items-center"
      style={{ zIndex: 1006 }}
      onClick={() => onClose(true)}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 lg:w-[30%] bg-white h-full shadow-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" h-full" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-2 mx-8 mt-4">
          <div className=" flex items-center space-x-2 pb-2 border-b border-gray-400">
            <BellRing className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Mes Notifications</h1>
          </div>
            <X className="cursor-pointer"
              onClick={()=>{
                onClose(true)
              }}
            />
          </div>
          <div className="overflow-y-scroll h-[85%] custom-scrollbar">
            {notifications?.length > 0 ? (
              notifications?.map((n) => (
                <Link
                  to={n?.data?.link}
                  key={n?.id}
                  className={`block mx-3 my-1 p-2 hover:bg-red-100 rounded `}
                >
                  <h2 className="text-sm font-bold">{n?.object}</h2>
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
                    {/* <div className="flex justify-end items-center space-x-2 border-b border-gray-200">
                      <span className="flex items-center space-x-2 text-xs bg-red-50 p-2 rounded hover:bg-red-200 cursor-pointer">
                        <p>Marquer comme lu</p>
                        <Eye className="h-4 w-4" />
                      </span>
                      <Trash className="h-4 w-4" />
                    </div> */}
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center space-y-3 h-full w-full ">
                <h1>Aucune notification pour le moment</h1>
                <BellOff className="w-10 h-10 text-gray-500" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Notifications;
