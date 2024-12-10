import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { getUser } from "../api/api";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!Cookies.get("token")
  );
  const [user, setUser] = useState(null);
  const [currToken, setCurrToken] = useState(Cookies.get("token") || null);

  const fetchUserData = useCallback(async () => {
    try {
      if (currToken) {
        const response = await getUser();
        const user = response.data?.data?.user;

        if (!user) throw new Error("User data not found");

        setUser(user);
      }
    } catch (error) {
      console.error("Failed to load user data:", error.message);
      logout();
    }
  }, [currToken]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (currToken) {
      Cookies.set("token", currToken);
    } else {
      Cookies.remove("token");
    }
  }, [currToken]);

  const login = (token) => {
    setCurrToken(token);
    setIsAuthenticated(true);
    fetchUserData();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
