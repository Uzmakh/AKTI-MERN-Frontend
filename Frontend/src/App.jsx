import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Home from './pages/Home'
import AllNotes from './pages/AllNotes'
import AddNote from './pages/AddNote'
import About from './pages/About'
import Contact from './pages/Contact'
import UpdateNote from './pages/UpdateNote'



const App = () => {
  return (
    <>
      <Navbar title="Mern Course" />
      {/* define routes */}
      <Routes>
        {/* home route */}
        <Route path='/' element={<Home/>}/>
        {/* notes */}
        <Route path='/notes' element={<AllNotes />} />
        {/* add note */}
        <Route path='/addnote' element={<AddNote />} />
        {/* about */}
        <Route path='/about' element={<About />} />
        {/* contact */}
        <Route path='/contact' element={<Contact />} />
      </Routes>
      {/* footer */}
      <Footer/>
    </>
  )
}

export default App
