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

    </div>
  );
};