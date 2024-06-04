'use client'

import React from 'react'

export default function CounterBox() {
    const [count, setCount] = React.useState<number>(0) 
  return (
    <><p className='text-center'>Counter: {count}</p>
    <button className='border py-4 px-8 round-xl' onClick={()=> {
        console.log('clicked');
    setCount(current => current + 1) }}>Increase</button></>
  )
}
