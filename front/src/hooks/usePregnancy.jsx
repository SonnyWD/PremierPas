import { useEffect, useState } from "react";
import { fetchPregnancy } from "../services/pregnancyService";

export function usePregnancy() {
  const [pregnancy, setPregnancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPregnancy();
        setPregnancy(data);
      } catch (err) {
        setError("Erreur lors du chargement de la grossesse");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { pregnancy, loading, error };
}
