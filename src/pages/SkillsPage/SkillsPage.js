import React from 'react';
import './SkillsPage.css';


function SkillsPage() {
  return (
    <section id='skills'>
      <header>
        <h1>My Skills</h1>
      </header>
      <div className='skills_section' id='dev'>
        <h2>Développement</h2>
      </div>
      <div className='skills_section' id='crea'>
        <h2>Creation numérique</h2>
      </div>
      <div className='skills_section' id='soft'>
        <h2>Softs skills</h2>
      </div>
    </section>
  );
}

export default SkillsPage;
