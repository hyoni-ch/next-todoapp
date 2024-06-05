"use client";

type TTodo = {
  id: number;
  content: string;
  isDone: boolean;
};

type TProps = {
  todos: TTodo[] | undefined;
};

export default function TodoList({ todos }: TProps) {
  return (
    <>
      {todos?.map((todo) => (
        <div key={todo.id}>
          {todo.content}
          <button onClick={() => null}>삭제</button>
          <button onClick={() => null}>확인</button>
        </div>
      ))}
    </>
  );
}
