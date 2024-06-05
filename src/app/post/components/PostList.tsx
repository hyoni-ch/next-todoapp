"use client";
import React from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

type PostProps = {
  posts: Post[] | undefined;
};

export default function PostList(
  { posts }: PostProps,
  { handlePostDelete }: any
) {
  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} className="">
          <div>제목 : {post.title}</div>
          <div>내용 : {post.content}</div>
          <div>{post.id}</div>
          <div>
            <button>수정</button>
            <button onClick={() => handlePostDelete(post.id)}>삭제</button>
          </div>
        </div>
      ))}
    </>
  );
}
