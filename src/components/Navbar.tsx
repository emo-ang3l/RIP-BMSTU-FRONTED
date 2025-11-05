// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="navbar-camo">
      <div className="navbar-inner-camo">
        {/* ЛОГОТИП СЛЕВА */}
        <NavLink to="/home" className="logo-camo">
          Утеплители
        </NavLink>

        {/* ВКЛАДКИ ПО ЦЕНТРУ */}
        <nav className="nav-tabs-camo">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-tab-item ${isActive ? 'active' : ''}`
            }
          >
            
            Домой
          </NavLink>
          <NavLink
            to="/insulators"
            className={({ isActive }) =>
              `nav-tab-item ${isActive ? 'active' : ''}`
            }
          >
            Услуги
          </NavLink>
        </nav>

        {/* ПУСТОЙ БЛОК СПРАВА — ДЛЯ БАЛАНСА */}
        <div className="navbar-spacer" />
      </div>
    </header>
  );
};