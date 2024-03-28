import React, { useState, useEffect } from 'react';
import './nav.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

function Nav() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('');
  const [menuButtonState, setMenuButtonState] = useState('before');
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (location.pathname === '/contact') {
        return;
      }

      const keyToPathMap = {
        'Home': '/', ' ': '/',
        'z': '/about', 'Z': '/about',
        'q': '/projects', 'Q': '/projects',
        's': '/skills', 'S': '/skills',
        'd': '/hobbies', 'D': '/hobbies',
        'x': '/contact', 'X': '/contact'
      };

      const path = keyToPathMap[e.key];
      if (path) {
        navigate(path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname]);

  const handleMouseEnter = (link) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink('');

  const getImageSrc = (link, isActive) => (
    isActive ? `./assets/keys/${link}_after.svg` 
    : hoveredLink === link ? `./assets/keys/${link}_hover.svg` : `./assets/keys/${link}_before.svg`
  );

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
    setMenuButtonState(isNavVisible ? 'before' : 'after');
  };

  const getMenuButtonImage = () => {
    switch (menuButtonState) {
      case 'hover':
        return './assets/keys/MENU_hover.svg';
      case 'after':
        return './assets/keys/MENU_after.svg';
      default:
        return './assets/keys/MENU_before.svg';
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsNavVisible(false);
  };

  const renderNavLink = (to, link, children) => (
    <NavLink
      to={to}
      onMouseEnter={() => handleMouseEnter(link)}
      onMouseLeave={handleMouseLeave}
      className={({ isActive }) => (isActive ? 'activeLink' : '')}
      onClick={() => isNavVisible && handleNavClick(to)}
    >
      {({ isActive }) => (
        <>
          <img src={getImageSrc(link, isActive)} alt={children} />
          {children}
        </>
      )}
    </NavLink>
  );

  return (
    <>
        <button className="nav-toggle"
              onClick={toggleNav}
              onMouseEnter={() => setMenuButtonState('hover')}
              onMouseLeave={() => setMenuButtonState(isNavVisible ? 'after' : 'before')}>
        <img src={getMenuButtonImage()} alt="Menu" />
      </button>      <div className={`mobile-nav ${isNavVisible ? 'visible' : ''}`}>
        {['/', '/about', '/projects', '/skills', '/hobbies', '/contact'].map((path, index) => 
          <NavLink key={index} to={path} onClick={() => handleNavClick(path)}>
            {path === '/' ? 'Home' : path.substring(1)}
          </NavLink>
        )}
      </div>
      <nav>
        {renderNavLink("/", "home", "")}
        <ul>
          {renderNavLink("/about", "Z", "About")}
          {renderNavLink("/projects", "Q", "Projects")}
          {renderNavLink("/skills", "S", "Skills")}
          {renderNavLink("/hobbies", "D", "Hobbies")}
          {renderNavLink("/contact", "X", "Contact")}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
