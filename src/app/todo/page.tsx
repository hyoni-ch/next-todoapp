import React from 'react'
import TodoList from './components/TodoList'

type TTodo = {
    id: number
    content: string
    isDone: boolean
}

export default async function TodoPage() {
    const prisma: any = null
    const data = await prisma?.todo.findMany({
        orderBy: {id:'desc'},
    })

    const mockupData:TTodo[] = [
        {id:1, content: '할 일 1', isDone:false},
        {id:2, content: '할 일 2', isDone:true},
        {id:3, content: '할 일 3', isDone:false},
    ]

    const handleSubmit = async (formData: FormData) => {
        'use server'
        console.log('doing server action, here')
        // prisma orm 사용해서 데이터베이스에 데이터 추가
        // 성공 시 현재 페이지를 revalidate 한다.
    }
  return (
    <div className='p-4'>
        <h1 className='text-3xl text-center'>Todo</h1>
        <form action={handleSubmit}>
            <input type='text' placeholder='할 일을 입력해주세요' />
            <input type='submit' value='추가' />
        </form>
        <TodoList todos={mockupData}/>
    </div>
  )
}
