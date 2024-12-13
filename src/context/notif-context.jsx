import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./auth-context";
import { getUnreadNotification } from "../api/api";

const NotifContext = createContext({
  totalNotif: 0,
  fetchNotif: () => {},
});

export const useNotif = () => useContext(NotifContext);

export const NotifProvider = ({ children }) => {
  const [totalNotif, setTotalNotif] = useState(0);
  const { user, isLoading } = useAuth();

  const fetchNotif = useCallback(async () => {
    try {
      if (user?.id) {
        const response = await getUnreadNotification();
        const total = response.data?.data?.count || 0;
        setTotalNotif(total);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error.message);
      setTotalNotif(0);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isLoading && user?.id) {
      fetchNotif();
    } else if (!isLoading) {
      setTotalNotif(0);
    }
  }, [isLoading, user?.id, fetchNotif]);

  return (
    <NotifContext.Provider value={{ totalNotif, fetchNotif }}>
      {children}
    </NotifContext.Provider>
  );
};
