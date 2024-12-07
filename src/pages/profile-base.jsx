import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import ManageLaporan from "./manage-laporan";
import UpdateProfileUser from "./update-profile-user";
import HomePage from "./homepage-user";
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
  const [activeView, setActiveView] = useState("menubar");
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
      setActiveView("mainmenu");
    }
  };

  const handleBackClick = () => {
    setActiveView("menubar");
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
            <div
              className={`w-full bg-white border border-gray-300 shadow rounded-lg ${
                activeView === "menubar" ? "block" : "hidden"
              } md:block`}
              id="menubar"
            >
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
            <div
              className={`col-span-1 md:col-span-2 bg-white border border-gray-300 shadow rounded-lg p-4 w-full ${
                activeView === "mainmenu" ? "block" : "hidden"
              } md:block`}
              id="mainmenu"
            >
              <button
                type="button"
                onClick={handleBackClick}
                className="border-white bg-white md:hidden flex items-center justify-center text-center w-32 rounded-2xl h-12 relative text-black text-lg font-semibold border-4  group"
              >
                <div className="bg-gray-300 rounded-xl h-10 w-1/3 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#000000"
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    />
                    <path
                      fill="#000000"
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    />
                  </svg>
                </div>
                <p className="translate-x-3">Back</p>
              </button>
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

function SectionUpdateProfileUser() {
  return <UpdateProfileUser />;
}
function SectionManagePengajuan() {
  return <ManagePengajuan />;
}
function SectionManageLaporan() {
  return <ManageLaporan />;
}
function SectionHomePage() {
  return <HomePage />;
}

export default ProfileBase;
