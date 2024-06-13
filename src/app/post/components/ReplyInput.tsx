"use client";
import React from "react";
import { handleReplySubmit } from "@/app/actions/replyAction";

type Post = {
  id: number;
};

type PostProps = {
  post: Post | null;
};

export default function ReplyInput({ post }: PostProps) {
  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleReplySubmit(post.id, new FormData(e.target as HTMLFormElement));
      }}
      className="mt-5"
    >
      <div className="flex items-center">
        <input
          type="text"
          name="content-reply"
          className="block rounded-md border-0 py-1 pl-3 pr-15 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 w-full"
          placeholder="댓글을 입력하세요"
        />
        <button className="mx-1 min-w-8">확인</button>
      </div>
    </form>
  );
}
