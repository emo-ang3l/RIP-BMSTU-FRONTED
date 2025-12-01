import { useEffect } from 'react';
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/RIP-BMSTU-FRONTED/login');
      return;
    }
    dispatch(fetchUserOrders());
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
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
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

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>У вас пока нет заказов</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/RIP-BMSTU-FRONTED/home')}
          >
            Создать первый заказ
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th>Климат. зона</th>
                <th>Тип стены</th>
                <th>Требуемое R-значение</th>
                <th>Норматив</th>
                <th>Толщина (мм)</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{getStatusBadge(order.status_request)}</td>
                  <td>{formatDate(order.creation_datetime)}</td>
                  <td>{order.climate_zone}</td>
                  <td>{order.wall_type}</td>
                  <td>{order.required_r_value}</td>
                  <td>{order.norm_standard}</td>
                  <td>{order.total_thickness ? `${order.total_thickness} мм` : '-'}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(order.id)}
                      disabled={order.status_request === 'COMPLETED'}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

