"use client";

import Image from "next/image";
import React from "react";
import { timeAgo } from "./GlobalVariables";

interface SelfProps {
  createdAt: Date;
  name: string;
  imgSrc: string;
}

export default function UserSection(props: SelfProps) {
  return (
    <div className="flex space-x-6">
      <div>
        <Image src={props.imgSrc} alt="" width={48} height={48} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{props.name}</h2>
        <p className="text-gray-400 text-sm">
          {timeAgo(new Date(props.createdAt))}
        </p>
      </div>
    </div>
  );
}
