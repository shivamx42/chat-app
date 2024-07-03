import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'
import { IoArrowBackSharp } from "react-icons/io5";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <div 
          className={` ${isChatOpen ? 'hidden md:block w-[200px]' : 'w-full md:w-[400px] '} ${isChatOpen ? 'md:border-r md:border-[#808080]' : ''}`} 
        >
          <Sidebar setIsChatOpen={setIsChatOpen}/>
        </div>
        
        <div className={`${isChatOpen ? 'block' : 'hidden md:block'}`}>
          <MessageContainer />
          
          {isChatOpen && (
            <button
              className="md:hidden absolute top-5 right-5 bg-blue-300 text-gray-700 px-4 py-2 rounded border border-gray-700"
              onClick={() => setIsChatOpen(false)}
            >
              <IoArrowBackSharp />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
