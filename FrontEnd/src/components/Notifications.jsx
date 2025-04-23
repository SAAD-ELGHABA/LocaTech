import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";
import { subscribe } from "./sendNotifications/sendNotifications";
import { toast } from "sonner"; 

const Notifications = ({ onClose }) => {
  const [firebaseNotifications, setFirebaseNotifications] = useState([]);
  const [localNotifications, setLocalNotifications] = useState([]);
  const containerRef = useRef(null);

  // 1. écouter les notifications locales via `subscribe()`
  useEffect(() => {
    const unsubscribe = subscribe(setLocalNotifications);
    return () => unsubscribe();
  }, []);

  // 2. écouter les notifications de Firebase en temps réel
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        message: doc.data().message,
        date: doc.data().date || new Date().toLocaleString(),
        read: doc.data().read || false,
        source: 'firebase'  
      }));
      setFirebaseNotifications(data);
    });

    return () => unsubscribe();
  }, []);

  // 3. Fonction pour marquer toutes les notifications comme lues
  const markAllAsRead = async (notifications) => {
    const unread = notifications.filter(n => !n.read);
    for (const notif of unread) {
      const notifRef = doc(db, "notifications", notif.id);
      await updateDoc(notifRef, { read: true });
    }
    // toast.success("Toutes les notifications ont été marquées comme lues!");
  };

  // 4. Exécuter une seule fois quand on ouvre les notifications
  useEffect(() => {
    if (firebaseNotifications.length > 0) {
      markAllAsRead(firebaseNotifications);
    }
  }, [firebaseNotifications]);

  // 5. Scroll automatique
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [firebaseNotifications, localNotifications]);

  // 6. Fusionner les deux
  const notifications = [...firebaseNotifications, ...localNotifications]
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 

  // 7. Marquer notification comme lue (simulé pour local, ou toast seulement)
  const markAsRead = (id) => {
    toast.success("Notification marquée comme lue!");  
  };

  // 8. Supprimer une notification
  const deleteNotification = async (id, source) => {
    if (source === 'firebase') {
      await deleteDoc(doc(db, "notifications", id));
      toast.success("Notification supprimée!");
    } else {
      setLocalNotifications(prevNotifications => {
        const updatedNotifications = prevNotifications.filter(notif => notif.id !== id);
        const deletedNotifications = JSON.parse(localStorage.getItem('deletedNotifications')) || [];
        deletedNotifications.push(id);
        localStorage.setItem('deletedNotifications', JSON.stringify(deletedNotifications));
        return updatedNotifications;
      });
      toast.success("Notification supprimée!");
    }
  };

  // 9. Ne pas réafficher les notifications locales supprimées
  useEffect(() => {
    const deletedNotifications = JSON.parse(localStorage.getItem('deletedNotifications')) || [];
    setLocalNotifications(prevNotifications => 
      prevNotifications.filter(notif => !deletedNotifications.includes(notif.id))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -150 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
        className="bg-white w-full max-w-5xl h-[90vh] rounded shadow-2xl p-8 relative"
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
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center">Aucune notification pour le moment.</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="bg-gray-100 p-4 rounded-xl">
                <div className="font-medium text-gray-800">{notif.message}</div>
                <div className="text-xs text-gray-500 mt-1">{notif.date}</div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Marquer comme lue
                  </button>
                  <button
                    onClick={() => deleteNotification(notif.id, notif.source)}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;
