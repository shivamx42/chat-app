import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IoSearchSharp } from 'react-icons/io5';

const createCustomTheme = (primaryColor) =>
    createTheme({
      palette: {
        primary: {
          main: primaryColor || '#1a73e8',
        },
      },
    });
  
const theme = createCustomTheme('#dd223f');

export default function SearchInput() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
            id="search"
            label="Search"
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
            required: false,
            }}
            InputProps={{
            sx: {
                '& .MuiOutlinedInput-root': {
                borderRadius: '50%',
                '& fieldset': {
                    borderColor: 'black',
                },
                '&:hover fieldset': {
                    borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'black',
                },
                },
            },
            }}
        />
        <IconButton type="submit" color="primary" sx={{ backgroundColor: 'skyblue' }}>
            <IoSearchSharp className='w-6 h-6' />
        </IconButton>
        </Box>
    </ThemeProvider>
  );
}