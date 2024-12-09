"use client";

import {
  baseUrl,
  getJwtToken,
  requestHeader,
} from "@/components/GlobalVariables";
import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/Post";
import {
  PostCreateResponse,
  PostListResponse,
  PostType,
} from "@/components/types/Responses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import { ImageIcon, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [currentlyEditing, setCurrentlyEditing] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState<PostType[]>([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const inputRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "photos" | "videos"
  ) => {
    if (type == "photos" && e.target.files) {
      setPhotos(Array.from(e.target.files));
      return;
    }
    if (type == "videos" && e.target.files) {
      setVideos(Array.from(e.target.files));
      return;
    }
  };

  const incrementView = async () => {
    try {
      await axios.get(`${baseUrl}/api/posts/view`, requestHeader);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchData = async () => {
    try {
      // Initial fetch
      const res = await axios.get(`${baseUrl}/api/posts`, requestHeader);
      const data: PostListResponse = res.data;
      if (data.success) {
        setPostList(data.posts);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const postData = async (body: string) => {
    const formData = new FormData();

    if (photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos[]", photos[i]);
      }
    }

    if (videos.length > 0) {
      for (let i = 0; i < videos.length; i++) {
        formData.append("videos[]", videos[i]);
      }
    }

    formData.append("content", body);
    formData.append("visibility", "public");

    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getJwtToken()}`,
        },
      });

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return error;
      }
    } finally {
      setIsLoading(false);
      setPhotos([]);
      setVideos([]);
    }
  };

  const submitPost = async () => {
    if (inputRef.current) {
      const res: PostCreateResponse = await postData(inputRef.current.value);
      if (res instanceof AxiosError && res.code == "401") {
        router.replace("/login");
        return;
      }
      if (res instanceof AxiosError) {
        toast("Post gagal dibuat: " + res.response?.data.message);
        return;
      }
      toggleOpenInput();
      inputRef.current.value = "";
      fetchData();
      toast("Post berhasil dibuat");
    }
  };

  const toggleOpenInput = () => {
    console.log("a");
    setIsInputOpen((prev) => !prev);
  };

  const currentlyEditingHandler = (id: string) => {
    setCurrentlyEditing(id);
  };

  useEffect(() => {
    incrementView();
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  useEffect(() => {
    if (isInputOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputOpen]);

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
        <div className="flex relative flex-col space-y-6 p-8 rounded-2xl bg-gray-100">
          {isInputOpen ? (
            <>
              <div className="grid">
                <Textarea
                  className="h-[120px] p-6 transition-all rounded-2xl bg-white"
                  name="body"
                  ref={inputRef}
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-2 pr-8">
                <div className="flex items-center space-x-8">
                  <label
                    htmlFor="photos"
                    className="flex cursor-pointer space-x-2 items-center"
                  >
                    <ImageIcon className="text-gray-500" />
                    <span className="text-gray-500">Gambar</span>
                  </label>
                  <input
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    id="photos"
                    type="file"
                    onChange={(e) => handleFileChange(e, "photos")}
                    multiple
                  />

                  <label
                    htmlFor="videos"
                    className="flex cursor-pointer space-x-2 items-center"
                  >
                    <Video className="text-gray-500" />
                    <span className="text-gray-500">Video</span>
                  </label>
                  <input
                    accept=".mp4"
                    className="hidden"
                    id="videos"
                    type="file"
                    onChange={(e) => handleFileChange(e, "videos")}
                    multiple
                  />
                </div>

                <div className="flex space-x-3">
                  <Button onClick={() => toggleOpenInput()} variant="outline">
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

              <div className="flex flex-col">
                {Array.from(photos).map((file, index) => (
                  <p key={index}>Gambar: {file.name}</p>
                ))}
                {Array.from(videos).map((file, index) => (
                  <p key={index}>Video: {file.name}</p>
                ))}
              </div>
            </>
          ) : (
            <div className="flex py-4 items-center">
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
                  onClick={toggleOpenInput}
                  className="bg-white rounded-full p-6 pl-16 focus-visible:ring-gray-300 placeholder:text-lg transition-all"
                  placeholder="Apa yang kamu pikirkan?"
                />
              </div>
            </div>
          )}
        </div>
        {postList.map((item, index) => {
          return (
            <Post
              impression={item.impressions}
              media={item.media}
              fetchHandler={fetchData}
              id={item.id}
              currentlyEditing={currentlyEditing}
              currentlyEditingHandler={(id: string) =>
                currentlyEditingHandler(id)
              }
              body={item.content}
              isLiked={item.is_liked}
              isOwned={item.is_owned}
              name={item.user.name}
              views={item.impressions.views}
              posted={item.created_at}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}
