import React from "react";
import PostDetail from "../components/PostDetail";
import ReplyInput from "../components/ReplyInput";
import ReplyList from "../components/ReplyList";
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

  const replys = await prisma?.reply.findMany({});
  return (
    <>
      <PostDetail posts={posts} />
      <ReplyInput posts={posts || { id: 0 }} />
      <ReplyList posts={posts || { id: 0 }} replys={replys} />
    </>
  );
}
