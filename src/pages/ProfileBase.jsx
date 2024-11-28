import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import ManageCategory from "./ManageCategory";
import ManageLaporan from "./ManageLaporan";
import UpdateProfileUser from "./UpdateProfileUser";
import HomePageDefault from "./HomePageDefault";

// Data untuk menu sidebar
const menuItems = [
  {
    id: "profile",
    label: "Edit Profile",
    content: <SectionUpdateProfileUser />,
  },
  {
    id: "status",
    label: "Manajemen Kategori",
    content: <SectionManageCategory />,
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

  const renderContent = () => {
    const activeMenu = menuItems.find((item) => item.id === activeItem);
    return activeMenu && activeMenu.content ? activeMenu.content : null;
  };

  const handleMenuClick = (id, action) => {
    if (action === "logout") {
      navigate("/");
    } else {
      setActiveItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Layout utama */}
      <div className="flex justify-center my-[100px]">
        <div className="grid grid-cols-3 max-w-5xl gap-4">
          {/* Sidebar */}
          <div className="w-64 bg-white border border-gray-300 shadow rounded-lg">
            <div className="p-4 text-center border-b border-gray-300 bg-gray-100">
              <h4 className="text-lg font-semibold text-gray-800">
                AGUS HERYANTO
              </h4>
              <p className="text-sm text-gray-500">
                Universitas Amikom Yogyakarta
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`p-4 cursor-pointer rounded-lg ${
                    item.id === activeItem
                      ? "bg-blue-500 text-white"
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
          <div className="col-span-2 bg-white border border-gray-300 shadow rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Komponen Konten untuk tiap menu
function SectionUpdateProfileUser() {
  return <UpdateProfileUser />;
}
function SectionManageCategory() {
  return <ManageCategory />;
}
function SectionManageLaporan() {
  return <ManageLaporan />;
}
function SectionHomePageDefault() {
  return <HomePageDefault />;
}

export default ProfileBase;
