import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Home from './views/Home'
import AllNotes from './views/AllNotes'
import AddNote from './views/AddNote'
import About from './views/About'
import Contact from './views/Contact'


const App = () => {
  return (
    <>
      <Navbar />
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
