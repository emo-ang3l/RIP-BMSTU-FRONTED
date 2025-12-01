// src/components/Navbar.tsx
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { fetchCartInfo, clearCart } from '../../store/slices/cartSlice';
import { clearFilters } from '../../store/slices/unitsSlice';
import { AppDispatch, RootState } from '../../store/store';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { count: cartCount, requestId } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartInfo());
    } else {
      dispatch(clearCart());
    }
  }, [dispatch, isAuthenticated]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearCart());
    dispatch(clearFilters());
    navigate('/RIP-BMSTU-FRONTED/login');
    closeMobileMenu();
  };

  const handleCartClick = () => {
    if (requestId) {
      navigate(`/RIP-BMSTU-FRONTED/requests/${requestId}`);
    } else {
      navigate('/RIP-BMSTU-FRONTED/insulators');
    }
    closeMobileMenu();
  };

  return (
    <header className="navbar-camo">
      <div className="navbar-inner-camo">
        {/* ЛОГОТИП СЛЕВА */}
        <NavLink to="/RIP-BMSTU-FRONTED/home" className="logo-camo" onClick={closeMobileMenu}>
          Утеплители
        </NavLink>

        {/* ВКЛАДКИ ПО ЦЕНТРУ (ТОЛЬКО НА ДЕСКТОПЕ) */}
        <nav className="nav-tabs-camo desktop-only">
          <NavLink
            to="/RIP-BMSTU-FRONTED/home"
            className={({ isActive }) =>
              `nav-tab-item ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Домой
          </NavLink>
          <NavLink
            to="/RIP-BMSTU-FRONTED/insulators"
            className={({ isActive }) =>
              `nav-tab-item ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Услуги
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/RIP-BMSTU-FRONTED/orders"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              Мои заказы
            </NavLink>
          )}
        </nav>

        {/* ПРАВАЯ ЧАСТЬ С АВТОРИЗАЦИЕЙ */}
        <div className="navbar-auth desktop-only">
          {isAuthenticated ? (
            <div className="auth-user-menu">
              {cartCount > 0 && (
                <button onClick={handleCartClick} className="cart-icon-btn" title="Корзина">
                  <img src="/RIP-BMSTU-FRONTED/basket.png" alt="Корзина" />
                  {cartCount > 0 && <span className="cart-badge-header">{cartCount}</span>}
                </button>
              )}
              <NavLink
                to="/RIP-BMSTU-FRONTED/profile"
                className="user-name-link"
                onClick={closeMobileMenu}
              >
                <span className="user-name">{user?.username || 'Пользователь'}</span>
              </NavLink>
              <button onClick={handleLogout} className="btn-logout">
                Выйти
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink
                to="/RIP-BMSTU-FRONTED/login"
                className="btn-auth btn-login"
                onClick={closeMobileMenu}
              >
                Войти
              </NavLink>
              <NavLink
                to="/RIP-BMSTU-FRONTED/register"
                className="btn-auth btn-register"
                onClick={closeMobileMenu}
              >
                Регистрация
              </NavLink>
            </div>
          )}
        </div>

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
              to="/RIP-BMSTU-FRONTED/home"
              className={`mobile-menu-item ${location.pathname.includes('/home') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Домой
            </NavLink>
            <NavLink
              to="/RIP-BMSTU-FRONTED/insulators"
              className={`mobile-menu-item ${location.pathname.includes('/insulators') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Услуги
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink
                  to="/RIP-BMSTU-FRONTED/orders"
                  className={`mobile-menu-item ${location.pathname.includes('/orders') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Мои заказы
                </NavLink>
                {cartCount > 0 && (
                  <button
                    onClick={handleCartClick}
                    className="mobile-menu-item"
                  >
                    Корзина ({cartCount})
                  </button>
                )}
                <NavLink
                  to="/RIP-BMSTU-FRONTED/profile"
                  className={`mobile-menu-item ${location.pathname.includes('/profile') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Профиль
                </NavLink>
                <div className="mobile-user-info">
                  <span>{user?.username || 'Пользователь'}</span>
                </div>
                <button onClick={handleLogout} className="mobile-menu-item btn-logout-mobile">
                  Выйти
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <NavLink
                  to="/RIP-BMSTU-FRONTED/login"
                  className={`mobile-menu-item ${location.pathname.includes('/login') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Войти
                </NavLink>
                <NavLink
                  to="/RIP-BMSTU-FRONTED/register"
                  className={`mobile-menu-item ${location.pathname.includes('/register') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Регистрация
                </NavLink>
              </>
            )}
          </nav>
        </div>
            
      </div>
    </header>
  );
};