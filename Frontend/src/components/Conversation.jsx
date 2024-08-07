import React from 'react';
import { Avatar, Box, Typography, Divider, Badge } from '@mui/material';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

export default function Conversation({conversation}) {

  const{selectedConversation,setSelectedConversation}=useConversation();

  const selected=selectedConversation?._id===conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
    <div onClick={()=>setSelectedConversation(conversation)} className={`${selected?"md:bg-[#87CEEB]":""}`}>
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

            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              color="success"
              invisible={!isOnline}
            >
              <Avatar
                src={conversation.profilePic}
                sx={{ width: 36, height: 36 }}
              />
            </Badge>

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
