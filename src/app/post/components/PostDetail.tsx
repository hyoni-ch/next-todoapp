"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { handlePostDelete } from "@/app/actions/postAction";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string | number;
};

type PostProps = {
  post: Post | null;
};

export default function PostDetail({ post }: PostProps) {
  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col max-w-screen">
      <div className="">
        <div className="text-2xl">제목</div>
        <div className="">{post.title}</div>
        <div className="text-2xl mt-3">내용</div>
        <div>{post.content}</div>
        <div className="text-xs mt-2 text-gray-600">
          {post.createdAt.toLocaleString()} 작성됨
        </div>

        <div className="float-right">
          <div>
            <button className="mr-1 hover:text-indigo-700">
              <Link href={`/post/${post.id}/update`}>수정</Link>
            </button>
            <button
              className="hover:text-red-600"
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  handlePostDelete(post.id);
                }
              }}
            >
              삭제
            </button>
          </div>

          <Link className="float-right" href={`/post`}>
            <button>목록</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
