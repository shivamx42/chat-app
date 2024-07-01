import React from 'react';
import Message from './Message';
import { Box } from '@mui/material';

export default function Messages() {
  const messages = [
    { message: 'Hello!' },
    { message: 'How are you?'},
  ];

  return (
    <Box sx={{ px: 4, flex: 1, overflow: 'auto' }}>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </Box>
  );
}
