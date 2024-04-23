// hooks/useFetchData.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(false);

    axios.get(url);
    axios
      .get(url)
      .then((response) => {
        const dataArray = response.data.data; // ou une autre clé appropriée
        if (Array.isArray(dataArray)) {
          setData(dataArray);
        } else {
          console.error("La réponse n'est pas un tableau");
          setData([]); // Fallback sur un tableau vide
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
