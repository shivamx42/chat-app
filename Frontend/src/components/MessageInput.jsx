import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { IoMdSend } from "react-icons/io";
import useConversation from "../zustand/useConversation";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import SendMessageLoader from './Loaders/SendMessageLoader';

export default function MessageInput() {

  const { messages, setMessages, selectedConversation } = useConversation();
  const [message,setMessage]=useState("");
  const {setAuthUser}=useAuthContext();
  const[loading,setLoading]=useState(false);
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(message.length===0) return;
    setLoading(true); 
		try {
			const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
      if(res.status===200){
        setMessages([...messages,data]);
        setMessage("");
      }

      else{
        setAuthUser(null);
        return;
      }
		} catch (error) {
			toast.error(error.message);
		}finally{
      setLoading(false);
    }
	
  }

  const handleKeyPress=(e)=>{
    if(e.key==='Enter'){
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <>
      <Toaster/>
      <Box component="form" sx={{ px: 4, my: 3, position: 'relative' }} onSubmit={handleSubmit}>
        <TextField
          placeholder="Send message"
          variant="outlined"
          fullWidth
          sx={{  borderColor: 'grey.600', color: 'white' }}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading?<SendMessageLoader/>:<IoMdSend />}  
              </IconButton>
            ),
          }}
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          autoComplete='off'
          multiline
          minRows={1}
          maxRows={3}
          className='scrollbar'
          onKeyDown={handleKeyPress}
        />
      </Box>
    </>
  );
}