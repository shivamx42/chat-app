import React from 'react';
import Conversations from './Conversations';
import SearchInput from './SearchInput';
import { Box, Divider, Button } from '@mui/material';
import { FiLogOut } from 'react-icons/fi';


export default function Sidebar() {
  return (
    <Box sx={{ borderRight: 1, borderColor: 'divider', p: 4, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <SearchInput />
      <Divider sx={{ my: 3 }} />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Conversations />
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FiLogOut />}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
}
