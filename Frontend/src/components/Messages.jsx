import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { Box } from '@mui/material';
import useConversation from '../zustand/useConversation';
import toast, { Toaster } from 'react-hot-toast';
import useSocket from '../hooks/useSocket';


export default function Messages() {

  const { messages, setMessages, selectedConversation } = useConversation();
  useSocket();
  const messagesContainerRef=useRef(null);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await fetch(`/api/message/get/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
        setTimeout(() => {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }, 0);

			} catch (error) {
				toast.error(error.message);
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
      <Box sx={{ px: 4, flex: 1, overflow: 'auto' }}
      ref={messagesContainerRef}
      >
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </Box>
    </>
  );
}
