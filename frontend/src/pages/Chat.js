import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute, host } from "../utils/apiRoutes";
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate()

  const socket = useRef()

  useEffect(()=>{
    if(!localStorage.getItem("chat-user")){
      navigate("/login")
    }
  },[])


  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const setCurrent = async () => {
      const user = await JSON.parse(localStorage.getItem("chat-user"));
      setCurrentUser(user);
    //   setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")));
      console.log(currentUser);
    };

    setCurrent();
  }, []);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id)
    }
  },[currentUser])

  useEffect(() => {
    const setContactsFunction = async () => {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        console.log(contacts);
      }
    };
    setContactsFunction();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    // <div className="flex h-screen w-screen justify-center items-center py-10 bg-cyan-900">
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 bg-cyan-900 ">
      <div className=" w-[85vw]  bg-red-800 grid grid-cols-4">

        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />

        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
        )}

      </div>
    </div>
    // </div>
  );
};

export default Chat;
