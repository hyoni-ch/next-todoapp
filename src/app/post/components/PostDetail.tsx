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
  handleReplySubmit: (replyId: number, formData: FormData) => void;
};

export default function PostDetail({
  posts,
  replys,
  handlePostDelete,
  handleReplyDelete,
  handlePostUpdate,
  handleReplyUpdate,
  handleReplySubmit,
}: PostProps) {
  const [updatePostId, setUpdatePostId] = useState<number | null>(null);
  const [updateReplyId, setUpdateReplyId] = useState<number | null>(null);

  const handlePostUpdateOpen = (postId: number) => {
    setUpdatePostId(postId);
  };

  const handlePostUpdateClose = () => {
    setUpdatePostId(null);
  };

  const handleReplyUpdateOpen = (replyId: number) => {
    setUpdateReplyId(replyId);
  };

  const handleReplyUpdateClose = () => {
    setUpdateReplyId(null);
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
            onClick={() => handlePostDelete(posts.id)}
          >
            삭제
          </button>
        </div>

        <div className="mt-4 text-2xl">댓글</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReplySubmit(
              posts.id,
              new FormData(e.target as HTMLFormElement)
            );
          }}
        >
          <div className="flex items-center">
            <input
              type="text"
              name="content-reply"
              className="block rounded-md border-0 py-1 pl-3 pr-15 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 w-full"
              placeholder="댓글을 입력하세요"
            />
            <button className="mx-1 min-w-8">확인</button>
          </div>
        </form>

        <div>
          {replys?.map((reply) => (
            <div key={reply.id}>
              {reply.postId === posts.id && (
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="mx-1 w-full">{reply.replyContent}</div>
                    <div className="flex justify-center items-center min-w-16 float-right">
                      <button
                        className="mr-1 text-sm hover:text-indigo-800"
                        onClick={() => {
                          handleReplyUpdateOpen(reply.id);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="text-sm hover:text-red-600"
                        onClick={() => handleReplyDelete(reply.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  <div className="text-xs float-right text-gray-600">
                    {reply.createdAt.toLocaleString()} 작성됨
                  </div>
                </div>
              )}

              {updateReplyId === reply.id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReplyUpdate(
                      reply.id,
                      new FormData(e.target as HTMLFormElement)
                    );
                    handleReplyUpdateClose();
                  }}
                  className="flex"
                >
                  <input
                    type="text"
                    name="content-reply-update"
                    className="block rounded-md border-0 py-1 pl-3 pr-15 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 w-full"
                    placeholder="수정할 댓글 내용을 입력하세요"
                  />
                  <div className="flex justify-center items-center min-w-16 float-right">
                    <button className="mx-1 text-sm">수정</button>
                    <button
                      type="button"
                      onClick={() => handleReplyUpdateClose()}
                      className="text-sm"
                    >
                      취소
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
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
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="수정할 제목을 입력하세요"
            />
            <div>내용</div>
            <textarea
              name="content-update"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              placeholder="수정할 내용을 입력하세요"
            />
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-2">
              수정
            </button>
            <button
              type="button"
              onClick={() => handlePostUpdateClose()}
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              취소
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
