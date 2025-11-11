// src/pages/InsulatorsList.tsx
import { useState, useEffect } from 'react';
import { InsulatorCard } from '../components/InsulatorCard';
import { fetchInsulators } from '../api/api';
import { BootstrapBreadcrumbs } from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

export const InsulatorsList = () => {
  const [insulators, setInsulators] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);

  // === КОРЗИНА ===
  const [cartCount, setCartCount] = useState(0);
  const [cartRequestId, setCartRequestId] = useState<number | null>(null);
  const navigate = useNavigate();

  // === Загрузка корзины ===
  const loadCart = async () => {
    try {
      const res = await fetch('/api/insulatorrequests/cart-icon/');
      if (!res.ok) throw new Error('Cart error');
      const data = await res.json();
      setCartCount(data.count || 0);
      setCartRequestId(data.request_id || null);
    } catch (error) {
      console.warn('Корзина недоступна:', error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // === Загрузка утеплителей ===
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchInsulators(
          searchQuery,
          minPrice ? Number(minPrice) : undefined,
          maxPrice ? Number(maxPrice) : undefined
        );
        setInsulators(data);
      } catch {
        setInsulators([]);
      }
      setLoading(false);
    };
    load();
  }, [searchQuery, minPrice, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const handleClear = () => {
    setSearchInput('');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
  };

  const goToCart = () => {
    if (cartRequestId) {
      navigate(`/requests/${cartRequestId}`);
    } else {
      navigate('/requests/draft');
    }
  };

  return (
    <>
      <div className="container-camo" style={{ padding: '20px 0px' }}>
        <BootstrapBreadcrumbs />
      </div>

      <div className="insulators-page">
        {/* === ФОРМА ПОИСКА === */}
        <form onSubmit={handleSearch} className="search-form">
          {/* ПОИСК */}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="clear-btn-icon"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <button type="submit" className="search-btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* ЦЕНА ОТ */}
          <div className="input-wrapper">
            <input
              type="number"
              placeholder="Цена от"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="price-input"
            />
            {minPrice && (
              <button
                type="button"
                onClick={() => setMinPrice('')}
                className="clear-btn-icon"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* ЦЕНА ДО */}
          <div className="input-wrapper">
            <input
              type="number"
              placeholder="Цена до"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="price-input"
            />
            {maxPrice && (
              <button
                type="button"
                onClick={() => setMaxPrice('')}
                className="clear-btn-icon"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* СБРОС */}
          {(searchInput || minPrice || maxPrice) && (
            <button
              type="button"
              onClick={handleClear}
              className="reset-btn"
            >
              Сбросить
            </button>
          )}

          {/* КОРЗИНА */}
          <button
            type="button"
            onClick={goToCart}
            className="cart-btn"
            title={`Корзина: ${cartCount} товар(ов)`}
          >
            <img src="/RIP-BMSTU-FRONTED/basket.png" alt="Корзина" />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </form>

        {/* === СПИСОК КАРТОЧЕК === */}
        <div className="insulators-grid">
          {loading ? (
            <p className="status-message">Загрузка...</p>
          ) : insulators.length === 0 ? (
            <p className="status-message error">Ничего не найдено</p>
          ) : (
            insulators.map((ins) => (
              <div key={ins.id} className="insulator-card-wrapper">
                <InsulatorCard insulator={ins} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};