import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav/nav.js';

import HomePage from '../pages/HomePage/HomePage.js';
import AboutPage from '../pages/AboutPage/AboutPage.js';
import ContactPage from '../pages/ContactPage/ContactPage.js';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage.js';
import SkillsPage from '../pages/SkillsPage/SkillsPage.js';
import HobbiesPage from '../pages/HobbiesPage/HobbiesPage.js';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/hobbies" element={<HobbiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;