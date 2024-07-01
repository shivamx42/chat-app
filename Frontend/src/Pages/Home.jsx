import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

export default function Home() {
  return (
    <>
    <div className='flex'>
      <Sidebar/>
      <MessageContainer/>
    </div>
    </>
  )
}
