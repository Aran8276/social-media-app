import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

export interface Suggested {
  profilePicture: string;
  name: string;
}

export default function SuggestedFriendCard(props: Suggested) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-3">
        <Image src={props.profilePicture} alt="" width={48} height={48} />
        <h3 className="text-lg">{props.name}</h3>
      </div>
      <Button className="rounded-full">Ikuti</Button>
    </div>
  );
}
