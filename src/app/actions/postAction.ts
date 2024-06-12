import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";

export const handlePostSubmit = async (formData: FormData) => {
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

export const handlePostUpdate = async (postId: number, formData: FormData) => {
  const title = formData.get("title-update") as string;
  const content = formData.get("content-update") as string;

  if (!title || !content) {
    return;
  }

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

export const handlePostDelete = async (postId: number) => {
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

export const handleReplySubmit = async (postId: number, formData: FormData) => {
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
};

export const handleReplyUpdate = async (
  replyId: number,
  formData: FormData
) => {
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
};

export const handleReplyDelete = async (replyId: number) => {
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
