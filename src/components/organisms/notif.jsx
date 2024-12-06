import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

const notifications = [
  {
    id: 1,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    description: "Pesanan Anda telah dikirim!",
    read: false,
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    description: "Promo menarik untuk Anda hari ini!",
    read: true,
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    description: "Tagihan bulan ini sudah jatuh tempo.",
    read: false,
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    description: "Pesanan Anda telah dikirim!",
    read: false,
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    description: "Promo menarik untuk Anda hari ini!",
    read: true,
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    description: "Tagihan bulan ini sudah jatuh tempo.",
    read: false,
  },
];

export function Notif() {
  return (
    <div className="p-4">
      <Table
        aria-label="Tabel Notifikasi"
        className="w-full"
        classNames={{
          table: "border rounded-lg overflow-hidden",
        }}
      >
        <TableHeader>
          <TableColumn>Gambar</TableColumn>
          <TableColumn>Deskripsi</TableColumn>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow
              key={notification.id}
              className={notification.read ? "" : "bg-gray-100"}
            >
              <TableCell>
                <img
                  src={notification.image}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <p>{notification.description}</p>
                  {!notification.read && (
                    <Chip color="primary" size="sm">
                      Baru
                    </Chip>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
