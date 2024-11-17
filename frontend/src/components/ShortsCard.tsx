import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export interface ShortsCardType {
  title: string;
  name: string;
  src: string;
}

export default function ShortsCard(props: ShortsCardType) {
  const cardHover = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="initial"
      animate="initial"
      whileHover="animate"
      className=""
    >
      <div className="relative">
        <Image
          className="rounded-2xl"
          src={props.src}
          width={200}
          height={300}
          alt="Shorts Video"
        />
        <motion.p
          variants={cardHover}
          className="text-lg font-semibold px-5 bottom-9 absolute"
        >
          {props.title}
        </motion.p>
        <motion.p
          variants={cardHover}
          className="text-gray-500 px-5 bottom-3 absolute"
        >
          @{props.name}
        </motion.p>
      </div>
    </motion.div>
  );
}
