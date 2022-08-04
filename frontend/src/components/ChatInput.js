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
    return <div className="container row-span-1 grid place-items-center grid-cols-[20] bg-slate-700 py-0 px-8">
        <div className="col-span-8 flex items-center text-white gap-4">
            <div>

            </div>
        </div>
        <form onSubmit={sendMsg} className="col-span-12 w-full border rounded-[2rem] flex items-center gap-8 bg-gray-200">
            <input type="text" placeholder="type your message here" value={msg} onChange={(e) => setMsg(e.target.value)}
                className="w-[90%] h-[60%] bg-transparent text-gray-800 border-none pl-4 text-[1.2rem] selection:bg-red-500 focus:outline-none"/>
            <button type="submit" className="py-[0.3rem] px-8 rounded-[2rem] flex justify-center items-center bg-purple-700 text-slate-200 border-none">
                SEND
            </button>
        </form>
    </div>
}

export default ChatInput;