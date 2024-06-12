import React from "react";
import PostInput from "@/app/post/components/PostInput";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";

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
      <PostInput handlePostSubmit={handlePostSubmit} />
    </div>
  );
}
