"use client";
import React, { useState } from "react";
import Link from "next/link";
import { handlePostSubmit, handlePostUpdate } from "@/app/actions/postAction";

export default function PostCreate({
  params,
}: {
  params?: { postId: string };
}) {
  const isPostId = params ? parseInt(params.postId) : false;

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const postData = {
      title,
      content,
    };

    if (!title || !content) {
      alert("제목와 내용을 입력하세요.");
      return;
    }

    if (!isPostId) {
      // createPost
      const result = await handlePostSubmit(postData);

      if (!result) {
        alert("게시판 작성에 실패했습니다.");
        return;
      } else {
        formRef.current?.reset();
        window.location.href = "/post";
      }
    } else {
      // updatePost
      const result = await handlePostUpdate(isPostId, postData);
      if (!result) {
        alert("게시판 작성에 실패했습니다.");
        return;
      } else {
        formRef.current?.reset();
        window.location.href = "/post/" + isPostId;
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-3">글쓰기</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mb-5">
        <div>제목</div>
        <input
          type="text"
          name="title"
          className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
          placeholder="제목을 입력하세요"
        />
        <div>내용</div>
        <textarea
          name="content"
          className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
          placeholder="내용을 입력하세요"
        />
        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 leading-6 text-white shadow-sm hover:bg-indigo-500 my-2">
          등록
        </button>
        <Link href={"/post"}>
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 leading-6 text-white shadow-sm hover:bg-indigo-500 my-2">
            취소
          </button>
        </Link>
      </form>
    </div>
  );
}
