"use client";
import React, { useState } from "react";

type Props = {
  handlePostSubmit: (formData: FormData) => void;
};

export default function PostInput({ handlePostSubmit }: Props) {
  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold my-3">게시판</h1>
      <form action={handlePostSubmit} className="flex flex-col mb-5">
        <div>제목</div>
        <input
          type="text"
          name="title"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="제목을 입력하세요"
        />
        <div>내용</div>
        <textarea
          name="content"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
          placeholder="내용을 입력하세요"
        />
        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-2">
          등록
        </button>
      </form>
    </>
  );
}
