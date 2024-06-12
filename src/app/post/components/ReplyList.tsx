"use client";
import React, { useState } from "react";

type Post = {
  id: number;
};

type Reply = {
  id: number;
  postId: number;
  replyContent: string;
  createdAt: Date | string | number;
};

type PostProps = {
  posts: Post;
  replys: Reply[] | undefined;
  handlePostDelete: (postId: number) => void;
  handleReplyDelete: (replyId: number) => void;
  handlePostUpdate: (postId: number, formData: FormData) => void;
  handleReplyUpdate: (replyId: number, formData: FormData) => void;
};

export default function ReplyList({
  posts,
  replys,
  handleReplyDelete,
  handleReplyUpdate,
}: PostProps) {
  const [updateReplyId, setUpdateReplyId] = useState<number | null>(null);

  const handleReplyUpdateOpen = (replyId: number) => {
    setUpdateReplyId(replyId);
  };

  const handleReplyUpdateClose = () => {
    setUpdateReplyId(null);
  };
  return (
    <div>
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
                      onClick={() => {
                        if (confirm("정말 삭제하시겠습니까?")) {
                          handleReplyDelete(reply.id);
                        }
                      }}
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
    </div>
  );
}
