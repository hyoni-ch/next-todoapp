'use client'

type TTodo = {
    id: number
    content: string
    isDone: boolean
}

type TProps = {
    todos: TTodo[] | undefined
}
export default function TodoList({todos}:TProps) {
  return (
    <>
    {todos?.map((todo, index) => (
        <div key={todo.id}>
            {todo.content}
            <button onClick={()=>null}>del</button>
            <button onClick={()=>null}>done</button>
        </div>
))}
</>
  )
}
