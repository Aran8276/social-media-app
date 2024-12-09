import {
  Dialog,
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
import {
  EllipsisVertical,
  Eye,
  Flag,
  MessageSquareMore,
  SquarePen,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { baseUrl, colorList, requestHeader } from "./GlobalVariables";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import {
  Impressions,
  Media,
  PostDeleteResponse,
  PostEditResponse,
  PostLikeResponse,
} from "./types/Responses";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import PostHeart from "./PostHeart";
import Link from "next/link";
import UserSection from "./UserSection";

interface SelfProps extends PostType {
  id: string;
  impression: Impressions;
  currentlyEditingHandler: (id: string) => void;
  currentlyEditing: string;
  fetchHandler: () => void;
}

export interface PostType {
  name: string;
  posted: Date;
  modified?: Date;
  body: string;
  media?: Media;
  views: number;
  isLiked: boolean;
  isOwned: boolean;
}

export default function Post(props: SelfProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRefEdit: RefObject<HTMLTextAreaElement> = useRef(null);

  const postLike = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/posts/like/${props.impression.id}`,
        {},
        requestHeader
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  const postEdit = async (body: string) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${baseUrl}/api/posts/${props.id}`,
        {
          content: body,
          visibility: "public",
        },
        requestHeader
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return error.response?.data;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const postDelete = async () => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/posts/${props.id}`,
        requestHeader
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return error.response?.data;
      }
    }
  };

  const submitLike = async () => {
    const res: PostLikeResponse = await postLike();
    if (!res.success) {
      toast(`Post gagal diedit: ${res.message}`);
      return;
    }
    props.fetchHandler();
    toast("Post berhasil dilike");
  };

  const submitPost = async () => {
    if (inputRefEdit.current) {
      const res: PostEditResponse = await postEdit(inputRefEdit.current.value);
      if (!res.success) {
        toast(`Post gagal diedit: ${res.message}`);
        return;
      }
      setIsEditing(false);
      props.currentlyEditingHandler("");
      props.fetchHandler();
      toast("Post berhasil diedit");
    }
  };

  const deletePost = async () => {
    const res: PostDeleteResponse = await postDelete();
    if (res.success) {
      toast("Post berhasil dihapus.");
      setIsEditing(false);
      props.currentlyEditingHandler("");
      props.fetchHandler();
      return;
    }

    toast(`Post gagal dihapus!: ${res.message}`);
  };

  const isEditingHandler = (boolSwitch: boolean) => {
    if (boolSwitch) {
      props.currentlyEditingHandler(props.id);
      setIsEditing(true);
      return;
    }

    setIsEditing(false);
    props.currentlyEditingHandler("");
  };

  useEffect(() => {
    if (props.currentlyEditing !== props.id) {
      setIsEditing(false);
    }
  }, [props.currentlyEditing]);

  useEffect(() => {
    const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <div className={`flex flex-col space-y-6 p-8 rounded-2xl ${bgColor}`}>
      <div className="flex justify-between pr-3 items-center">
        <UserSection
          createdAt={props.posted}
          imgSrc="https://avatar.iran.liara.run/public/7"
          name={props.name}
        />

        {props.isOwned ? (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border-2 border-gray-300 hover:bg-gray-300 transition-all cursor-pointer p-3">
                <EllipsisVertical />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="absolute">
                <DropdownMenuItem
                  onClick={() => isEditingHandler(true)}
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
                    <DialogTitle>Apakah anda yakin? {props.name}</DialogTitle>
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
                          onClick={deletePost}
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

      {isEditing ? (
        <div className="grid gap-6">
          <Textarea
            defaultValue={props.body}
            className="h-[120px] p-6 transition-all rounded-2xl bg-white"
            name="body"
            ref={inputRefEdit}
            required
          />
          <div className="flex space-x-3">
            <Button onClick={() => isEditingHandler(false)} variant="outline">
              Batalkan
            </Button>
            {isLoading ? (
              <Button disabled className="px-6">
                <LoadingSpinner />
              </Button>
            ) : (
              <Button onClick={submitPost} type="button" className="px-6">
                Kirim
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-lg">{props.body}</p>
      )}

      <div className="flex overflow-y-scroll space-x-3">
        {props.media?.images &&
          JSON.parse(props.media?.images)?.map(
            (item: string, index: number) => {
              return (
                <div key={index}>
                  <Image
                    className="rounded-2xl w-auto min-w-[160px] max-w-[320px] object-cover h-[250px]"
                    src={`${baseUrl}/storage/${item}`}
                    alt={item}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              );
            }
          )}
        {props.media?.videos &&
          JSON.parse(props.media.videos)?.map((item: string, index: number) => {
            return (
              <div key={index}>
                <video
                  controls
                  preload="metadata"
                  className="rounded-2xl w-auto min-w-[160px] max-w-[320px] object-cover h-[250px]"
                  src={`${baseUrl}/storage/${item}#t=0.1`}
                >
                  <source src={`${baseUrl}/storage/${item}`} type="video/mp4" />
                </video>
              </div>
            );
          })}
      </div>
      <div className="flex space-x-8 text-gray-400">
        <div className="flex items-center space-x-3">
          <Eye />
          <span>{props.views}</span>
        </div>
        <div onClick={submitLike} className="cursor-pointer">
          <PostHeart
            likeCount={props.impression.likes}
            isLiked={props.isLiked}
          />
        </div>
        <Link href={`/post/${props.id}`}>
          <div className="flex items-center space-x-3">
            <MessageSquareMore />
            <span>Komentar</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
