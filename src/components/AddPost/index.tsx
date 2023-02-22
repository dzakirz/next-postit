"use client";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type TextareaEvent = ChangeEvent<HTMLTextAreaElement>;

export default function AddPost() {
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let toastPostId: string;

  const contentLength = content.length > 300 ? "text-red-700" : "text-gray-700";

  const { mutate } = useMutation({
    mutationFn: async (content: string) => {
      return await axios.post("http://localhost:3000/api/posts", { content });
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message, {id: toastPostId});
      }
      setIsDisabled((prev) => !prev);
    },
    onSuccess: (data) => {
      toast.success("post created", {id: toastPostId});
      setContent("");
      setIsDisabled((prev) => !prev);
    },
  });

  const handleCange = (e: TextareaEvent) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading("creating", {id: toastPostId})
    setIsDisabled((prev) => !prev);
    mutate(content);
  };

  return (
    <form className="p-8 my-8 bg-white rounded-md" onSubmit={handleSubmit}>
      <div className="flex flex-col my-4">
        <textarea
          className="p-4 my-2 text-lg bg-gray-200 rounded-md"
          name="content"
          id="content"
          placeholder="What's on your mind?"
          value={content}
          onChange={handleCange}
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${contentLength}`}>
          {content.length}/300
        </p>
        <button
          className="px-5 py-2 text-sm text-white bg-teal-600 rounded-xl disabled:opacity-25"
          type="submit"
          disabled={isDisabled}
        >
          Create a post
        </button>
      </div>
    </form>
  );
}
