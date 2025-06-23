import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { fetchUserById } from "../services/userService";

export const useFullUser = () => {
  const { user } = useUser();
  const [fullUser, setFullUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      if (!user?.id) return;
      try {
        const data = await fetchUserById(user.id);
        setFullUser(data);
      } catch (err) {
        setErrorUser("Impossible de charger les infos utilisateur.");
      } finally {
        setLoadingUser(false);
      }
    };
    fetch();
  }, [user]);

  return { fullUser, loadingUser, errorUser };
};
