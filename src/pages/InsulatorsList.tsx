// src/pages/InsulatorsList.tsx
import { useState, useEffect } from 'react';
import { InsulatorCard } from '../components/InsulatorCard';
import { fetchInsulators } from '../api/api';
import { Insulator } from '../types';
import { BootstrapBreadcrumbs } from '../components/Breadcrumbs';

export const InsulatorsList = () => {
  const [insulators, setInsulators] = useState<Insulator[]>([]);
  const [searchInput, setSearchInput] = useState(''); // то, что в поле
  const [searchQuery, setSearchQuery] = useState('');     // то, по чему ищем
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (searchQuery === '' && searchInput === '') {
        // Загружаем все, если ничего не ищем
        setLoading(true);
        try {
          const data = await fetchInsulators('');
          setInsulators(data);
        } catch {
          setInsulators([]);
        }
        setLoading(false);
        return;
      }

      if (searchQuery === '') return;

      setLoading(true);
      try {
        const data = await fetchInsulators(searchQuery);
        setInsulators(data);
      } catch {
        setInsulators([]);
      }
      setLoading(false);
    };
    load();
  }, [searchQuery]); // Только по изменению query

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim()); // Запускаем поиск
  };

  const handleClear = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  return (
    <>
      <div className="container-camo" style={{ padding: '20px 0' }}>
        <BootstrapBreadcrumbs />
      </div>

      <div style={{ padding: '20px', minHeight: '599px' }}>
        {/* === ПОИСК + КОРЗИНА === */}
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
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 40px 12px 16px',
                fontSize: '16px',
                border: '1px solid #fff',
                borderRadius: '20px',
                outline: 'none',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#f06149')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            {/* Кнопка поиска */}
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                top: '45%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            {/* Кнопка очистки */}
            {searchInput && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#999',
                }}
              >
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => alert('Корзина пуста')}
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
            }}
          >
            <img src='/basket.png' alt="Корзина" style={{ width: '37px', height: '37px' }} />
          </button>
        </form>

        {/* === РЕЗУЛЬТАТЫ === */}
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