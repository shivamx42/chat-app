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

export default function SearchInput({setIsChatOpen}) {

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
    if (!search){
      toast.error("Type atleast one character!");
      return;
    }
    
		const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
      setIsChatOpen(true);
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
              label="Search Users..."
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
          <div>
              <IoSearchSharp className='w-5 h-5 text-blue-800 hover:cursor-pointer mt-3' onClick={handleSubmit} />
          </div>
          
          </Box>
      </ThemeProvider>
    </>
  );
}