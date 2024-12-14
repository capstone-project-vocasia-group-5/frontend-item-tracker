import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useState } from "react";
import ManageCategory from "./manage-category";
import ManageAkunList from "./manage-akun-list";
import ManageLaporanAdmin from "./manage-laporan-for-admin";
import VerifikasiLaporan from "./verifikasi-laporan";
import Dashboard from "./dashboard";
import UpdateProfileUser from "./update-profile-user";
import Notifikasi from "./notifikasi";

function HomePageAdmin() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderActivePage = () => {
    switch (activePage) {
      case "Manajemen Kategori":
        return <ManageCategory />;
      case "Manajemen Akun":
        return <ManageAkunList />;
      case "Manajemen Laporan":
        return <ManageLaporanAdmin />;
      case "Verifikasi Laporan":
        return <VerifikasiLaporan />;
      case "Update Profile":
        return <UpdateProfileUser />;
      case "Notifikasi":
        return <Notifikasi />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar onMenuClick={(menu) => setActivePage(menu.title)} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 bg-white " />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{activePage}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="w-full">{renderActivePage()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default HomePageAdmin;
