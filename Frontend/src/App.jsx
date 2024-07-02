import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import {createBrowserRouter,Navigate,RouterProvider} from "react-router-dom"
import Background from "./components/Background"
import { useAuthContext } from "./context/AuthContext"

export default function App() {

  const {authUser}=useAuthContext();

  const router=createBrowserRouter([
    {
      path:"/",
      element:authUser?<Home/> : <Navigate to="/login"/>
    },
    {
      path:"/login",
      element:authUser?<Navigate to="/"/> : <Login/>
    },
    {
      path:"/register",
      element:authUser?<Navigate to="/"/> : <Register/>
    }
  ])

  return (
    <>
  
      
       <Background>
        
          <RouterProvider router={router}/>
      </Background>
        
    </>
  )
}
