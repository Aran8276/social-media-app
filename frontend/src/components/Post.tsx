import { EllipsisVertical, Eye, Heart, MessageSquareMore } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { colorList } from "./GlobalVariables";

export interface Media {
  type: "picture" | "video";
  src: string;
}

export interface PostType {
  name: string;
  posted: Date;
  modified?: Date;
  body: string;
  media?: Media[];
  views: number;
  isLiked: boolean;
}

export default function Post(props: PostType) {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <div className={`flex flex-col space-y-6 p-8 rounded-2xl ${bgColor}`}>
      <div className="flex justify-between pr-3 items-center">
        <div className="flex space-x-6">
          <div>
            <Image
              src="https://avatar.iran.liara.run/public/7"
              alt=""
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{props.name}</h2>
            <p className="text-gray-400 text-sm">2 hours ago </p>
          </div>
        </div>
        <div className="rounded-full border-2 border-gray-300 hover:bg-gray-300 transition-all cursor-pointer p-3">
          <EllipsisVertical />
        </div>
      </div>
      <p className="text-lg">{props.body}</p>
      <div className="flex space-x-3">
        {props.media?.map((item, index) => {
          return (
            <div className="" key={index}>
              <Image
                className="rounded-2xl w-auto min-w-[160px] max-w-[320px] object-cover h-[250px]"
                src={item.src}
                alt={item.type}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
          );
        })}
      </div>
      <div className="flex space-x-8 text-gray-400">
        <div className="flex items-center space-x-3">
          <Eye />
          <span>{props.views}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Heart className="stroke-[#ff8080]" fill="#ff8080" />
          <span className="text-[#ff8080]">Like</span>
        </div>
        <div className="flex items-center space-x-3">
          <MessageSquareMore />
          <span>Komentar</span>
        </div>
      </div>
    </div>
  );
}
