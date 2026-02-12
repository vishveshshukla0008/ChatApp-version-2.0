
import React from 'react'
import Sidebar from '../Components/Sidebar'
import { useChatStore } from '../Store/useChatStore'
import NoChatSelected from '../Components/NoChatSelected'
import ChatContainer from '../Components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore()
  return (
    <div className='h-[91vh] bg-base-200'>
      <div className="flex items-center justify-center px-2">
        <div className='bg-base-100 rounded-lg shadoe-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage