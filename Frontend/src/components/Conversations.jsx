import React, { useEffect, useState } from 'react';
import Conversation from './Conversation';
import { Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import UsersLoader from './Loaders/UsersLoader';

export default function Conversations() {

  const [conversations, setConversations] = useState([]);
  const {setAuthUser}=useAuthContext();
  const [loading,setLoading]=useState(false);

	useEffect(() => {
		const getConversations = async () => {
      setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
        if(res.status!=200){
          setAuthUser(null);
          return;
        }
				setConversations(data);
        
        
			} catch (error) {
				toast.error(resData.message);
			}finally{
        setLoading(false);
      } 
		};

		getConversations();
	}, []);

  return (
    <>
      <Toaster/>
      {
        loading?<UsersLoader/>:(<Box sx={{ py: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
              />
            ))}
          </Box>)
      }
      
    </>
  );
}
