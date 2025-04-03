import React, { useEffect, useState } from 'react';
import s from './SwitchTheme.module.scss';


import { FaRegMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

function SwitchTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button className={s.SwitchThemeButton} onClick={toggleTheme}>
      {theme === 'light' ? <FaRegMoon /> : <IoSunnySharp />}
    </button>
  );
}

export default SwitchTheme;
