import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { IoMdSend } from "react-icons/io";
import useConversation from "../zustand/useConversation";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function MessageInput() {

  const { messages, setMessages, selectedConversation } = useConversation();
  const [message,setMessage]=useState("");
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(message.length===0) return;
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

      else throw new Error(data.error);
		} catch (error) {
			toast.error(error.message);
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
              <IconButton type="submit" color="primary">
                <IoMdSend />
              </IconButton>
            ),
          }}
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
      </Box>
    </>
  );
}
