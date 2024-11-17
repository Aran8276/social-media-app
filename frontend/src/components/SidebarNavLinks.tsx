import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export interface SidebarNavLinksType {
  children: ReactNode;
  icon: ReactNode;
  href: string;
  isActive?: boolean;
}

export default function SidebarNavLinks(props: SidebarNavLinksType) {
  return (
    <>
      {props.isActive ? (
        <Button
          variant="default"
          className="flex transition-all text-lg rounded-2xl justify-start space-x-2 font-bold py-6"
        >
          <>{props.icon}</>
          <span>{props.children}</span>
        </Button>
      ) : (
        <Link href={props.href}>
          <Button
            variant="ghost"
            className="flex transition-all w-full text-lg rounded-2xl justify-start space-x-2 font-bold py-6"
          >
            <>{props.icon}</>
            <span>{props.children}</span>
          </Button>
        </Link>
      )}
    </>
  );
}
