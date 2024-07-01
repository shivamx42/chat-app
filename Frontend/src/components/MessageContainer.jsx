import React from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { Box, Typography } from '@mui/material';

export default function MessageContainer() {
  return (
    <Box sx={{ minWidth: '450px', display: 'flex', flexDirection: 'column', my:5,mx:2 }}>
      <Box sx={{ bgcolor: 'grey.500', px: 4, py: 2, mb: 2 }}>
        <Typography variant="body1">
          <span className="label-text">To:</span> <span className="text-gray-900 font-bold">John Doe</span>
        </Typography>
      </Box>
      <Messages />
      <MessageInput />
    </Box>
  );
}
