import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FaUserShield,
  FaClipboard,
  FaSearch,
  FaComments,
  FaUserCog,
  FaHandHoldingHeart,
  FaCheckCircle,
  FaListAlt,
  FaTags,
  FaBell,
} from "react-icons/fa";
import "./css/fitur-utama.css";

const notifications = [
  {
    title: "Fitur Autentikasi",
    description: "Pastikan akun Anda aman dengan autentikasi yang kuat.",
    icon: <FaUserShield size={40} className="text-blue-500" />,
  },
  {
    title: "Fitur Laporan Barang",
    description: "Laporkan barang hilang Anda dengan mudah.",
    icon: <FaClipboard size={40} className="text-green-500" />,
  },
  {
    title: "Fitur Pencarian",
    description: "Cari barang hilang dengan sistem pencarian kami.",
    icon: <FaSearch size={40} className="text-yellow-500" />,
  },
  {
    title: "Fitur Komunikasi",
    description: "Hubungi penemu barang dengan fitur chat.",
    icon: <FaComments size={40} className="text-purple-500" />,
  },
  {
    title: "Fitur Manajemen Akun",
    description: "Atur profil dan informasi akun Anda dengan mudah.",
    icon: <FaUserCog size={40} className="text-red-500" />,
  },
  {
    title: "Fitur Donasi",
    description: "Bantu sesama dengan fitur donasi terpercaya.",
    icon: <FaHandHoldingHeart size={40} className="text-pink-500" />,
  },
  {
    title: "Fitur Pengajuan Kepemilikan",
    description: "Ajukan kepemilikan barang yang ditemukan.",
    icon: <FaCheckCircle size={40} className="text-teal-500" />,
  },
  {
    title: "Fitur Manajemen Laporan",
    description: "Pantau laporan barang hilang dengan dashboard khusus.",
    icon: <FaListAlt size={40} className="text-orange-500" />,
  },
  {
    title: "Fitur Manajemen Kategori",
    description: "Kelola kategori barang hilang untuk pencarian lebih mudah.",
    icon: <FaTags size={40} className="text-indigo-500" />,
  },
  {
    title: "Fitur Notifikasi",
    description: "Dapatkan notifikasi real-time terkait laporan Anda.",
    icon: <FaBell size={40} className="text-gray-500" />,
  },
];

export function FiturUtama({ className, ...props }) {
  return (
    <div className="my-10 flex justify-center">
      <div className="flex flex-wrap gap-4 w-full justify-center items-center p-4">
        {notifications.map((notification, index) => (
          <Card
            className={cn(
              `relative flex flex-col items-center justify-center flex-grow flex-shrink w-full basis-[250px] lg:max-w-[300px] md:max-w-[300px] rounded-[14px] overflow-hidden shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] transform transition-transform duration-300 hover:scale-105`,
              className
            )}
            {...props}
            key={index}
          >
            {/* Blob Background */}
            <div className="blob"></div>

            {/* Foreground Blur Layer */}
            <div className="bg"></div>

            {/* Card Content */}
            <CardContent className="relative z-[3] pt-4 flex justify-center">
              {notification.icon}
            </CardContent>
            <CardHeader className="relative z-[3]">
              <CardTitle>{notification.title}</CardTitle>
              <CardDescription>{notification.description}</CardDescription>
            </CardHeader>
            <CardFooter className="relative z-[3]"></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
