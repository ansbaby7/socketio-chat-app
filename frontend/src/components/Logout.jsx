import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("chat-user");
        navigate("/login")
    }

    return <div><button className="bg-red-600 text-gray-100 px-4 py-1" onClick={handleClick}>LOGOUT</button></div>
}

export default Logout;