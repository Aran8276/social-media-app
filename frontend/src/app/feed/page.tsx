"use client";

import Post, { PostType } from "@/components/Post";
import { Input } from "@/components/ui/input";
import { ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  const dummyPosts: PostType[] = [
    {
      name: "John Doe",
      posted: new Date("2024-11-01T10:00:00Z"),
      modified: new Date("2024-11-02T12:00:00Z"),
      body: "Had a great time at the beach!",
      media: [
        { type: "picture", src: "https://via.placeholder.com/320" },
        { type: "picture", src: "https://via.placeholder.com/200x300" },
      ],
      views: 150,
      isLiked: true,
    },
    {
      name: "Jane Smith",
      posted: new Date("2024-11-05T14:30:00Z"),
      body: "Check out my new video!",
      media: [{ type: "video", src: "https://via.placeholder.com/320x240" }],
      views: 300,
      isLiked: false,
    },
    {
      name: "Alice Johnson",
      posted: new Date("2024-11-10T09:15:00Z"),
      body: "Loving the autumn vibes 🍂",
      media: [
        { type: "picture", src: "https://via.placeholder.com/320" },
        { type: "picture", src: "https://via.placeholder.com/400x300" },
        { type: "picture", src: "https://via.placeholder.com/300x400" },
      ],
      views: 220,
      isLiked: true,
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Feed</h2>
        <div className="flex space-x-6">
          <Link
            href="#"
            className="opacity-50 hover:opacity-100 transition-all"
          >
            Terkini
          </Link>
          <Link href="#">Teman</Link>
          <Link
            href="#"
            className="opacity-50 hover:opacity-100 transition-all"
          >
            Populer
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className=" flex relative flex-col space-y-6 p-8 rounded-2xl bg-gray-100">
          <div className="flex pt-4 items-center">
            <div className="absolute z-10">
              <Image
                src="https://avatar.iran.liara.run/public/7"
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div className="right-0 left-0 absolute z-0 mx-6">
              <Input
                className="bg-white rounded-full p-6 pl-16 focus-visible:ring-gray-300 placeholder:text-lg transition-all"
                placeholder="Apa yang kamu pikirkan?"
              />
            </div>
          </div>
          <div className="flex space-x-8 pt-6">
            <div className="flex space-x-2 items-center">
              <ImageIcon className="text-gray-500" />
              <span className="text-gray-500">Gambar</span>
            </div>
            <div className="flex space-x-2 items-center">
              <Video className="text-gray-500" />
              <span className="text-gray-500">Video</span>
            </div>
          </div>
        </div>
        {dummyPosts.map((item, index) => {
          return (
            <Post
              body={item.body}
              isLiked={item.isLiked}
              name={item.name}
              views={item.views}
              media={item.media}
              posted={item.posted}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}
