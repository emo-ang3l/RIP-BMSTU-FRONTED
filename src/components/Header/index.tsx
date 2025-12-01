// src/components/Navbar.tsx
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-camo">
      <div className="navbar-inner-camo">
        {/* ЛОГОТИП СЛЕВА */}
        <NavLink to="/home" className="logo-camo" onClick={closeMobileMenu}>
          Утеплители
        </NavLink>

        {/* ВКЛАДКИ ПО ЦЕНТРУ (ТОЛЬКО НА ДЕСКТОПЕ) */}
        <nav className="nav-tabs-camo desktop-only">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-tab-item ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Домой
          </NavLink>
          <NavLink
            to="/insulators"
            className={({ isActive }) =>
              `nav-tab-item ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Услуги
          </NavLink>
        </nav>

        {/* БУРГЕР-МЕНЮ (ТОЛЬКО НА МОБИЛКЕ) */}
        <div
          className={`mobile-menu-wrapper ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* МОБИЛЬНОЕ МЕНЮ */}
          <nav
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLink
              to="/home"
              className={`mobile-menu-item ${location.pathname === '/home' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Домой
            </NavLink>
            <NavLink
              to="/insulators"
              className={`mobile-menu-item ${location.pathname === '/insulators' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Услуги
            </NavLink>
          </nav>
        </div>
            
      </div>
    </header>
  );
};