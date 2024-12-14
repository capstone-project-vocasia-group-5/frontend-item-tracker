"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useNotif } from "../../context/notif-context";

export function NavMain({ items, onMenuClick }) {
  const { totalNotif } = useNotif();
  return (
    <SidebarGroup className="text-white ">
      <SidebarGroupLabel className="text-white ">Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible text-white"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="bg-[#1A1A1A]">
                <SidebarMenuButton
                  tooltip={item.title}
                  className="text-white"
                  onClick={() => onMenuClick && onMenuClick(item)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.title === "Notifikasi" && totalNotif > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalNotif > 99 ? "99+" : totalNotif}
                    </span>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
