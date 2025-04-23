// Notifications.jsx
import React, { useEffect, useState , useRef} from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../components/firebase/firebase";


const Notifications = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);

  const containerRef = useRef(null);




  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // auto-scroll l-ta7t chaque fois notifications katbdel
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [notifications]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -150 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
        className="bg-white w-full max-w-5xl  h-[90vh] rounded  shadow-2xl p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 cursor-pointer transition"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6">
          🔔 Notifications <span className="text-black-500">({notifications.length})</span>
        </h2>
        <div ref={containerRef} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {notifications.map((notif) => (
            <div key={notif.id} className="bg-gray-100 p-4 rounded-xl">
              {notif.message}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;
