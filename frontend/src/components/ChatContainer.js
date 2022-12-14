import { useEffect, useRef, useState } from "react";
import { addMessageRoute, allMessagesRoute } from "../utils/apiRoutes";
import axios from "axios";
import ChatInput from "./ChatInput";

const ChatContainer = ({ currentUser, currentChat, socket }) => {
  const scrollRef = useRef();

  const [messages, setMessages] = useState([]);

  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      const response = await axios.post(allMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    if (currentChat) {
      loadMessages();
    }
  }, [currentChat]);

  const handleMessageSend = async (msg) => {
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      msg,
    });

    await axios.post(addMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setReceivedMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    receivedMessage && setMessages((prev) => [...prev, receivedMessage]);
  }, [receivedMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-3">
      {currentChat && (
        <div className="h-screen container grid grid-rows-6 gap-[0.1rem] overflow-hidden ">
          <div className="row-span-1 flex justify-between items-center py-0 px-8">
            <div className="flex items-center gap-4">
              <div></div>
              <div className="bg-gray-500 px-8 py-6">
                <h3 className="text-white">{currentChat.username}</h3>
              </div>
            </div>

            {/* logout */}
          </div>

          <div className="row-span-4 py-4 px-8 flex flex-col gap-4 overflow-auto">
            {messages.map((message, index) => {
              return (
                <div ref={scrollRef} key={index}>
                  {/* return <div key={index}>    */}

                  <div
                    className={`message flex items-center ${
                      message.fromSelf ? "justify-end" : "justify-start"
                    } `}
                  >
                    <div
                      className={`max-w-[40%] break-words p-4 text-[1.1rem] rounded-[1rem] text-gray-200 ${
                        message.fromSelf ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <ChatInput handleMessageSend={handleMessageSend} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
