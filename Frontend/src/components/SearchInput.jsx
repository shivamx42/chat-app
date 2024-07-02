import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../zustand/useConversation';
import toast,{ Toaster } from 'react-hot-toast';

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

  const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
				setConversations(data);
        
        
			} catch (error) {
				toast.error(resData.message);
			} 
		};

		getConversations();
	}, []);
  

  const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
		if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
		}
    
		const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
  };

  return (
    <>
      <Toaster/>
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
              onChange={(e)=>setSearch(e.target.value)}
          />
          <IconButton type="submit" color="primary" sx={{ backgroundColor: 'skyblue' }}>
              <IoSearchSharp className='w-6 h-6' />
          </IconButton>
          </Box>
      </ThemeProvider>
    </>
  );
}