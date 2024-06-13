import React from "react";
import PostCreate from "@/app/post/components/PostCreate";

export default function updatePage({
  params,
}: {
  params?: { postId: string };
}) {
  return <PostCreate params={params} />;
}
