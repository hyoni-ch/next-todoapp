"use client";
import React, { useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

type Reply = {
  id: number;
  replyContent : string;
}

type PostProps = {
  posts: Post[] | undefined;
  //reply: Reply[] | undefined;
  handlePostDelete: (postId : number) => void;
  handlePostUpdate: (postId: number, formData: FormData) => void;
  handleReplySubmit: (postId: number, formData: FormData) => void;
};


export default function PostList(
  { posts, handlePostDelete, handlePostUpdate, handleReplySubmit }: PostProps,
) {

  const [editPostId, setEditPostId] = useState<number | null>(null);
  
  const handlePostUpdateOpen = (postId: number) => {
    setEditPostId(postId);
  }

  const handlePostUpdateClose = () => {
    setEditPostId(null);
  }


  return (
    <>
    <h1 className='text-3xl font-bold my-3'>List</h1>
    
      {posts?.map((post) => (
        <div key={post.id} className="">
          <div className='text-2xl'>제목</div>
          <div className="">{post.title}</div>
          <div className='text-2xl'>내용</div>
          <div>{post.content}</div>
          <div>댓글</div>
          <div></div>
          <form onSubmit={(e) => {
              e.preventDefault();
              handleReplySubmit(post.id, new FormData(e.target as HTMLFormElement));
            }}>
            <div className="flex items-center">
              <input type="text" name='content-reply' className="block w-90 rounded-md border-0 py-1 pl-5 pr-15 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " placeholder="댓글을 입력하세요"/>
              <button>확인</button>
            </div>
          </form>
          
          <div>
            <button onClick={() => handlePostUpdateOpen(post.id)}>수정</button>
            <button onClick={() => handlePostDelete(post.id)}>삭제</button>
          </div>

          
        {editPostId === post.id && (
          <form onSubmit={(e) => {
              e.preventDefault();
              handlePostUpdate(post.id, new FormData(e.target as HTMLFormElement));
              handlePostUpdateClose();
            }}
            className='flex flex-col'>
            <div>제목</div>
            <input type="text" name="title-update" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="수정할 제목을 입력하세요" />
            <div>내용</div>
            <textarea name="content-update" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " placeholder="수정할 내용을 입력하세요" />
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-2">등록</button>
            <button type="button" onClick={() => handlePostUpdateClose()} className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">취소</button>
          </form>
          )}
          
        </div>
      ))}
    </>
  );
}
