import { Insulator } from '../../modules/types';
import { Link } from 'react-router-dom';

interface Props {
  insulator: Insulator;
}

export const InsulatorCard = ({ insulator }: Props) => {
  const imageUrl = insulator.image_url || '/RIP-BMSTU-FRONTED/default-image.jpg';

  return (
    <Link 
      to={`/RIP-BMSTU-FRONTED/insulators/${insulator.id}`} 
      className="card-link"
      state={{ name: insulator.insulator_name }}  // ← добавляем
    >
      <div className="card-container">
        <div className="card-image-container">
          <img src={imageUrl} alt={insulator.insulator_name} className="card-image" />
        </div>
        <div className="card-body-container">
          <div className="card-presence-container">
            <p className={`card-presence-text ${!insulator.Insulator_active ? 'not-available' : ''}`}>
              {insulator.Insulator_active ? 'В наличии' : 'Нет в наличии'}
            </p>
          </div>
          <div className="card-text-container">
            <p className="card-body-text">{insulator.insulator_name}</p>
            <div className="card-price-container">
              <p className="card-price-text">{insulator.thermal_conductivity} Вт/м·К</p>
              <div className="card-count-container">
                <p className="card-count-text">за 1 м²</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};