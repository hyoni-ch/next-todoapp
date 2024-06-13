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

export async function postUpsert(postId: number | null, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  if (!title || !content) {
    return false;
  }

  const result = await prisma.post.upsert({
    where: {
      id: postId ?? undefined,
    },
    update: {
      title,
      content,
    },
    create: {
      title,
      content,
    },
  });

  if (result) {
    console.log("success");
    revalidatePath("/path");
    return true;
  }
}

export async function newPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return false;
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
    return true;
  }
}

export async function postUpdate(postId: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

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

export async function postDelete(postId: number) {
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
