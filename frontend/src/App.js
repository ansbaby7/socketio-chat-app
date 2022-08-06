import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

const App = () => {

  // const [user,setUser] = useState(null)

  // useEffect(() => {
  //   const setUserFunction = async () => {
  //     const user = await JSON.parse(localStorage.getItem("chat-user"))
  //     //setUser(await JSON.parse(localStorage.getItem("chat-user")))
  //     setUser(user)
  //     console.log(user)
  //   }

  //   setUserFunction();
    
  // },[]);


  return ( <Router>
      <Routes>
        {/* <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        /> */}
        <Route path="/register" element={<Register/>} />
        {/* <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        /> */}
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/" element={user ? <Chat currentUser={user} /> : <Navigate to="/login" />} /> */}
        <Route path="/" element={<Chat/>} />

      </Routes>
    </Router>
  
  );
};

export default App;
