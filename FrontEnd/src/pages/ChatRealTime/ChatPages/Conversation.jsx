import React from 'react'
import { useSelector } from 'react-redux'

function Conversation() {
    const currentConversation = useSelector((state) => state.currentConversationReducer);
    console.log(currentConversation);
    
  return (
    <div>
        <div>
            <div className='flex items-center justify-between bg-[#161a1d] text-white px-4 py-1.5'>
                <h1 className='text-sm font-bold'>Conversation</h1>
                <div className='flex items-center gap-2'>
                    <img src={currentConversation?.image || ''} alt="" className='w-10 h-10 rounded-full' />
                    <h1 className='text-lg font-semibold'>{currentConversation?.name}</h1>
                </div>
            </div>
            <div className='mt-4'>
                <p>{currentConversation?.message}</p>
            </div>
        </div>
    </div>
  )
}

export default Conversation