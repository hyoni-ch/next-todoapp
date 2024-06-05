import React from "react";
import TodoList from "./components/TodoList";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export default async function TodoPage() {
  const todoList = await prisma?.todo.findMany({
    orderBy: { id: "desc" },
  });

  const handleSubmit = async (formData: FormData) => {
    "use server";
    console.log("doing server action, here");

    const content = formData.get("content") as string;
    // prisma orm 사용해서 데이터베이스에 데이터 추가
    const result = await prisma?.todo.create({
      data: {
        content, // 이름이 같을 때는 생략해도 가능 content: content, <<
      },
    });

    // 성공 시 현재 페이지를 revalidate 한다.
    // 서버에서 통신하기 때문에 next.js에서는 revalidatePath를 사용
    if (result) {
      console.log("success");
      revalidatePath("/todo");
      return;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center">Todo</h1>
      <form action={handleSubmit}>
        <input type="text" name="content" placeholder="할 일을 입력해주세요" />
        <input type="submit" value="추가" />
      </form>
      <TodoList todos={todoList} />
    </div>
  );
}
