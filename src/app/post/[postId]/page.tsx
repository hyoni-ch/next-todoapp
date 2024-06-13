import React from "react";
import PostDetail from "../components/PostDetail";
import ReplyInput from "../components/ReplyInput";
import ReplyList from "../components/ReplyList";
import { getUniquePosts } from "@/app/actions/postAction";
import { getReply } from "@/app/actions/replyAction";

export default async function postIdPage({
  params,
}: {
  params: { postId: string };
}) {
  const postId = parseInt(params.postId);
  const post = await getUniquePosts(postId);
  const replys = await getReply();

  return (
    <div className="max-w-screen-md">
      <PostDetail post={post} />
      <ReplyInput post={post} />
      <ReplyList post={post} replys={replys} />
    </div>
  );
}
