import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const Notifications = ({ setShowNotifications, setUnreadCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // Tzid hadi bach nkontroliw wach l'errore l9adit

  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount); 
        setHasError(false);
      } catch (error) {
        if (!hasError) {  
          setHasError(true);
          toast.error("Erreur lors du chargement des notifications");
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [setUnreadCount, hasError]); 
  useEffect(() => {
    // Mock data temporairement
    const mockNotifications = [
      {
        id: 1,
        title: "Bienvenue sur LocaTech !",
        content: "Merci de vous être inscrit sur notre plateforme.",
        date: "2025-04-22",
        read: false,
      },
      {
        id: 2,
        title: "Nouveau bien disponible",
        content: "Un nouveau bien est disponible à Casablanca.",
        date: "2025-04-21",
        read: false,
      },
      {
        id: 3,
        title: "Nouveau message",
        content: "Vous avez reçu un nouveau message de LocaTech.",
        date: "Il y a 2 heures",
        read: false,
      },
      {
        id: 4,
        title: "Annonce ajoutée",
        content: "Votre annonce a été publiée avec succès.",
        date: "Il y a 1 jour",
        read: false,
      },
    ];
    
  
    // Simule le chargement
    setTimeout(() => {
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
      setLoading(false);
    }, 1000); // 1s delay pour simuler chargement
  }, []);
  


  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/api/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error("Erreur pour marquer comme lue", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      // Tla3 notification li ghadi ttsupprima
      const notifToDelete = notifications.find((notif) => notif.id === id);
  
      await axios.delete(`/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif.id !== id)
      );
  
      // Ila kant maqriatch, tn9es men unreadCount
      if (notifToDelete && !notifToDelete.read) {
        setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
      }
  
      toast.success("Notification supprimée");
    } catch (error) {
      console.error("Erreur pour supprimer la notification", error);
    }
  };
  

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[700px] h-[80vh] bg-white rounded shadow-2xl overflow-hidden animate-slideDown">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <X
            className="cursor-pointer text-2xl text-gray-600"
            onClick={() => setShowNotifications(false)}
          />
        </div>
        <div className="overflow-y-auto h-[calc(80vh-64px)] p-4">
          {loading ? (
            <p className="text-gray-500">Chargement...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-500">Aucune notification.</p>
          ) : (
            notifications.map((notif) => (
              <div
  key={notif.id}
  className={`p-3 mb-2 rounded-lg shadow-sm ${
    notif.read ? "bg-gray-100" : "bg-blue-100"
  } hover:bg-gray-200 cursor-pointer transition`}
  onClick={() => {
    if (!notif.read) markAsRead(notif.id);
  }}
>
  <h4 className="font-semibold">{notif.title}</h4>
  <p>{notif.content}</p>
  <span className="text-sm text-gray-500">{notif.date}</span>
  
  <div className="flex justify-between mt-2">
    {!notif.read && (
      <button
        onClick={(e) => {
          e.stopPropagation(); // Empêche la propagation vers le parent
          markAsRead(notif.id);
          toast.success("Marquée comme lue");
        }}
        className="text-blue-500 cursor-pointer"
      >
        Marquer comme lu
      </button>
    )}
    <button
      onClick={(e) => {
        e.stopPropagation(); // Empêche le clic de déclencher markAsRead
        deleteNotification(notif.id);
        toast.success("Notification supprimée");
      }}
      className="text-red-500 cursor-pointer"
    >
      Supprimer
    </button>
  </div>
</div>

            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
