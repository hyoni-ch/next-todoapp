import React from "react";
import PostDetail from "../components/PostDetail";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";

export default async function postIdPage({
  params,
}: {
  params: { postId: string };
}) {
  const postId = parseInt(params.postId);

  const posts = await prisma?.post.findUnique({
    where: { id: postId },
  });

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
    <PostDetail
      posts={posts}
      replys={replys}
      handlePostDelete={handlePostDelete}
      handleReplyDelete={handleReplyDelete}
      handlePostUpdate={handlePostUpdate}
      handleReplyUpdate={handleReplyUpdate}
      handleReplySubmit={handleReplySubmit}
    />
  );
}
