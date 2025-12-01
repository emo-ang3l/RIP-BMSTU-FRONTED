// frontend/src/api/api.ts  (новый файл)
import { Insulator } from './types';
import { API_BASE } from '../api/base';

const MOCK_INSULATORS: Insulator[] = [
  {
    id: 1,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    Insulator_active: true,
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035,
    price_per_m2: "150.00",
    density: 35,
    fire_rating: "НГ"
  },
   {
    id: 2,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    Insulator_active: true,
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035,
    price_per_m2: "150.00",
    density: 35,
    fire_rating: "НГ"
  },
   {
    id: 3,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    Insulator_active: true,
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035,
    price_per_m2: "150.00",
    density: 35,
    fire_rating: "НГ"
  },
   {
    id: 4,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    Insulator_active: true,
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035,
    price_per_m2: "150.00",
    density: 35,
    fire_rating: "НГ"
  },
   {
    id: 5,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    Insulator_active: true,
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035,
    price_per_m2: "150.00",
    density: 35,
    fire_rating: "НГ"
  }
];

export const fetchInsulators = async (search = '', minPrice?: number, maxPrice?: number): Promise<Insulator[]> => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('only_active', 'true');
  if (minPrice !== undefined) params.append('min_price', minPrice.toString());
  if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());

  try {
    const res = await fetch(`${API_BASE}/api/insulators/?${params}`);    
    if (!res.ok) throw new Error();
      return await res.json();
  } catch (e) {
    console.warn('Бэк недоступен — моки');
    return MOCK_INSULATORS.filter(i => {
      const matchesName = search ? i.insulator_name.toLowerCase().includes(search.toLowerCase()) : true;
      const price = parseFloat(i.price_per_m2);
      const matchesMin = minPrice !== undefined ? price >= minPrice : true;
      const matchesMax = maxPrice !== undefined ? price <= maxPrice : true;
      return i.Insulator_active && matchesName && matchesMin && matchesMax;
    });
  }
};


export const fetchInsulatorById = async (id: number): Promise<Insulator> => {
  try {
    const res = await fetch(`${API_BASE}/api/insulators/${id}/`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    const mock = MOCK_INSULATORS.find(i => i.id === id);
    if (!mock) throw new Error('Not found');
    return mock;
  }
};