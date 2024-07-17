import {
    createBrowserRouter,
  } from "react-router-dom";
import Register from "../Register/Register";
import Main from "../Layout/Main/Main";
import Home from "../page/Home/Home";
import DeshBoardLayout from "../Layout/DeshBoardLayout/DeshBoardLayout";
import Login from "../Login/Login";

  export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
           {
              path: "/",
              element: <Home></Home>
           },
           {
            path: '/login',
            element: <Login></Login>
           },
           {
            path: '/register',
            element:<Register></Register>
           }
          ]
        },
        {
          path: '/dashboard',
          element: <DeshBoardLayout></DeshBoardLayout>,
          children: [
            //  {
            //     index: true,
            //     element: <Profile></Profile>
            //  },
          
    
    
    
          ]
       }
  ])