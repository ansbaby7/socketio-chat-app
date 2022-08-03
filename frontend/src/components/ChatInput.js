import {useState} from "react"

const ChatInput = ({handleMessageSend}) => {
    const [msg, setMsg] = useState("")
    const sendMsg = (event) => {
        event.preventDefault()
        if(sendMsg.length>0){
            handleMessageSend(msg);
            setMsg("");
        }
    }
    return <div className="container grid items-center grid-cols-20 bg-slate-700 px-0 py-2">
        <div className="col-span-1 flex items-center text-white gap-4">
            <div>

            </div>
        </div>
        <form onSubmit={sendMsg} className="col-span-19 w-full border rounded-[2rem] bg-gray-200">
            <input type="text" placeholder="type your message here" value={msg} onChange={(e) => setMsg(e.target.value)}
                className="w-[90%] height-[60%] bg-transparent text-white border-none pl-4 text-[1.2rem] selection:bg-red-500 focus:outline-none"/>
            <button type="submit" className="py-[0.3rem] px-8 rounded-[2rem]flex justify-center items-center bg-slate-700 border-none">
                SEND
            </button>
        </form>
    </div>
}

export default ChatInput;