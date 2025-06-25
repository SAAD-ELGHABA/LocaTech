import axios from "axios";
import React, { useEffect, useState } from "react";

function Affaires() {
  const [isLoading, setIsLoading] = useState(true);
  const fetchAffaires = async () => {
    try {
      const response = await axios.get("/api/get-affaires", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAffaires();
  }, []);
  return <div>Affaires</div>;
}

export default Affaires;
