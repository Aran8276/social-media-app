"use client";

import { shortVideos } from "@/components/GlobalVariables";
import PostMedia, { PostMediaType } from "@/components/PostMedia";
import ShortsCard from "@/components/ShortsCard";
import React from "react";

export default function Page() {
  const dummyData: PostMediaType[] = [
    {
      name: "Alice Johnson",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
      src: "https://via.placeholder.com/1280x800",
    },
    {
      name: "Bob Smith",
      body: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
      src: "https://via.placeholder.com/1280x800",
    },
    {
      name: "Charlie Brown",
      body: "Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.",
      src: "https://via.placeholder.com/1280x800",
    },
    {
      name: "Diana Prince",
      body: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt.",
      src: "https://via.placeholder.com/1280x800",
    },
    {
      name: "Ethan Hunt",
      body: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat.",
      src: "https://via.placeholder.com/1280x800",
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold">Media</h2>
      <div className="flex flex-col space-y-5">
        <h3 className="text-xl">Shorts</h3>
        <div className="grid grid-cols-5 gap-3">
          {shortVideos.slice(0, 5).map((item, index) => {
            return (
              <ShortsCard
                name={item.name}
                src={item.src}
                title={item.title}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <h3 className="text-xl">Recent Posts</h3>
        <div className="grid grid-cols-2 gap-3">
          {dummyData.map((item, index) => {
            return (
              <PostMedia
                name={item.name}
                body={item.body}
                src={item.src}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
