import React from "react";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";
import Link from "next/link";

export default function createPage() {
  const handlePostSubmit = async (formData: FormData) => {
    "use server";
    console.log("doing server action, here");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      return;
    }

    const result = await prisma?.post.create({
      data: {
        title,
        content,
      },
    });

    if (result) {
      console.log("success");
      revalidatePath("/post");
      return;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-3">글쓰기</h1>
      <form action={handlePostSubmit} className="flex flex-col mb-5">
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
        <Link href={`/post`}>
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 leading-6 text-white shadow-sm hover:bg-indigo-500 my-2">
            취소
          </button>
        </Link>
      </form>
    </div>
  );
}
