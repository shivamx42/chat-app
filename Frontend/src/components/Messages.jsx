import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { Box, Typography } from '@mui/material';
import useConversation from '../zustand/useConversation';
import toast, { Toaster } from 'react-hot-toast';
import useSocket from '../hooks/useSocket';
import { useAuthContext } from '../context/AuthContext';
import {HourglassLoader, LoaderForChats} from '../components/Loaders/ChatLoader';


export default function Messages() {

  const { messages, setMessages, selectedConversation } = useConversation();
  useSocket();
  const messagesContainerRef=useRef(null);
  const {setAuthUser}=useAuthContext();
  const[loading,setLoading]=useState(false);

	useEffect(() => {
		const getMessages = async () => {
      setLoading(true);
			try {
				const res = await fetch(`/api/message/get/${selectedConversation._id}`);
        if(res.status!=200){
          setAuthUser(null);
          return;
        }
        setLoading(false);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
        setTimeout(() => {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }, 0);

			} catch (error) {
				toast.error(error.message);
      }finally{
        setLoading(false);
      }
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id]);

  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <Toaster/>
      {
        loading?<LoaderForChats/>:(<Box sx={{ px: 4, flex: 1, overflow: 'auto' }}
        ref={messagesContainerRef}
        >
          {messages.length === 0 ? (
            <Typography variant="body1" textAlign="center" color="textPrimary">
              Start a conversation!
            <HourglassLoader/>
            </Typography>
          ) : (
            messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))
          )}
        </Box>)
      }
      
    </>
  );
}
