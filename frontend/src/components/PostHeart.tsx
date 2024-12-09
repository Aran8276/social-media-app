import { Heart } from "lucide-react";
import React from "react";

interface SelfProps {
  isLiked: boolean;
  likeCount: number;
}

export default function PostHeart(props: SelfProps) {
  return (
    <>
      {props.isLiked ? (
        <div className="flex items-center space-x-3">
          <Heart className="stroke-[#ff8080]" fill="#ff8080" />
          <span className="text-[#ff8080]">{props.likeCount}</span>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Heart className="stroke-[#d4d4d4]" fill="#d4d4d4" />
          <span className="text-gray-400">{props.likeCount}</span>
        </div>
      )}
    </>
  );
}
