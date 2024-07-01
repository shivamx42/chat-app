import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { BsSend } from 'react-icons/bs';

export default function MessageInput() {
  return (
    <Box component="form" sx={{ px: 4, my: 3, position: 'relative' }}>
      <TextField
        placeholder="Send a message"
        variant="outlined"
        fullWidth
        sx={{ bgcolor: 'grey.700', borderColor: 'grey.600', color: 'white' }}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" color="primary">
              <BsSend />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
