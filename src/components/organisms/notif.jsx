import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";

import { getNotificationByUser, setNotificationIsRead } from "../../api/api";
import newComment from "/public/image/new-comment.svg";
import { PaginationDisplay } from "../molecules/pagination";
import { useNavigate } from "react-router-dom";
import Preloader from "../templates/preloader/preloader";

export function Notif() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [totalNotif, setTotalNotif] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const fetchNotifications = async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await getNotificationByUser({
        search: params.search || debouncedQuery,
        page: params.page || currentPage,
        limit: params.limit || itemsPerPage,
      });

      const notifications = response.data.data.notifications || [];
      const total = response.data.data.pagination.total || notifications.length;
      setNotifications(notifications);
      setTotalNotif(total);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications({
      search: debouncedQuery,
      page: currentPage,
      limit: itemsPerPage,
    });
  }, [currentPage, debouncedQuery]);

  const setNotificationIsReadHandler = async (notifId) => {
    try {
      await setNotificationIsRead(notifId);
      fetchNotifications();
    } catch (error) {
      console.error("Failed to set notification as read:", error);
    }
  };

  const handleClickNotif = (notif) => {
    if (!notif.is_read) {
      setNotificationIsReadHandler(notif._id);
    }

    const navigateToDetail = (item) => {
      if (item.deleted_at) {
        navigate("/not-found");
      } else {
        navigate(`/item/detail/${item._id}`);
      }
    };

    if (notif.claim) {
      navigate("/user");
    } else if (notif.comment) {
      navigateToDetail(notif.comment.item_id);
    } else if (notif.item) {
      navigateToDetail(notif.item);
    } else {
      navigate("/not-found");
    }
  };

  return (
    <div className="p-4">
      {isLoading && <Preloader />}
      <Input
        placeholder="Cari notifikasi..."
        onChange={handleSearchChange}
        value={searchQuery}
        className="mb-4"
      />
      {notifications.length > 0 ? (
        <>
          <Table aria-label="Tabel Notifikasi">
            <TableHeader>
              <TableColumn>Gambar</TableColumn>
              <TableColumn>Judul</TableColumn>
            </TableHeader>
            <TableBody>
              {notifications.map((notif) => (
                <TableRow
                  key={notif._id}
                  style={{
                    backgroundColor: notif.is_read ? "white" : "#f5f5f5",
                    cursor: "pointer",
                    borderBottom: "5px solid transparent",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleClickNotif(notif)}
                >
                  <TableCell>
                    <img
                      src={
                        notif.claim?.images?.[0] ||
                        notif.item?.images?.[0] ||
                        (notif.comment ? newComment : "")
                      }
                      alt="Gambar Notifikasi"
                      style={{ width: 50, height: 50 }}
                      className="rounded-lg"
                    />
                  </TableCell>
                  <TableCell>{notif.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center mt-4">
            <PaginationDisplay
              currentPage={currentPage}
              totalItems={totalNotif}
              onPageChange={(page) => setCurrentPage(page)}
              limit={itemsPerPage}
            />
          </div>
        </>
      ) : (
        <p className="text-center">Tidak ada notifikasi</p>
      )}
    </div>
  );
}
