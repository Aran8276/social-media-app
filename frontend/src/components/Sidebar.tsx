"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import SidebarNavLinks from "./SidebarNavLinks";
import { baseUrl, getSidebarNavLinks, requestHeader } from "./GlobalVariables";
import { usePathname } from "next/navigation";
import { UserResponse } from "./types/Responses";
import axios, { AxiosError } from "axios";

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);
  const pathName = usePathname();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/user`, requestHeader);
      setUser(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

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
            {isLoggedIn ? (
              <>
                <h2 className="text-lg font-bold">{user?.name}</h2>
                <h3 className="text-gray-500">@{user?.username}</h3>
              </>
            ) : (
              <>Anda belum masuk</>
            )}
          </div>
        </div>
        <nav className="w-[200px] flex flex-col space-y-4">
          {getSidebarNavLinks(isLoggedIn).map((item, index) => {
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
