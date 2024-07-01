import React from 'react';
import Conversation from './Conversation';
import { Box } from '@mui/material';

export default function Conversations() {
  return (
    <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </Box>
  );
}
