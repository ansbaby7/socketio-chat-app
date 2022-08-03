import { useEffect, useState } from "react";
import { addMessageRoute, allMessagesRoute } from "../utils/apiRoutes";
import axios from "axios"
import ChatInput from "./ChatInput";



const ChatContainer =  ({currentUser, currentChat}) => {

    const [messages, setMessages] = useState([])
    //
    const [arrivalMessage, setArrivalMessages] = useState(null)

    useEffect(()=>{
        const loadMessages = async () => {
            const response = await axios.post(allMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id
            })
            setMessages(response.data)
        }
        if(currentChat){
            loadMessages()
        }
    },[currentChat])

    const handleMessageSend = async (msg) => {
        await axios.post(addMessageRoute,{
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })

        const msgs = [...messages]
        messages.push({fromSelf:true,message:msg})
        setMessages(msgs)
    }

    useEffect(()=>{
        arrivalMessage && setMessages(prev => [...prev,arrivalMessage])
    },[arrivalMessage])


    return <div>
        {currentChat && 
        <div className="container grid grid-cols-10 gap-[0.1rem] overflow-hidden ">
            <div className="col-span-1 flex justify-center items-center py-0 px-8">
                <div className="flex items-center gap-4">
                    <div>

                    </div>
                    <div>
                        <h3 className="text-white">{currentChat.username}</h3>
                    </div>
                </div>

                {/* logout */}

            </div>

            <div className="col-span-8">
                {messages.map((message,index) => {
                    return <div key={index} className = {`py-4 px-8 flex flex-col gap-4 overflow-auto ${message.fromSelf?"justify-end":"justify-start"}`}>
                        <div>
                            <div className={`max-w-[40%] break-words p-4 text-[1.1rem] rounded-[1rem] text-green-300 ${message.fromSelf?"bg-red-400":"bg-green-400"}`}>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            <div className="col-span-1">
                <ChatInput handleMessageSend={handleMessageSend}/>
            </div>
        </div>
            }
    </div>
}

export default ChatContainer;