"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { colorList } from "./GlobalVariables";
import { Comment as CommentType } from "./types/Responses";
import UserSection from "./UserSection";
import PostHeart from "./PostHeart";
import { EllipsisVertical, Flag, SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export default function Comment(props: CommentType) {
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <div className={`flex flex-col space-y-6 p-8 rounded-2xl ${bgColor}`}>
      <div className="flex justify-between pr-3 items-center">
        <UserSection
          createdAt={props.created_at}
          imgSrc="https://avatar.iran.liara.run/public/7"
          name={props.user.name}
        />
        {props.is_owned ? (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border-2 border-gray-300 hover:bg-gray-300 transition-all cursor-pointer p-3">
                <EllipsisVertical />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="absolute">
                <DropdownMenuItem
                  onClick={() => console.log("Edit handler")}
                  className="flex space-x-2 items-center cursor-pointer"
                >
                  <SquarePen />
                  <span>Edit</span>
                </DropdownMenuItem>

                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-500 flex space-x-2 items-center cursor-pointer"
                  >
                    <Trash2 />
                    <span>Hapus</span>
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader className="flex flex-col space-y-4 py-3">
                    <DialogTitle>
                      Apakah anda yakin? {props.user.name}
                    </DialogTitle>
                    <DialogDescription>
                      Aksi ini akan menghapus post yang anda telah buat, dan
                      aksi ini tidak bisa dipulihkan. Apakah anda benar-benar
                      yakin?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => console.log("Delete post")}
                          className="flex items-center"
                          variant="destructive"
                        >
                          <Trash2 />
                          <span>Hapus</span>
                        </Button>
                      </DropdownMenuItem>
                    </DialogClose>

                    <DialogClose asChild>
                      <DropdownMenuItem>
                        <Button
                          className="flex items-center"
                          variant="secondary"
                        >
                          <span>Batalkan</span>
                        </Button>
                      </DropdownMenuItem>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </DropdownMenuContent>
            </DropdownMenu>
          </Dialog>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border-2 border-gray-300 hover:bg-gray-300 transition-all cursor-pointer p-3">
              <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="absolute">
              <DropdownMenuItem className="flex space-x-2 items-center cursor-pointer">
                <Flag />
                <span>Laporkan</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <p className="text-justify">{props.comment}</p>
      <PostHeart isLiked={props.is_liked} likeCount={props.likes} />
    </div>
  );
}
