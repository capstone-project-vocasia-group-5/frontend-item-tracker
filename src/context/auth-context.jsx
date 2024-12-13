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

  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      if (currToken) {
        const response = await getUser();
        const user = response.data?.data?.user || null;

        if (!user) throw new Error("User data not found");

        setUser(user);
      } else {
        throw new Error("No valid token found");
      }
    } catch (error) {
      console.error("Failed to load user data:", error.message);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [currToken]);

  useEffect(() => {
    if (currToken) {
      fetchUserData();
    } else {
      setIsLoading(false);
      setUser(null);
    }
  }, [currToken, fetchUserData]);

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
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrToken(null);
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
