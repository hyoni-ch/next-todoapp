import React, { useState } from "react";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import PostList from "./components/PostList";

export default async function postPage() {
  const posts = await prisma?.post.findMany({
    orderBy: { id: "desc" },
  });

  const handlePostSubmit = async (formData: FormData) => {
    "use server";
    console.log("doing server action, here");

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

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

  const handlePostDelete = async (postId: any) => {
    "use server";
    console.log(postId);
  };

  return (
    <div>
      <h1>게시판</h1>

      <form action={handlePostSubmit}>
        <div>제목</div>
        <input type="text" name="title" />
        <div>내용</div>
        <textarea name="content" />
        <button>등록</button>
      </form>

      <PostList handlePostDelete={handlePostDelete} />
    </div>
  );
}
