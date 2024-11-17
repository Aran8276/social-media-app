"use client";

import { shortVideos } from "@/components/GlobalVariables";
import ShortsCard from "@/components/ShortsCard";
import React from "react";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Shorts</h2>
      <div className="grid grid-cols-4 gap-6">
        {shortVideos.map((item, index) => {
          return (
            <ShortsCard
              key={index}
              name={item.name}
              src={item.src}
              title={item.title}
            />
          );
        })}
      </div>
    </>
  );
}
