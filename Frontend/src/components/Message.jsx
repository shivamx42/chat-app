import React, { useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../zustand/useConversation';

export default function Message({ message }) {
  const {authUser}=useAuthContext();
  const {selectedConversation}=useConversation();


  const getTime=(time)=>{
    const date = new Date(time);
    const hours = (date.getHours()).toString().padStart(2, "0");;
    const minutes = (date.getMinutes().toString().padStart(2, "0"));
    return `${hours}:${minutes}`;
  }

  const sentByUser=message.senderId===authUser._id;
  const formattedTime = getTime(message.createdAt); 
  const chatClassName = sentByUser ? "flex-end" : "flex-start";
  const profilePic = sentByUser?authUser.profilePic: selectedConversation.profilePic; 
  const bubbleBgColor = sentByUser ? 'blue' : 'grey';
  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <Box sx={{ display: 'flex', flexDirection: chatClassName, mb: 2 }}>
      <Avatar src={profilePic} alt='profile' sx={{ width: 40, height: 40 }} />
      <Box
        sx={{
          bgcolor: bubbleBgColor,
          color: 'white',
          borderRadius: 2,
          p: 2,
          ml: sentByUser ? 'auto' : 1,
          mr: sentByUser ? 1 : 'auto',
          maxWidth: '60%',
          wordBreak: 'break-word',
          animation: shakeClass ? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both' : 'none',
        }}
      >
        {message.message}
      </Box>
      <Typography variant="caption" sx={{ opacity: 0.5, alignSelf: sentByUser ? 'flex-end' : 'flex-start', my:2.4}}>
        {formattedTime}
      </Typography>
    </Box>
  );
}
