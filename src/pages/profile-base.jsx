import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import ManageLaporan from "./manage-laporan";
import UpdateProfileUser from "./update-profile-user";
import HomePageDefault from "./home-page-default";
import ManagePengajuan from "./manage-pengajuan";

const menuItems = [
  {
    id: "profile",
    label: "Edit Profile",
    content: <SectionUpdateProfileUser />,
  },
  {
    id: "status",
    label: "Manajemen Pengajuan",
    content: <SectionManagePengajuan />,
  },
  {
    id: "documents",
    label: "Manajemen Laporan",
    content: <SectionManageLaporan />,
  },
  {
    id: "logout",
    label: "Keluar",
    action: "logout",
  },
];

function ProfileBase() {
  const [activeItem, setActiveItem] = useState(menuItems[0].id);
  const navigate = useNavigate();

  // Fungsi untuk render konten aktif
  const renderContent = () => {
    const activeMenu = menuItems.find((item) => item.id === activeItem);
    return activeMenu && activeMenu.content ? activeMenu.content : null;
  };

  // Fungsi handle klik pada menu sidebar
  const handleMenuClick = (id, action) => {
    if (action === "logout") {
      navigate("/"); // Arahkan ke halaman login atau beranda
    } else {
      setActiveItem(id);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main className="max-w-screen-xl mx-auto">
        {/* Layout utama */}
        <div className="flex justify-center m-4 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
            {/* Sidebar */}
            <div className="w-full bg-white border border-gray-300 shadow rounded-lg ">
              <div className="p-4 text-center border-gray-300 bg-gray-100 w-full">
                <h4 className="text-lg font-semibold text-gray-800">
                  AGUS HERYANTO
                </h4>
                <p className="text-sm text-gray-500">
                  Universitas Amikom Yogyakarta
                </p>
              </div>
              <ul className="mt-4 space-y-4 p-4 text-center">
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    className={`p-4 cursor-pointer rounded-full ${
                      item.id === activeItem
                        ? "bg-black text-white"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleMenuClick(item.id, item.action)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Konten */}
            <div className="col-span-1 md:col-span-2 bg-white border border-gray-300 shadow rounded-lg p-4 w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

// Komponen Konten untuk tiap menu
function SectionUpdateProfileUser() {
  return <UpdateProfileUser />;
}
function SectionManagePengajuan() {
  return <ManagePengajuan />;
}
function SectionManageLaporan() {
  return <ManageLaporan />;
}
function SectionHomePageDefault() {
  return <HomePageDefault />;
}

export default ProfileBase;
