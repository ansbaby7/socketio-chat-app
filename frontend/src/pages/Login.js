import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/apiRoutes";


const Login = () => {

  const navigate = useNavigate()

  const [values,setValues] = useState({
    username:"",
    password:""
  })

  useEffect(()=>{
    if(localStorage.getItem("chat-user")){
      navigate("/")
    }
  },[])

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // do validation

    const { username, password } = values;
    const {data} = await axios.post(loginRoute,{
      username, password
    })

    if(!data.status){
      alert(data.msg)
    }

    if(data.status){
      localStorage.setItem("chat-user",JSON.stringify(data.user))
      navigate("/")
      // const user = await JSON.parse(localStorage.getItem("chat-user"))
      // if(user) {
      //   navigate("/")
      // }
    }

  }

  const handleChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value})
  }


    return (
      <div className="bg-gray-700 h-screen flex flex-col justify-center items-center">
        {/* <h2 className="text-center text-gray-100 text-2xl">Login</h2> */}
        <div className="flex justify-center  mt-8 bg-blue-600">
          <form className="login-form text-gray-200 " onSubmit={handleFormSubmit}>
            <div className="flex flex-col text-xl">
              <div className="flex my-2 ml-2 justify-between">
                <label className="mr-12">Username </label>
                <input
                  name="username"
                  type="text"
                  className="rounded-md px-1 mr-2 text-md text-gray-800"
                  placeholder="Enter your username"
                  value = {values.username}
                  onChange={handleChange}
                />
              </div>
  
              <div className="flex my-2 ml-2 justify-between">
                <label className="mr-12">Password </label>
                <input
                  name="password"
                  type="password"
                  className="rounded-md px-1 mr-2 text-md text-gray-800"
                  placeholder="Password"
                  value = {values.password}
                  onChange = {handleChange}
                />
              </div>

              <div className="flex justify-center my-2">
                <button
                  type="submit"
                  className="w-32 text-2xl bg-purple-700 text-stone-200 "
                >
                  LOGIN
                </button>
              </div>
              
            </div>
            <div className="text-center text-gray-200 text-lg">
              <p>New to Chatty ? Register <Link to="/register" className="text-yellow-300">here</Link></p>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  