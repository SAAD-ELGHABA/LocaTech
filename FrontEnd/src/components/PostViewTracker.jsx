import { useEffect, useRef } from "react";
import axios from "axios";

const BienViewTracker = ({ bienId, userId }) => {
  const bienRef = useRef();
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!bienId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackPostView(bienId, userId);
            hasTrackedView.current = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -50px 0px" }
    );

    if (bienRef.current) {
      observer.observe(bienRef.current);
    }

    return () => observer.disconnect();
  }, [bienId, userId]);

  const trackPostView = async (bienId, userId) => {
    try {
      await axios.post("/api/biens/view", {
        bien_id: bienId,
        user_id: userId,
      });
    } catch (error) {
      console.error("Error tracking post view:", error);
    }
  };

  return <div ref={bienRef} />;
};

export default BienViewTracker;
