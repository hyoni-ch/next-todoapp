"use client";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

type TTodo = {
  id: number;
  content: string;
  isDone: boolean;
};

type TProps = {
  todos: TTodo[] | undefined;
  handleDelete: (postId : number) => void;
};

export default function TodoList({ todos,handleDelete }: TProps) {

    

  return (
    <>
      {todos?.map((todo) => (
        <div key={todo.id}>
          {todo.content}
          <button onClick={() => handleDelete(todo.id)}>삭제</button>
          <button onClick={() => null}>확인</button>
        </div>
      ))}
    </>
  );
}
