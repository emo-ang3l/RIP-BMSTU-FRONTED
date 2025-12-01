// src/pages/InsulatorDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchInsulatorById } from '../../modules/mocks';
import { Insulator } from '../../modules/types';
import { BootstrapBreadcrumbs } from '../../components/Breadcrumbs';

export const InsulatorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [insulator, setInsulator] = useState<Insulator | null>(null);

  useEffect(() => {
    fetchInsulatorById(Number(id)).then(setInsulator);
  }, [id]);

  if (!insulator) {
    return (
      <div className="loading-wrapper">
        <img src="/77310a9e5492a5e62c5b3ecee4a5ebd0.gif" alt="Загрузка..." className="loading-spinner" />
        <p className="empty-text">Идет загрузка</p>
      </div>
    );
  }

  return (
    <>
      {/* === BREADCRUMBS === */}
      <div className="hero-wrapper" style={{padding: '0px 20px', backgroundColor: '#f8f8f8' }}>
        <div className="container-camo" style={{ padding: '20px 0px' }}>
          <BootstrapBreadcrumbs />
        </div>
      </div>

      {/* === ДЕТАЛИ — КАРТОЧКА STARBUCKS === */}
      <div className="hero-wrapper" style={{ backgroundColor: '#f8f8f8', padding: '60px 0' }}>
        <div className="container-camo">
          <div className="insulator-detail-card">
            <div className="insulator-image-wrapper">
              <img
                src={insulator.image_url || '/RIP-BMSTU-FRONTED/default-image.jpg'}
                alt={insulator.insulator_name}
                className="insulator-detail-img"
              />
            </div>

            <div className="insulator-content-wrapper">
              {/* Заголовок */}
              <h1 className="insulator-title">{insulator.insulator_name}</h1>

              {/* Статус */}
              <div className="insulator-status">
                <span
                  className={`status-badge ${insulator.Insulator_active ? 'in-stock' : 'out-of-stock'}`}
                >
                  {insulator.Insulator_active ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>

              {/* Характеристики */}
              <div className="insulator-specs">
                <div className="spec-item">
                  <span className="spec-label">Теплопроводность</span>
                  <span className="spec-value">{insulator.thermal_conductivity} Вт/м·К</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Цена</span>
                  <span className="spec-value">{insulator.price_per_m2} ₽/м²</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Плотность</span>
                  <span className="spec-value">{insulator.density} кг/м³</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Огнестойкость</span>
                  <span className="spec-value">{insulator.fire_rating}</span>
                </div>
              </div>

              {/* Описание */}
              <div className="insulator-description">
                <h3>Описание</h3>
                <p>{insulator.insulator_description}</p>
              </div>

              {/* Кнопка */}
              <Link to="/insulators" className="btn-add-to-cart">
                Добавить в заявку
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};