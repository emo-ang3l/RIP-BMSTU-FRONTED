import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRequestDetails,
  removeItemFromRequest,
  updateRequestItem,
  updateRequest,
  formRequest,
} from '../../store/slices/cartSlice';
import { AppDispatch, RootState } from '../../store/store';
import './RequestPage.css';

export const RequestPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isLoading, error } = useSelector((state: RootState) => state.cart);
  const [requestData, setRequestData] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    climate_zone: '',
    required_r_value: '',
    wall_type: '',
    norm_standard: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/RIP-BMSTU-FRONTED/login');
      return;
    }

    if (id) {
      dispatch(fetchRequestDetails(Number(id))).then((result) => {
        if (fetchRequestDetails.fulfilled.match(result)) {
          console.log('Request data:', result.payload); // Debug log
          setRequestData(result.payload);
          setFormData({
            climate_zone: result.payload.climate_zone || '',
            required_r_value: result.payload.required_r_value || '',
            wall_type: result.payload.wall_type || '',
            norm_standard: result.payload.norm_standard || '',
          });
          
          // Try multiple possible field names for items
          let extractedItems: any[] = [];
          
          // Log all keys to see what's available
          console.log('All response keys:', Object.keys(result.payload));
          
          // Backend returns items in 'insulators' field as an array
          if (result.payload.insulators && Array.isArray(result.payload.insulators)) {
            extractedItems = result.payload.insulators;
            console.log('Found items in insulators field:', extractedItems);
          } else {
            // Try other possible field names as fallback
            const possibleFields = [
              'details',
              'items',
              'detail_request_insulators',
              'detailrequestinsulator_set',
              'insulator_items',
              'request_items',
            ];
            
            for (const field of possibleFields) {
              if (result.payload[field] && Array.isArray(result.payload[field]) && result.payload[field].length > 0) {
                extractedItems = result.payload[field];
                console.log(`Found items in field "${field}":`, extractedItems);
                break;
              }
            }
          }
          
          console.log('Final extracted items:', extractedItems);
          setItems(extractedItems);
        }
      });
    }
  }, [dispatch, id, isAuthenticated, navigate]);

  const isDraft = requestData?.status_request === 'DRAFT';
  const canEdit = isDraft;

  const handleRemoveItem = async (insulatorId: number) => {
    if (!id) return;
    if (window.confirm('Удалить этот утеплитель из заявки?')) {
      const result = await dispatch(removeItemFromRequest({ requestId: Number(id), insulatorId }));
      if (removeItemFromRequest.fulfilled.match(result)) {
        // Refresh request details to get updated items
        const refreshResult = await dispatch(fetchRequestDetails(Number(id)));
        if (fetchRequestDetails.fulfilled.match(refreshResult)) {
          if (refreshResult.payload.details && Array.isArray(refreshResult.payload.details)) {
            setItems(refreshResult.payload.details);
          } else if (refreshResult.payload.items && Array.isArray(refreshResult.payload.items)) {
            setItems(refreshResult.payload.items);
          }
        }
      }
    }
  };

  const handleUpdateQuantity = async (insulatorId: number, quantity: number) => {
    if (!id || !canEdit) return;
    if (quantity < 1) {
      handleRemoveItem(insulatorId);
      return;
    }
    const result = await dispatch(
      updateRequestItem({
        requestId: Number(id),
        insulatorId,
        data: { quantity },
      })
    );
    if (updateRequestItem.fulfilled.match(result)) {
      // Refresh request details to get updated items
      const refreshResult = await dispatch(fetchRequestDetails(Number(id)));
      if (fetchRequestDetails.fulfilled.match(refreshResult)) {
        if (refreshResult.payload.details && Array.isArray(refreshResult.payload.details)) {
          setItems(refreshResult.payload.details);
        } else if (refreshResult.payload.items && Array.isArray(refreshResult.payload.items)) {
          setItems(refreshResult.payload.items);
        }
      }
    }
  };

  const handleUpdateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await dispatch(
      updateRequest({
        requestId: Number(id),
        data: {
          ...formData,
          required_r_value: parseFloat(formData.required_r_value) || 0,
        },
      })
    );
    setIsEditing(false);
  };

  const handleFormRequest = async () => {
    if (!id) return;
    if (!formData.climate_zone || !formData.required_r_value || !formData.wall_type || !formData.norm_standard) {
      alert('Заполните все обязательные поля');
      return;
    }
    if (window.confirm('Подтвердить заявку? После подтверждения редактирование будет недоступно.')) {
      const result = await dispatch(formRequest(Number(id)));
      if (formRequest.fulfilled.match(result)) {
        alert('Заявка успешно сформирована!');
        navigate('/RIP-BMSTU-FRONTED/orders');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      DRAFT: { label: 'Черновик', className: 'badge-draft' },
      FORMED: { label: 'Сформирован', className: 'badge-formed' },
      COMPLETED: { label: 'Завершен', className: 'badge-completed' },
      REJECTED: { label: 'Отклонен', className: 'badge-rejected' },
      DELETED: { label: 'Удален', className: 'badge-deleted' },
    };
    const statusInfo = statusMap[status] || { label: status, className: 'badge-default' };
    return <span className={`badge ${statusInfo.className}`}>{statusInfo.label}</span>;
  };

  if (isLoading && !requestData) {
    return (
      <div className="request-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка заявки...</p>
        </div>
      </div>
    );
  }

  if (!requestData) {
    return (
      <div className="request-container">
        <div className="error-state">
          <p>Заявка не найдена</p>
          <button onClick={() => navigate('/RIP-BMSTU-FRONTED/orders')} className="btn btn-primary">
            Вернуться к заявкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="request-container">
      <div className="request-header">
        <h1>Заявка #{requestData.id}</h1>
        {getStatusBadge(requestData.status_request)}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Форма редактирования заявки */}
      {canEdit && (
        <div className="request-form-section">
          <div className="section-header">
            <h2>Параметры заявки</h2>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                Редактировать
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateRequest} className="request-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Климатическая зона *</label>
                  <input
                    type="text"
                    value={formData.climate_zone}
                    onChange={(e) => setFormData({ ...formData, climate_zone: e.target.value })}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Требуемое R-значение *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.required_r_value}
                    onChange={(e) => setFormData({ ...formData, required_r_value: e.target.value })}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Тип стены *</label>
                  <input
                    type="text"
                    value={formData.wall_type}
                    onChange={(e) => setFormData({ ...formData, wall_type: e.target.value })}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Норматив *</label>
                  <input
                    type="text"
                    value={formData.norm_standard}
                    onChange={(e) => setFormData({ ...formData, norm_standard: e.target.value })}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Сохранить
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <div className="request-info">
              <div className="info-row">
                <span className="info-label">Климатическая зона:</span>
                <span className="info-value">{requestData.climate_zone || 'Не указано'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Требуемое R-значение:</span>
                <span className="info-value">{requestData.required_r_value || 'Не указано'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Тип стены:</span>
                <span className="info-value">{requestData.wall_type || 'Не указано'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Норматив:</span>
                <span className="info-value">{requestData.norm_standard || 'Не указано'}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Список утеплителей */}
      <div className="request-items-section">
        <h2>Утеплители в заявке</h2>
        <div className="items-list">
            {items.length === 0 ? (
              <div className="empty-items">
                <p>В заявке пока нет утеплителей</p>
                <button onClick={() => navigate('/RIP-BMSTU-FRONTED/insulators')} className="btn btn-primary">
                  Добавить утеплители
                </button>
              </div>
            ) : (
              items.map((item: any, index: number) => {
                // Backend returns items with structure: { insulator: {...}, quantity: 1, ... }
                const insulator = item.insulator;
                const insulatorId = insulator?.id;
                const quantity = item.quantity || 1;
                const insulatorName = insulator?.insulator_name || `Утеплитель #${insulatorId}`;
                const imageUrl = insulator?.image_url || '/RIP-BMSTU-FRONTED/default-image.jpg';
                const thermalConductivity = insulator?.thermal_conductivity;
                const price = insulator?.price_per_m2;

                return (
                  <div key={item.id || insulatorId || index} className="item-card">
                    <div className="item-image">
                      <img
                        src={imageUrl}
                        alt={insulatorName}
                      />
                    </div>
                    <div className="item-info">
                      <h3>{insulatorName}</h3>
                      {thermalConductivity !== undefined && (
                        <p className="item-spec">Теплопроводность: {thermalConductivity} Вт/м·К</p>
                      )}
                      {price && (
                        <p className="item-price">Цена: {price} ₽/м²</p>
                      )}
                      {item.calculated_thickness && (
                        <p className="item-thickness">Расчетная толщина: {item.calculated_thickness.toFixed(2)} мм</p>
                      )}
                    </div>
                    <div className="item-actions">
                      {canEdit ? (
                        <>
                          <div className="quantity-control">
                            <label>Количество:</label>
                            <div className="quantity-buttons">
                              <button
                                onClick={() => handleUpdateQuantity(insulatorId, quantity - 1)}
                                className="quantity-btn"
                              >
                                -
                              </button>
                              <span className="quantity-value">{quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(insulatorId, quantity + 1)}
                                className="quantity-btn"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(insulatorId)}
                            className="btn btn-danger btn-sm"
                          >
                            Удалить
                          </button>
                        </>
                      ) : (
                        <div className="quantity-display">
                          <span>Количество: {quantity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
      </div>

      {/* Кнопка подтверждения */}
      {canEdit && (
        <div className="request-actions">
          <button onClick={handleFormRequest} className="btn btn-primary btn-large" disabled={items.length === 0}>
            Подтвердить заявку
          </button>
          <button onClick={() => navigate('/RIP-BMSTU-FRONTED/insulators')} className="btn btn-secondary">
            Добавить утеплители
          </button>
        </div>
      )}

      {/* Информация о заявке (для просмотра) */}
      {!canEdit && (
        <div className="request-info-section">
          <h2>Информация о заявке</h2>
          <div className="request-info">
            <div className="info-row">
              <span className="info-label">Дата создания:</span>
              <span className="info-value">
                {new Date(requestData.creation_datetime).toLocaleString('ru-RU')}
              </span>
            </div>
            {requestData.formation_datetime && (
              <div className="info-row">
                <span className="info-label">Дата формирования:</span>
                <span className="info-value">
                  {new Date(requestData.formation_datetime).toLocaleString('ru-RU')}
                </span>
              </div>
            )}
            {requestData.completion_datetime && (
              <div className="info-row">
                <span className="info-label">Дата завершения:</span>
                <span className="info-value">
                  {new Date(requestData.completion_datetime).toLocaleString('ru-RU')}
                </span>
              </div>
            )}
            {requestData.total_thickness && (
              <div className="info-row">
                <span className="info-label">Общая толщина:</span>
                <span className="info-value">{requestData.total_thickness.toFixed(2)} мм</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

