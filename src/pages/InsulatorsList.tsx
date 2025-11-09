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

  // === Стиль для всех полей ===
  const inputStyle = {
    width: '100%',
    padding: '12px 40px 12px 16px',
    fontSize: '16px',
    border: '1px solid #fff',
    borderRadius: '20px',
    outline: 'none',
    transition: 'all 0.3s',
  };

  const iconButtonStyle = {
    position: 'absolute' as const,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  };

  return (
    <>
      <div className="container-camo" style={{ padding: '20px 0' }}>
        <BootstrapBreadcrumbs />
      </div>

      <div style={{ padding: '20px', minHeight: '599px' }}>
        {/* === ФОРМА: ПОИСК + MIN + MAX + КОРЗИНА === */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* ПОИСК */}
          <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#f06149')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            <button
              type="submit"
              style={{ ...iconButtonStyle, right: '8px', top: '45%', transform: 'translateY(-50%)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                style={{ ...iconButtonStyle, left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* ЦЕНА ОТ */}
          <div style={{ position: 'relative', maxWidth: '130px', width: '100%' }}>
            <input
              type="number"
              placeholder="Цена от"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#f06149')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            {minPrice && (
              <button
                type="button"
                onClick={() => setMinPrice('')}
                style={{ ...iconButtonStyle, right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* ЦЕНА ДО */}
          <div style={{ position: 'relative', maxWidth: '130px', width: '100%' }}>
            <input
              type="number"
              placeholder="Цена до"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#f06149')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            {maxPrice && (
              <button
                type="button"
                onClick={() => setMaxPrice('')}
                style={{ ...iconButtonStyle, right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}
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
              style={{
                background: '#f06149',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Сбросить
            </button>
          )}

          {/* КОРЗИНА */}
          <button
            type="button"
            onClick={goToCart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '16px',
              color: '#333',
              position: 'relative',
            }}
            title={`Корзина: ${cartCount} товар(ов)`}
          >
            <img src="/basket.png" alt="Корзина" style={{ width: '37px', height: '37px' }} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: '#f06149',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </form>

        {/* === РЕЗУЛЬТАТЫ — ОСТАВЛЕНО КАК БЫЛО === */}
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '18px' }}>Загрузка...</p>
        ) : insulators.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#d00' }}>
            Ничего не найдено
          </p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              padding: '10px',
              justifyContent: 'flex-start',
              maxWidth: '1080px',
              margin: '0 auto',
            }}
          >
            {insulators.map((ins) => (
              <InsulatorCard key={ins.id} insulator={ins} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};