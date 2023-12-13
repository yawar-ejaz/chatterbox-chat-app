import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chats = () => {
    const [chats, setChats] = useState([]);
    async function getChats() {
        const { data } = await axios.get("/api/chats");
        setChats(data);
    }
    useEffect(() => {
        getChats();
    }, []);
  return (
      <>
          {chats.map((chat) => (
              <div key={chat._id}>{chat.chatName}</div>
          ))}
      </>
  )
}

export default Chats
