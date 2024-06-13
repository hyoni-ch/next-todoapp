"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";

export async function getReply() {
  const result = await prisma?.reply.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
}

export async function handleReplySubmit(postId: number, formData: FormData) {
  const content = formData.get("content-reply") as string;

  if (!content) {
    return;
  }

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
}

export async function handleReplyUpdate(replyId: number, formData: FormData) {
  const content = formData.get("content-reply-update") as string;

  if (!content) {
    return;
  }

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
}

export async function handleReplyDelete(replyId: number) {
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
}
