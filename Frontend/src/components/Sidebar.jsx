import React from 'react';
import Conversations from './Conversations';
import SearchInput from './SearchInput';
import { Box, Divider, Button } from '@mui/material';
import { FiLogOut } from 'react-icons/fi';
import { useAuthContext } from '../context/AuthContext';


export default function Sidebar() {

  const {setAuthUser}=useAuthContext();

  const handleLogout=async (e)=>{
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/logout');
      const data = await res.json();

      if(res.status===200){
        localStorage.removeItem("user");
        setAuthUser(null);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box sx={{ borderRight: 1, borderColor: 'divider', p: 4, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <SearchInput />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Conversations />
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FiLogOut />}
        sx={{ mt: 3 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}
