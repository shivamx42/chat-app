import React from 'react';
import Conversations from './Conversations';
import SearchInput from './SearchInput';
import { Box, Button } from '@mui/material';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineLogout } from "react-icons/md";

import { useAuthContext } from '../context/AuthContext';


export default function Sidebar({setIsChatOpen}) {

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
    <Box sx={{ px:2 , py:5 ,display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <SearchInput />
      <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          scrollbarWidth: 'none',
        }}>
        <div onClick={() => setIsChatOpen(true)}>
          <Conversations />
        </div>
      </Box>
      <button
      onClick={handleLogout}
      className="flex items-center justify-center w-10 h-10 mx-auto bg-blue-300 text-gray-700 rounded-lg hover:bg-blue-400 focus:outline-none border border-gray-700"
    >
      <MdOutlineLogout size={20} />
    </button>
    </Box>
  );
}
