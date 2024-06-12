"use client";
import React from "react";

type Post = {
  id: number;
};

type Reply = {
  id: number;
  postId: number;
  replyContent: string;
  createdAt: Date | string | number;
};

type PostProps = {
  posts: Post;
  replys: Reply[] | undefined;
  handleReplySubmit: (replyId: number, formData: FormData) => void;
};

export default function ReplyInput({ posts, handleReplySubmit }: PostProps) {
  return (
    <>
      <div className="mt-4">댓글</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleReplySubmit(
            posts.id,
            new FormData(e.target as HTMLFormElement)
          );
        }}
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
    </>
  );
}
