import React from 'react';
import { Avatar, Box, Typography, Divider } from '@mui/material';

export default function Conversation() {
  return (
    <>
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
          py: 1,
          cursor: 'pointer',
        }}
      >
        <Avatar
          src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
          alt='user avatar'
          sx={{ width: 48, height: 48 }}
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <Typography variant='body1' fontWeight='bold' color='text.secondary'>
              John Doe
            </Typography>
            <Typography variant='h6'>🎃</Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 0, py: 0 }} />
    </>
  );
}
