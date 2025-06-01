import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("userPayload");

    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        const userForContext = {
          id: parsedUser.sub, 
          email: parsedUser.email,
          type_profil: parsedUser.type_profil,
          isPremium: parsedUser.isPremium,
        };
        setUser(userForContext);
      } 
      catch (e) {
        setUser(null); 
      }

    } else {
      setUser(null); 
    }

    setUserLoading(false); 
  }, []); 

  return (
    <UserContext.Provider value={{ user, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
