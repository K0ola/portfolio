import React from 'react';
import s from './Main.module.scss';
import '../../utils/styles/root.scss';
import Nav from '../../components/Layout/Nav/Nav';
// import SwitchTheme from '../../components/Layout/header/SwitchTheme/SwitchTheme';
import Rs from '../../components/Layout/Rs/Rs';

import Header from '../../components/Layout/header/Header/Header';

import Home from '../../sections/Home/Home';
import About from '../../sections/About/About';
import Skills from '../../sections/Skills/Skills';
import Projects from '../../sections/Projects/Projects';
import Avis from '../../sections/Avis/Avis';
import Contact from '../../sections/Contact/Contact';

function Main() {
  return (
    <div>
      <Nav />
      <Header />
      <Rs />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Avis />
      <Contact />
    </div>
  );
}

export default Main;