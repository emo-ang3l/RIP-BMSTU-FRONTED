import { Insulator } from '../../modules/types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToRequest } from '../../store/slices/cartSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useState } from 'react';

interface Props {
  insulator: Insulator;
}

export const InsulatorCard = ({ insulator }: Props) => {
  const imageUrl = insulator.image_url || '/RIP-BMSTU-FRONTED/default-image.jpg';
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.cart);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToRequest = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/RIP-BMSTU-FRONTED/login');
      return;
    }

    if (!insulator.Insulator_active) {
      alert('Этот утеплитель недоступен');
      return;
    }

    setIsAdding(true);
    try {
      await dispatch(addToRequest(insulator.id));
    } catch (error) {
      console.error('Failed to add to request:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="card-wrapper">
      <Link 
        to={`/RIP-BMSTU-FRONTED/insulators/${insulator.id}`} 
        className="card-link"
        state={{ name: insulator.insulator_name }}
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
      {isAuthenticated && insulator.Insulator_active && (
        <button
          onClick={handleAddToRequest}
          disabled={isAdding || isLoading}
          className="card-add-btn"
          title="Добавить в заявку"
        >
          {isAdding ? 'Добавление...' : 'Добавить в заявку'}
        </button>
      )}
    </div>
  );
};