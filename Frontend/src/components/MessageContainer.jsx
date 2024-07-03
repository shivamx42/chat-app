import React, { useEffect } from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { Box, Divider, Typography } from '@mui/material';
import useConversation from '../zustand/useConversation';

export default function MessageContainer() {
  const{selectedConversation,setSelectedConversation}=useConversation();
  useEffect(()=>{
    setSelectedConversation(null);
  },[])

  if(!selectedConversation) return(
    <></>
  )

  return (
    <div className='w-full md:w-[450px]'>
    <Box sx={{ display: 'flex', flexDirection: 'column',height:'100vh', mx:3 }}>
      <Box sx={{ px: 4, py: 8, mb: 2 }}>
        <Typography variant="body1">
          <span className="label-text text-gray-500">To :</span> <span className="text-gray-700 font-bold">{selectedConversation.name}</span>
        </Typography>
      <Divider sx={{ my: 3 , borderBottomWidth:2 , borderColor:'gray'}} />
      </Box>
      <Messages />
      <MessageInput />
    </Box>

    </div>
  );
}
