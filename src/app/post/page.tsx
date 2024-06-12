import React, { useState } from "react";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import PostList from "./components/PostList";
import PostInput from "./components/PostInput";

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

  return (
    <div className="flex flex-col justify-center items-center">
      <PostInput handlePostSubmit={handlePostSubmit} />
      <PostList posts={posts} />
    </div>
  );
}
