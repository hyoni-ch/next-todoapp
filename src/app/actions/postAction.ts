"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";

export async function getAllPosts() {
  const result = await prisma?.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
}

export async function getUniquePosts(postId: number) {
  const result = await prisma?.post.findUnique({
    where: { id: postId },
  });

  return result;
}

export async function handlePostSubmit(formData: FormData) {
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
}

export async function handlePostUpdate(postId: number, formData: FormData) {
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
}

export async function handlePostDelete(postId: number) {
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
}
