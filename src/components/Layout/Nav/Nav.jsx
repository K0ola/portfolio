import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import s from './Nav.module.scss';
import "../../../utils/styles/variables.scss";

import { FaHome, FaUser, FaBook, FaBriefcase, FaStar, FaEnvelope } from "react-icons/fa";

function Nav() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('home'); // Nouveau état pour suivre la section active

  useEffect(() => {
    // Lire le thème au chargement (ex : depuis localStorage ou `data-theme`)
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current);

    // Ajouter un écouteur de défilement pour détecter la section visible
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'avis', 'contact'];
      const currentSection = sections.find(section => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2; // Active section if it's in the middle of the viewport
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className={s.nav}>
      <ScrollLink
        to="home"
        smooth={true}
        duration={500}
        className={`${s.link} ${activeSection === 'home' ? s.active : ''}`}
      >
        <FaHome />
      </ScrollLink>
      <ScrollLink
        to="about"
        smooth={true}
        duration={500}
        className={`${s.link} ${activeSection === 'about' ? s.active : ''}`}
      >
        <FaUser />
      </ScrollLink>
      <ScrollLink
        to="skills"
        smooth={true}
        duration={500}
        className={`${s.link} ${activeSection === 'skills' ? s.active : ''}`}
      >
        <FaBook />
      </ScrollLink>
      <ScrollLink
        to="projects"
        smooth={true}
        duration={500}
        className={`${s.link} ${activeSection === 'projects' ? s.active : ''}`}
      >
        <FaBriefcase />
      </ScrollLink>
      <ScrollLink
        to="avis"
        smooth={true}
        duration={500}
        className={`${s.link} ${activeSection === 'avis' ? s.active : ''}`}
      >
        <FaStar />
      </ScrollLink>
      <ScrollLink
        to="contact"
        smooth={true}
        duration={500}
        className={`${s.link} ${activeSection === 'contact' ? s.active : ''}`}
      >
        <FaEnvelope />
      </ScrollLink>
    </nav>
  );
}

export default Nav;
