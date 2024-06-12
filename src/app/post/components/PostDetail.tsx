"use client";
import React, { useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string | number;
};

type Reply = {
  id: number;
  postId: number;
  replyContent: string;
  createdAt: Date | string | number;
};

type PostProps = {
  posts: Post | null | undefined;
  replys: Reply[] | undefined;
  handlePostDelete: (postId: number) => void;
  handleReplyDelete: (replyId: number) => void;
  handlePostUpdate: (postId: number, formData: FormData) => void;
  handleReplyUpdate: (replyId: number, formData: FormData) => void;
};

export default function PostDetail({
  posts,
  replys,
  handlePostDelete,
  handlePostUpdate,
}: PostProps) {
  const [updatePostId, setUpdatePostId] = useState<number | null>(null);

  const handlePostUpdateOpen = (postId: number) => {
    setUpdatePostId(postId);
  };

  const handlePostUpdateClose = () => {
    setUpdatePostId(null);
  };

  if (!posts) return null;

  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-screen-md">
        <div className="text-2xl">제목</div>
        <div className="">{posts.title}</div>
        <div className="text-2xl mt-3">내용</div>
        <div>{posts.content}</div>
        <div className="text-xs mt-2 text-gray-600">
          {posts.createdAt.toLocaleString()} 작성됨
        </div>

        <div className="float-right">
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
