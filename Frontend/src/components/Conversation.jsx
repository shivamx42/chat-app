import React from 'react';
import { Avatar, Box, Typography, Divider } from '@mui/material';
import useConversation from '../zustand/useConversation';

export default function Conversation({conversation}) {

  const{selectedConversation,setSelectedConversation}=useConversation();

  const selected=selectedConversation?._id===conversation._id;

  return (
    <>
    <div onClick={()=>setSelectedConversation(conversation)} className={`${selected?"bg-[#87CEEB]":""}`}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          '&:hover': {
            backgroundColor: 'skyblue',
          },
          borderRadius: 1,
          p: 2,
          py: 2,
          cursor: 'pointer',
        }}
      >
        <Avatar
          src={conversation.profilePic}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <Typography variant='body1' fontWeight='bold' color='text.secondary'>
              {conversation.username}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
      <Divider sx={{ my: 0, py: 0 }} />
    </>
  );
}
