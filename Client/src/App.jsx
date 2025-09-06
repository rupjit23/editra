import React from "react";
import Register from "./assets/Components/Pages/Register";
import Login from "./assets/Components/Pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MotionWrapper from "./assets/Components/Animation/MotionWrapper";  
import RoomJoin from "./assets/Components/Pages/RoomJoin";
import Editor from "./assets/Components/Pages/Editor";
import RoomCreate from "./assets/Components/Pages/RoomCreate";
import Dashboard from "./assets/Components/Pages/Dashboard";
import Homepage from "./assets/Components/Pages/Homepage"
import Joinroom from "./assets/Components/HomePageComponents/Joinroom";
import ForgetPassword from "./assets/Components/Pages/ForgetPassword";
import Authotp from "./assets/Components/Pages/AuthOtp";

import Contact from "./assets/Components/Pages/Contact";
import About from "./assets/Components/Pages/About";
import Privacy from "./assets/Components/Pages/Privacy";
import Docs from "./assets/Components/Pages/Docs";
import NotFound from "./assets/Components/Pages/NotFound";





const router = createBrowserRouter([
  {
    path: "/",
    element: (
    
        <Homepage></Homepage>
      
    ),
  },
  {
    path: "/login",
    element: (
     
        <Login />
      
    ),
  },
  {
    path:"/forget-password",
    element:(
      <ForgetPassword></ForgetPassword>
    )
  }
  ,
  {
    path: "/sign-up",
    element: (
     
       <Register></Register>
      
    ),
  }
  ,
   {
    path: "/room/create",
    element: (
     <RoomCreate></RoomCreate>
    ),
  },
   {
    path: "/room/join",
    element: (
     <RoomJoin></RoomJoin>
    ),
  },
    {
     path: "/editor/:roomId",
     element: (
     <Editor></Editor>
     ),
   },
  ,
   {
    path: "/dashboard",
    element: (
   <Dashboard></Dashboard>
    ),
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
 {
  path:"/verify-otp",
  element:<Authotp></Authotp>
 }
 ,{
  path:"/contact",
  element:<Contact></Contact>
 }
  ,{
  path:"/about",
  element:<About></About>
 } ,{
  path:"/privacy",
  element:<Privacy></Privacy>
 },{
  path:"/docs",
  element:<Docs></Docs>
 }
]);

function App() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
