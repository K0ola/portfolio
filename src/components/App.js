import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav/nav.js';
import HomePage from '../pages/HomePage/HomePage.js';
import AboutPage from '../pages/AboutPage/AboutPage.js';
import ContactPage from '../pages/ContactPage/ContactPage.js';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage.js';
import SkillsPage from '../pages/SkillsPage/SkillsPage.js';
import HobbiesPage from '../pages/HobbiesPage/HobbiesPage.js';

const LoadingScreen = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <p style={{ color: '#fff' }}>Chargement...</p>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(false);  

  return (
      <BrowserRouter>
        {isLoading && <LoadingScreen />}
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage setIsLoading={setIsLoading} />} />
          <Route path="/about" element={<AboutPage setIsLoading={setIsLoading} />} />
          <Route path="/contact" element={<ContactPage setIsLoading={setIsLoading} />} />
          <Route path="/projects" element={<ProjectsPage setIsLoading={setIsLoading} />} />
          <Route path="/skills" element={<SkillsPage setIsLoading={setIsLoading} />} />
          <Route path="/hobbies" element={<HobbiesPage setIsLoading={setIsLoading} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
