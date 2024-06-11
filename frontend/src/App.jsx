import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Profile from './Pages/Profile/Profile'
import SignUp from './Pages/Auth/Signup'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={Auth} />
    <Route path='/home' element={Home} />
    <Route path='/profile' element={Profile} />
    <Route path='/signup' element={SignUp} />
    </Routes>
    </BrowserRouter>
  )
}

export default App