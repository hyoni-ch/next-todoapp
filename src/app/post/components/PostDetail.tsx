"use client";
import React, { useState } from "react";
import Link from "next/link";
import { handlePostDelete, handlePostUpdate } from "@/app/actions/postAction";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string | number;
};

type PostProps = {
  posts: Post | null | undefined;
};

export default function PostDetail({ posts }: PostProps) {
  const [updatePostId, setUpdatePostId] = useState<number | null>(null);

  const handlePostUpdateOpen = (postId: number) => {
    setUpdatePostId(postId);
  };

  const handlePostUpdateClose = () => {
    setUpdatePostId(null);
  };

  if (!posts) return null;

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="text-2xl">제목</div>
        <div className="">{posts.title}</div>
        <div className="text-2xl mt-3">내용</div>
        <div>{posts.content}</div>
        <div className="text-xs mt-2 text-gray-600">
          {posts.createdAt.toLocaleString()} 작성됨
        </div>

        <div className="float-right">
          <div>
            <button
              className="mr-1 hover:text-indigo-700"
              onClick={() => handlePostUpdateOpen(posts.id)}
            >
              수정
            </button>
            <button
              className="hover:text-red-600"
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  handlePostDelete(posts.id);
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

        {updatePostId === posts.id && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePostUpdate(
                posts.id,
                new FormData(e.target as HTMLFormElement)
              );
              handlePostUpdateClose();
            }}
            className="flex flex-col"
          >
            <div>제목</div>
            <input
              type="text"
              name="title-update"
              className=""
              placeholder="수정할 제목을 입력하세요"
            />
            <div>내용</div>
            <textarea
              name="content-update"
              className=""
              placeholder="수정할 내용을 입력하세요"
            />
            <button className="">수정</button>
            <button
              type="button"
              onClick={() => handlePostUpdateClose()}
              className=""
            >
              취소
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
