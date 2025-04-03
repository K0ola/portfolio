import './utils/styles/root.scss';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Layout/Nav/Nav'
import Main from './pages/Main/Main'
import './utils/styles/root.scss'
// import SwitchTheme from './components/Layout/SwitchTheme/SwitchTheme';
import Rs from './components/Layout/Rs/Rs';
// import MusicPlayer from './components/Layout/MusicPlayer/MusicPlayer';


function App() {

  return (
    <BrowserRouter>
      {/* <MusicPlayer /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
