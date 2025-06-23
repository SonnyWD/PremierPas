import { useState, useEffect } from "react";
import { fetchPregnancy }      from "../services/pregnancyService";

export const usePregnancy = () => {
  const [pregnancy, setPregnancy] = useState(null);
  const [loading,    setLoading]  = useState(true);
  const [error,      setError]    = useState(null);

  const refresh = async () => {
    try {
      const data = await fetchPregnancy();
      setPregnancy(data);
    } catch {
      setError("Impossible de charger la grossesse.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  return { pregnancy, loading, error, refresh };
};
