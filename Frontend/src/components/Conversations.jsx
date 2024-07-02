import React, { useEffect, useState } from 'react';
import Conversation from './Conversation';
import { Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

export default function Conversations() {

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

  return (
    <>
      <Toaster/>
      <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
          />
        ))}
      </Box>
    </>
  );
}
