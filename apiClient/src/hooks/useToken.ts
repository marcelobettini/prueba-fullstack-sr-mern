import { useState } from "react";
import { iUser } from "../types/types";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export const useToken = () => {
  const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  };
  const getUserFromLocalStorage = (): iUser | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  };

  const [token, setToken] = useState<string | null>(getTokenFromLocalStorage());
  const [user, setUser] = useState<iUser | null>(getUserFromLocalStorage());

  const saveTokenToLocalStorage = (userToken: string, userInfo: iUser) => {
    localStorage.setItem(TOKEN_KEY, userToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    setToken(userToken);
    setUser(userInfo);
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return {
    token,
    user,
    role: user?.role,
    saveTokenToLocalStorage,
    getTokenFromLocalStorage,
    getUserFromLocalStorage,
    removeTokenFromLocalStorage,
  };
};
