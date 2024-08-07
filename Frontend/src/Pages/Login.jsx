import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import AccountLoader from '../components/Loaders/AccountLoader';

const createCustomTheme = (primaryColor) =>
  createTheme({
    palette: {
      primary: {
        main: primaryColor || '#1a73e8',
      },
    },
  });

const theme = createCustomTheme('#dd223f');


export default function Login() {

  const [data,setData]=useState({});
	const {setAuthUser}=useAuthContext();
  const [loading,setLoading]=useState(false); 

  const handleChange=(e)=>{
      setData({
          ...data,
          [e.target.id]: e.target.value,
      });
  
  }
  
  const handleSubmit=async (e)=>{

    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
        const resData = await res.json();
  
        if(res.status===200){
          localStorage.setItem("user",JSON.stringify(resData.userData))
          setAuthUser(resData.userData);
        }
        
        else toast.error(resData.message);
        
      } catch (error) {
        toast.error(error.message);
      }finally{
        setLoading(false);
      }

  }


  return (
    <>
      <Toaster />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',   
          }}
        >
          <Box
            sx={{
              backgroundColor: 'transparent',
              opacity: '0.7',
              p: 4,
              borderRadius: 1,
              width: 360,
            }}
          >
            <div className="text-2xl text-center mb-2 font-pacifico font-bold">ChatterBox</div>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: ' ' },
                  required: false,
                }}
                InputProps={{
                  style: { color: ' ' },
                  sx: {
                    '& .MuiOutlinedInput-root': {
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
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: ' ' },
                  required: false,
                }}
                InputProps={{
                  style: { color: ' ' },
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: ' black',
                      },
                      '&:hover fieldset': {
                        borderColor: ' black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: ' black',
                      },
                    },
                  },
                }}
              />
              {
                loading?

                  <div><AccountLoader/></div>
                :(
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                login
              </Button>
                )
              }
            </Box>
            
            {
              !loading &&(<Typography variant="body2" textAlign="center" color="#000000">
              Don't have an account?{' '}
                  <Link component={RouterLink} to={loading?"#":"/register"} color="primary">
                  Register
                  </Link>
            </Typography>)
            }
            
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}