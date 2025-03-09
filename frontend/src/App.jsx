
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./Pages/Home.jsx";
// // import Notfound from "./Pages/Notfound.jsx";
// import Signin from "./Pages/Signin.jsx";
// import Register from "./Pages/Register.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import io from 'socket.io-client';
// import { setSocket } from "./redux/socketSlice.jsx";
// import { setOnlineUsers } from "./redux/userSlice.jsx";







// const router = createBrowserRouter([
//   {
//     path: "/",
//     // element: <Home />
//     element: <Signin />
//   },
//   {
//     path: "/Register",
//     element: <Register />
//   },
//   {
//     path: "/home",
//     // element: <Signin />
//     element: <Home />
//   },
//   // {
//   //   path: "",
//   //   element: <Notfound/>
//   // }
// ])


// function App() {

//   const {authUser} = useSelector(store => store.user)
//   const {socket} = useSelector(store=> store.socket)
//   const dispatch = useDispatch()
//   // const [socket, setSocket]=useState(null) 
//   useEffect(() => {
//     if (authUser) {
//       const socket = io('http://localhost:8080', {
//         query: {
//           userId: authUser._id
//         }
//       });
      
//       dispatch(setSocket(socket));
//       // console.log('socket',socket);

//       socket?.on('getOnlineUser', (onlineUsers)=> {
//         dispatch(setOnlineUsers(onlineUsers))
//       })
//       return ()=> socket.close()
//     }
//     else{
//       if(socket){          //store socket if exist then close and remove prev data
//         socket.close(); 
//         dispatch(setSocket(null))
//       }
//     }
//   }, [authUser]);



//   return (
//     <div >
//       <RouterProvider router={router} />
//     </div>
//   )
// };


// export default App


import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Pages/Home.jsx";
import Signin from "./Pages/Signin.jsx";
import Register from "./Pages/Register.jsx";
import Notfound from './Pages/Notfound.jsx'
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice.jsx";
import { setOnlineUsers } from "./redux/userSlice.jsx";
import { BACKEND_URL } from "./assets/config.jsx";

function App() {
  
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${BACKEND_URL}`, {
        auth: { userId: authUser._id },
        // query: { userId: authUser._id },
      });
      

      dispatch(setSocket(socket));

      socket?.on("getOnlineUser", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Agar user authenticated hai to Home par redirect karein, warna Signin */}
        <Route path="/" element={authUser ? <Navigate to="/home" /> : <Signin />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/register" element={<Register />} />
        {/* Agar direct home access ho aur user authenticated na ho, to Signin par redirect karein */}
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
