import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { clientRoutes } from "../routes/client.routes";
export default function Template() {
  const [currentTour, setCurrentTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tour } = useParams();
  console.log(tour);

  useEffect(() => {
    fetch(clientRoutes.getCurrentTour + tour)
      .then((res) => res.json())
      .then((data) => {
        setCurrentTour(data.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки городов:", err);
        setLoading(false);
      });
  }, []);

    
  if (loading) return <div>Загрузка тура...</div>;

  return <div>{Object.values(currentTour).map(item => item)}</div>;
}
