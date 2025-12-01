// src/components/Breadcrumbs.tsx
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation, Link } from 'react-router-dom';

export const BootstrapBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const nameMap: { [key: string]: string } = {
    home: 'Домой',
    insulators: 'Услуги',
  };

  // Получаем название из state (для детальной страницы)
  const detailName = location.state?.name;

  return (
    <Breadcrumb className="breadcrumbs-bootstrap">
      <Breadcrumb.Item
        linkAs={Link}
        linkProps={{ to: '/home' }}
        active={location.pathname === '/home'}
      >
        Домой
      </Breadcrumb.Item>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        // Пропускаем "home"
        if (value === 'home') return null;

        // Если это детальная страница — используем название из state
        if (isLast && pathnames[index - 1] === 'insulators' && detailName) {
          return (
            <Breadcrumb.Item key={to} active>
              {detailName}
            </Breadcrumb.Item>
          );
        }

        const name = nameMap[value] || value;

        return (
          <Breadcrumb.Item
            key={to}
            linkAs={Link}
            linkProps={{ to }}
            active={isLast}
          >
            {name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};