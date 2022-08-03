import axios from "axios";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUsersRoute } from "../utils/apiRoutes";

const Chat = () => {
    const [contacts,setContacts] = useState([])
    const [currentChat,setCurrentChat] = useState(undefined)
    const [currentUser,setCurrentUser]  = useState(undefined)

    useEffect(()=>{
        const setCurrent = async () => {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")))
        }

        setCurrent();
    },[])

    useEffect(()=>{
        const setContactsFunction = async () => {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
            setContacts(data.data)
        }
        setContactsFunction();
    },[currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 bg-cyan-900">
        <div className="h-[85vh] w-[85vw] bg-slate-400 grid grid-cols-2">
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
            {currentChat === undefined? 
                <Welcome currentUser={currentUser}/> : <ChatContainer currentUser={currentUser} currentChat={currentChat} />
            }
        </div>
    </div>
}

export default Chat;