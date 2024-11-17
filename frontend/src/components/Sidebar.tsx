import Image from "next/image";
import React from "react";
import SidebarNavLinks from "./SidebarNavLinks";
import { sidebarNavLinks } from "./GlobalVariables";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <aside className="flex h-screen sticky top-12 space-y-32 flex-col">
      <div className="flex flex-col space-y-6">
        <div className="flex-col space-y-3 text-center">
          <div className="flex justify-center items-center">
            <Image
              src="https://avatar.iran.liara.run/public/7"
              alt=""
              width={96}
              height={96}
            />
          </div>
          <div className="">
            <h2 className="text-lg font-bold">Aran Aran</h2>
            <h3 className="text-gray-500">@aran8276</h3>
          </div>
        </div>
        <nav className="w-[200px] flex flex-col space-y-4">
          {sidebarNavLinks.map((item, index) => {
            return (
              <SidebarNavLinks
                isActive={pathName.startsWith(item.href)}
                key={index}
                href={item.href}
                icon={item.icon}
              >
                {item.children}
              </SidebarNavLinks>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
