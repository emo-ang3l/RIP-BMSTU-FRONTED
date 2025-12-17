import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders, deleteOrder } from '../../store/slices/ordersSlice';
import { AppDispatch, RootState } from '../../store/store';
import './OrdersListPage.css';

export const OrdersListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orders);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/RIP-BMSTU-FRONTED/login');
      return;
    }
    dispatch(fetchUserOrders());
    
    // Установить сегодняшнюю дату по умолчанию
    const today = new Date().toISOString().split('T')[0];
    setDateFrom(today);
  }, [dispatch, isAuthenticated, navigate]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      await dispatch(deleteOrder(id));
      dispatch(fetchUserOrders());
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

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Фильтрация заявок: исключаем DRAFT и DELETED, применяем фильтры
  const filteredOrders = orders.filter((order) => {
    // Исключаем черновики и удаленные
    if (order.status_request === 'DRAFT' || order.status_request === 'DELETED') {
      return false;
    }
    
    // Фильтр по статусу
    if (statusFilter && order.status_request !== statusFilter) {
      return false;
    }
    
    // Фильтр по датам
    if (dateFrom || dateTo) {
      const orderDate = new Date(order.creation_datetime);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo + 'T23:59:59') : null;
      
      if (fromDate && orderDate < fromDate) {
        return false;
      }
      if (toDate && orderDate > toDate) {
        return false;
      }
    }
    
    return true;
  });

  const handleClearFilters = () => {
    const today = new Date().toISOString().split('T')[0];
    setDateFrom(today);
    setDateTo('');
    setStatusFilter('');
  };

  if (isLoading) {
    return (
      <div className="orders-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка заказов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Мои заказы</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/RIP-BMSTU-FRONTED/home')}
        >
          Создать новый заказ
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Фильтры */}
      <div className="orders-filters">
        <div className="filter-group">
          <label>Дата от:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Дата до:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Статус:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-input"
          >
            <option value="">Все</option>
            <option value="FORMED">Сформирован</option>
            <option value="COMPLETED">Завершен</option>
            <option value="REJECTED">Отклонен</option>
          </select>
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleClearFilters}
        >
          Сбросить
        </button>
      </div>

      {/* Счетчик результатов */}
      <div className="orders-results-count">
        Найдено заявок: <strong>{filteredOrders.length}</strong>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <p>Заявки не найдены</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/RIP-BMSTU-FRONTED/home')}
          >
            Создать первый заказ
          </button>
        </div>
      ) : (
        <div className="orders-cards">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card" onClick={() => navigate(`/RIP-BMSTU-FRONTED/insulatorequests/${order.id}`)}>
              <div className="order-card-header">
                <div className="order-card-id">Заявка #{order.id}</div>
                {getStatusBadge(order.status_request)}
              </div>
              <div className="order-card-body">
                <div className="order-card-field">
                  <span className="field-label">Дата создания:</span>
                  <span className="field-value">{formatDate(order.creation_datetime)}</span>
                </div>
                <div className="order-card-field">
                  <span className="field-label">R-значение:</span>
                  <span className="field-value">{order.required_r_value || '-'}</span>
                </div>
                <div className="order-card-field">
                  <span className="field-label">Толщина:</span>
                  <span className="field-value">{order.total_thickness ? `${order.total_thickness.toFixed(2)} мм` : '-'}</span>
                </div>
              </div>
              <div className="order-card-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(order.id)}
                  disabled={order.status_request === 'COMPLETED'}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

