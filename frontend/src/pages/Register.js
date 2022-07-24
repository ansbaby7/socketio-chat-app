import { useState } from "react";
import axios from "axios"
import { registerRoute } from "../utils/apiRoutes";
import {useNavigate} from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const [values,setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // do validation

    const {username,email,password} = values

    const {data} = await axios.post(registerRoute, {
      username, email, password
    })

    if(!data.status){
      alert(data.msg)
    }

    if(data.status){
      localStorage.setItem("chat-user",JSON.stringify(data.user))
      navigate("/")
    }

  }

  const handleChange = (event) => {
    setValues({...values,[event.target.name]:event.target.value})
  }


  return (
    <div className="bg-gray-700 h-screen flex flex-col justify-center items-center">
      {/* <h2 className="text-center text-gray-100 text-2xl">Register</h2> */}
      <div className="flex justify-center  mt-8 bg-blue-600 rounded-md">
        <form className="register-form text-gray-200" onSubmit={handleFormSubmit}>
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
              <label className="mr-12">Email </label>
              <input
                name="email"
                type="email"
                className="rounded-md px-1 mr-2 text-md text-gray-800"
                placeholder="Enter your email"
                value={values.email}
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
                value={values.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex my-2 ml-2 justify-between">
              <label className="mr-12">Confirm Password </label>
              <input
                name="confirmPassword"
                type="password"
                className="rounded-md px-1 mr-2 text-md text-gray-800"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center my-2">
                <button
                  type="submit"
                  className="w-32 text-2xl bg-purple-700 text-stone-200 "
                >
                  REGISTER
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
