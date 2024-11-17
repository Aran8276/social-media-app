import Image from "next/image";
import React from "react";
import SuggestedFriendCard, { Suggested } from "./SuggestedFriendCard";
import Link from "next/link";

export default function Feed() {
  const suggestedProfiles: Suggested[] = [
    {
      profilePicture: "https://avatar.iran.liara.run/public/1",
      name: "Alice Johnson",
    },
    {
      profilePicture: "https://avatar.iran.liara.run/public/2",
      name: "Bob Smith",
    },
    {
      profilePicture: "https://avatar.iran.liara.run/public/3",
      name: "Charlie Brown",
    },
  ];

  return (
    <aside className="flex h-screen sticky top-12 flex-col space-y-12 w-full">
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-semibold">Shorts Terbaru</h2>
        <div className="flex space-x-3">
          <div className="">
            <Image
              className="rounded-2xl w-auto"
              src="https://via.placeholder.com/140x200"
              alt="Shorts"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className="">
            <Image
              className="rounded-2xl w-auto"
              src="https://via.placeholder.com/140x200"
              alt="Shorts"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-semibold">Sugesti Teman</h2>
        <div className="flex flex-col space-y-5">
          {suggestedProfiles.map((item, index) => {
            return (
              <SuggestedFriendCard
                key={index}
                name={item.name}
                profilePicture={item.profilePicture}
              />
            );
          })}
        </div>
        <Link
          href="#"
          className="text-gray-400 hover:text-black transition-all w-fit"
        >
          See all
        </Link>
      </div>
    </aside>
  );
}
