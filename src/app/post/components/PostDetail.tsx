"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { postDelete } from "@/app/actions/postAction";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="">
      <div className="">
        <div className="text-2xl">제목</div>
        <div className="">{post.title}</div>
        <div className="text-2xl mt-3">내용</div>
        <div className="whitespace-pre-line">{post.content}</div>
        <div className="text-xs mt-2 text-gray-600">
          {post.createdAt.toLocaleString()} 작성됨
        </div>

        <div className="">
          <div className="flex justify-end">
            <button className="mr-1 hover:text-indigo-700">
              <Link href={`/post/${post.id}/update`}>수정</Link>
            </button>
            <button
              className="hover:text-red-600"
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  postDelete(post.id);
                  alert("삭제가 완료되었습니다");
                  router.replace("/post");
                }
              }}
            >
              삭제
            </button>
          </div>

          <div className="flex justify-end">
            <button className="">
              <Link className="block w-full" href={`/post`}>
                목록
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
