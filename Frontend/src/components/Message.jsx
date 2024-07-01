import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

export default function Message({ message }) {
  const fromMe = true; 
  const formattedTime = "12:00 PM"; 
  const chatClassName = fromMe ? "flex-end" : "flex-start";
  const profilePic = "https://example.com/profile.jpg"; 
  const bubbleBgColor = fromMe ? 'blue' : 'grey';
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
          ml: fromMe ? 'auto' : 1,
          mr: fromMe ? 1 : 'auto',
          maxWidth: '60%',
          wordBreak: 'break-word',
          animation: shakeClass ? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both' : 'none',
        }}
      >
        {message.message}
      </Box>
      <Typography variant="caption" sx={{ opacity: 0.5, textAlign: 'right' }}>
        {formattedTime}
      </Typography>
    </Box>
  );
}
