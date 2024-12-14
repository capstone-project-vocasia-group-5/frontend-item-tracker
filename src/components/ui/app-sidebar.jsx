("use admin");

import React from "react";
import Preloader from "@/components/templates/preloader/preloader";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Bell,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAuth } from "@/context/auth-context";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Frame,
      isActive: true,
    },
    {
      title: "Notifikasi",
      url: "/notification",
      icon: Bell,
      isActive: true,
    },
    {
      title: "Manajemen Kategori",
      url: "/manajemen-kategori",
      icon: SquareTerminal,
    },
    {
      title: "Manajemen Akun",
      url: "/manajemen-akun",
      icon: Bot,
    },
    {
      title: "Manajemen Laporan",
      url: "/manajemen-laporan",
      icon: BookOpen,
    },
    {
      title: "Verifikasi Laporan",
      url: "/verifikasi-laporan",
      icon: Map,
    },
  ],
};
export function AppSidebar({ onMenuClick, ...props }) {
  const { user, isLoading } = useAuth();
  return (
    <Sidebar className="bg-black text-white" collapsible="icon" {...props}>
      {isLoading && <Preloader />}
      <SidebarHeader className="bg-black text-white">
        <NavUser user={user} onMenuClick={onMenuClick} />
      </SidebarHeader>
      <SidebarContent className="bg-black text-white">
        <NavMain
          items={data.navMain}
          onMenuClick={onMenuClick} // Pass ke NavMain
        />
      </SidebarContent>
      <SidebarFooter className="bg-black text-white"></SidebarFooter>
    </Sidebar>
  );
}
