import React, { useEffect } from 'react';
import Message from './Message';
import { Box } from '@mui/material';
import useConversation from '../zustand/useConversation';
import toast, { Toaster } from 'react-hot-toast';


export default function Messages() {

  const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await fetch(`/api/message/get/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
      }
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id]);

  return (
    <>
      <Toaster/>
      <Box sx={{ px: 4, flex: 1, overflow: 'auto' }}>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </Box>
    </>
  );
}
