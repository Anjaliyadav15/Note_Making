import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import { ViewPaste } from './components/ViewPaste'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home'
import Paste from './components/Paste'

// The following is how you create route
const router = createBrowserRouter (
  [
    {
      path : "/" ,
      element :
      <div>
       <Navbar/>
       <Home/>
      </div>

    },
    {
      path : "/pastes" ,
      element : 
      <div>
       <Navbar/>
     <Paste/>

      </div>
    },
    {
      path : "/pastes/:id" ,
      element : 
      <div>
       <Navbar/>
       <ViewPaste/>
      </div>
    },
  ]
)

function App() {
 

  return (
    <>
     
       <RouterProvider router={router} />
    </>
  )
}

export default App
