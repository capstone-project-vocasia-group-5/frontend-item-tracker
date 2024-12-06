import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
} from "@nextui-org/react";

const notifications = [
  {
    id: 1,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    description: "Barang anda sudah disetujui",
    read: false,
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    description: "Barang Hilang anda sudah ditemukan",
    read: true,
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    description: "Ayo berdonatur!",
    read: false,
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    description: "Barang anda dimana?",
    read: false,
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    description: "Dimana yh?",
    read: true,
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    description: "Es Es apa yang Teh",
    read: false,
  },
];

export function Notif() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) =>
      notif.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNotifications.slice(startIndex, endIndex);
  }, [currentPage, filteredNotifications]);

  return (
    <div className="p-4">
      <Input
        placeholder="Cari notifikasi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Table aria-label="Tabel Notifikasi">
        <TableHeader>
          <TableColumn>Gambar</TableColumn>
          <TableColumn>Deskripsi</TableColumn>
        </TableHeader>
        <TableBody>
          {currentData.map((notif) => (
            <TableRow
              key={notif.id}
              style={{
                backgroundColor: notif.read ? "#e2e8f0" : "white",
              }}
            >
              <TableCell>
                <img
                  src={notif.image}
                  alt="Gambar Notifikasi"
                  style={{ width: 50, height: 50 }}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>{notif.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
          siblings={1}
          boundaries={1}
        />
      </div>
    </div>
  );
}
