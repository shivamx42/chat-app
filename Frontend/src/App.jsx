import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Background from "./components/Background"

export default function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
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
