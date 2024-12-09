"use client";

import Comment from "@/components/Comment";
import { baseUrl, requestHeader } from "@/components/GlobalVariables";
import LoadingSpinner from "@/components/LoadingSpinner";
import Post from "@/components/Post";
import {
  CommentCreateResponse,
  CommentResponse,
  PostResponse,
} from "@/components/types/Responses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<PostResponse | null>(null);
  const [comments, setComment] = useState<CommentResponse | null>(null);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const submitComment = async () => {
    if (inputRef.current && data) {
      const res: CommentCreateResponse = await postComment(
        inputRef.current.value,
        data.post.post_impressions_id
      );
      if (res instanceof AxiosError && res.code == "401") {
        router.replace("/login");
        return;
      }
      if (res instanceof AxiosError) {
        toast("Komentar gagal dibuat: " + res.response?.data.message);
        return;
      }
      toggleOpenInput();
      inputRef.current.value = "";
      fetchData();
      toast("Komentar berhasil dibuat");
    }
  };
  
  const toggleOpenInput = () => {
    setIsInputOpen((prev) => !prev);
  };

  const postComment = async (body: string, impressionId: string) => {
    const formData = new FormData();

    formData.append("comment", body);

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/posts/comment/${impressionId}`,
        formData,
        requestHeader
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/posts/${params.post}`,
        requestHeader
      );

      const data: PostResponse = res.data;
      if (data.success) {
        setData(data);
        return data;
      }

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(`Gagal memuat post: ${error.response?.data?.message}`);
        return error.response?.data;
      }
    }
  };

  const fetchComments = async (impressionId: string) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/posts/comment/${impressionId}`,
        requestHeader
      );

      const data: CommentResponse = res.data;

      setComment(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(`Gagal memuat komentar: ${error.response?.data.message}`);
      }
    }
  };

  const fetchData = async () => {
    const post: PostResponse = await fetchPost();
    fetchComments(post.post.post_impressions_id);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Post</h2>
      </div>
      {data && (
        <div className="flex flex-col space-y-5">
          <Post
            impression={data.post.impressions}
            media={data.post.media}
            fetchHandler={() => console.log("Feature not implemented")}
            id={data.post.id}
            currentlyEditing={""}
            currentlyEditingHandler={() =>
              console.log("Feature not implemented")
            }
            body={data.post.content}
            isLiked={data.post.is_liked}
            isOwned={data.post.is_owned}
            name={data.post.user.name}
            views={data.post.impressions.views}
            posted={data.post.created_at}
          />

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

                <div className="flex space-x-3">
                  <Button onClick={() => toggleOpenInput()} variant="outline">
                    Batalkan
                  </Button>
                  {isLoading ? (
                    <Button disabled className="px-6">
                      <LoadingSpinner />
                    </Button>
                  ) : (
                    <Button
                      onClick={submitComment}
                      type="button"
                      className="px-6"
                    >
                      Kirim
                    </Button>
                  )}
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
                    placeholder="Masukan komentar..."
                  />
                </div>
              </div>
            )}
          </div>

          {comments?.comments.map((item, index) => {
            return (
              <Comment
                is_owned={item.is_owned}
                user={item.user}
                likes={item.likes}
                owner_id={item.owner_id}
                post_impressions_id={item.post_impressions_id}
                updated_at={item.updated_at}
                comment={item.comment}
                id={item.id}
                is_liked={item.is_liked}
                created_at={item.created_at}
                key={index}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
