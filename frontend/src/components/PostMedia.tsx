import React, { useEffect, useState } from "react";
import { colorList } from "./GlobalVariables";
import Image from "next/image";

export interface PostMediaType {
  name: string;
  body: string;
  src: string;
}

export default function PostMedia(props: PostMediaType) {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <div className={`flex flex-col space-y-6 p-3 rounded-2xl ${bgColor}`}>
      <Image
        width={1280}
        height={800}
        alt="Image"
        className="rounded-2xl"
        src={props.src}
      />
      <div className="flex flex-col space-y-5 px-2 pb-4">
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
        <p>{props.body}</p>
      </div>
    </div>
  );
}
