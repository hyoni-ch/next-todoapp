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

  const handlePostUpdate = async (postId: number, formData: FormData) => {
    "use server";

    const title = formData.get("title-update") as string;
    const content = formData.get("content-update") as string;

    const result = await prisma?.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
      },
    });

    if (result) {
      console.log("success");
      revalidatePath("/todo");
      return;
    }
  };

  const handlePostDelete = async (postId: number) => {
    "use server";
    const result = await prisma?.post.delete({
      where: {
        id: postId,
      },
    });

    if (result) {
      console.log("success");
      revalidatePath("/todo");
      return;
    }
  };

  const replys = await prisma?.reply.findMany({
    orderBy: { id: "desc" },
  });

  const handleReplySubmit = async (postId: number, formData: FormData) => {
    "use server";
    const content = formData.get("content-reply") as string;

    const result = await prisma?.reply.create({
      data: {
        replyContent: content,
        post: {
          connect: { id: postId },
        },
      },
    });

    if (result) {
      console.log("success");
      revalidatePath("/todo");
      return;
    }
  };

  const handleReplyUpdate = async (replyId: number, formData: FormData) => {
    "use server";
    const content = formData.get("content-reply-update") as string;

    const result = await prisma?.reply.update({
      where: {
        id: replyId,
      },
      data: {
        replyContent: content,
      },
    });

    if (result) {
      console.log("success");
      revalidatePath("/todo");
      return;
    }
  };

  const handleReplyDelete = async (replyId: number) => {
    "use server";
    const result = await prisma?.reply.delete({
      where: {
        id: replyId,
      },
    });

    if (result) {
      console.log("success");
      revalidatePath("/todo");
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <PostInput handlePostSubmit={handlePostSubmit} />
      <PostList
        posts={posts}
        replys={replys}
        handlePostDelete={handlePostDelete}
        handlePostUpdate={handlePostUpdate}
        handleReplySubmit={handleReplySubmit}
        handleReplyDelete={handleReplyDelete}
        handleReplyUpdate={handleReplyUpdate}
      />
    </div>
  );
}