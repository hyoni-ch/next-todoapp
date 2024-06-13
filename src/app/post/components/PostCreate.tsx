"use client";
import React, { useState } from "react";
import Link from "next/link";
import { newPost, postUpdate, postUpsert } from "@/app/actions/postAction";
import { useRouter } from "next/navigation";

export default function PostCreate({
  params,
}: {
  params?: { postId: string };
}) {
  const isPostId = params ? parseInt(params.postId) : null;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (!isPostId) {
      const result = await newPost(formData);
      if (result) {
        alert("게시글 등록에 성공했습니다.");
        router.replace("/post");
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    } else {
      await postUpdate(isPostId, formData);
    }
  };

  //   const result = await postUpsert(isPostId, formData);
  //   if (result) {
  //     if (isPostId) {
  //       alert("게시글 수정에 성공했습니다.");
  //     } else {
  //       alert("게시글 등록에 성공했습니다.");
  //     }
  //     router.replace("/post");
  //   } else {
  //     if (isPostId) {
  //       alert("게시글 수정에 실패했습니다.");
  //     } else {
  //       alert("게시글 등록에 실패했습니다.");
  //     }
  //   }
  // };

  return (
    <div className="mx-auto max-w-max">
      <h1 className="text-3xl font-bold my-3">
        {isPostId ? "수정하기" : "글쓰기"}
      </h1>
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
        <div className="flex justify-around mt-2">
          <button className="w-1/3 rounded-md bg-indigo-600 px-3 py-1.5 leading-6 text-white shadow-sm hover:bg-indigo-500">
            등록
          </button>

          <button className="w-1/3 rounded-md bg-indigo-600 px-3 py-1.5 leading-6 text-white shadow-sm hover:bg-indigo-500">
            <Link href={"/post"} className="block w-full">
              취소
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
