("use admin");

import React from "react";
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

const data = {
  user: {
    name: "Admin",
    email: "admin@itemtrack.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Frame,
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
  return (
    <Sidebar className="bg-black text-white" collapsible="icon" {...props}>
      <SidebarHeader className="bg-black text-white">
        <NavUser user={data.user} onMenuClick={onMenuClick} />
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
