import { useEffect, useState } from "react";

const Welcome = ({currentUser}) => {
     const [username, setUserName] = useState("")
     useEffect(()=>{
        const getUserName = async () => {
            setUserName(await JSON.parse(localStorage.getItem("chat-user")).username);
        }

        getUserName();
     },[username])
    return  <div className="flex flex-col bg-gray-800 justify-center items-center">
            {/* <h1>Welcome, <span className="text-violet-600">{currentUser.username}</span></h1> */}
            <h1 className="text-gray-300">Welcome, <span className="text-violet-400">{username}</span></h1>
            <h3 className="text-gray-300">Please select a contact to start chatting</h3>
        </div>

}

export default Welcome;