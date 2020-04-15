import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export const useUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      const loadedUser = await Auth.currentAuthenticatedUser();
      setUser(loadedUser);
    };
    loadUser();
  }, []);
  return user;
};
