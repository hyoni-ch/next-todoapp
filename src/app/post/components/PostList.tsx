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
  posts: Post[] | undefined;
  replys: Reply[] | undefined;
  handlePostDelete: (postId: number) => void;
  handleReplyDelete: (replyId: number) => void;
  handlePostUpdate: (postId: number, formData: FormData) => void;
  handleReplyUpdate: (replyId: number, formData: FormData) => void;
  handleReplySubmit: (replyId: number, formData: FormData) => void;
};

export default function PostList({
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

  return (
    <>
      <h1 className="text-3xl font-bold my-3">List</h1>
      <div className="h-96 max-w-xs overflow-y-auto scrollbar-custom">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="ring-1 ring-inset ring-gray-300 rounded-md p-5 m-2"
          >
            <div className="text-2xl">제목</div>
            <div className="">{post.title}</div>
            <div className="text-2xl mt-3">내용</div>
            <div>{post.content}</div>
            <div className="text-xs mt-2">
              {post.createdAt.toLocaleString()}
            </div>
            <div className="mt-2">
              <button
                className="mr-1"
                onClick={() => handlePostUpdateOpen(post.id)}
              >
                수정
              </button>
              <button onClick={() => handlePostDelete(post.id)}>삭제</button>
            </div>
            <div className="mt-4 text-2xl">댓글</div>
            {updateReplyId === null && (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReplySubmit(
                      post.id,
                      new FormData(e.target as HTMLFormElement)
                    );
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="content-reply"
                      className="block rounded-md border-0 py-1 pl-5 pr-15 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="댓글을 입력하세요"
                    />
                    <button className="mx-1">확인</button>
                  </div>
                </form>
              </>
            )}
            <div>
              {replys?.map((reply) => (
                <div key={reply.id}>
                  {reply.postId === post.id && (
                    <div className="flex items-center">
                      <div className="mx-1">{reply.replyContent}</div>
                      <div className="text-xs mr-1">
                        {reply.createdAt.toLocaleString()}
                      </div>
                      <button
                        className="mr-1 w-min"
                        onClick={() => handleReplyUpdateOpen(reply.id)}
                      >
                        수정
                      </button>
                      <button onClick={() => handleReplyDelete(reply.id)}>
                        삭제
                      </button>
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
                        className="block w-90 rounded-md border-0 py-1 pl-5 pr-15 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        placeholder="수정할 댓글 내용을 입력하세요"
                      />
                      <button className="mx-1">수정</button>
                      <button
                        type="button"
                        onClick={() => handleReplyUpdateClose()}
                        className=""
                      >
                        취소
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>

            {updatePostId === post.id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePostUpdate(
                    post.id,
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
        ))}
      </div>
    </>
  );
}
