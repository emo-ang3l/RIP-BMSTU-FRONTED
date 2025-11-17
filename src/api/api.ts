// src/api/api.ts
import { Insulator } from '../types';

// Mock-данные (на случай, если бэкенд выключен)
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
  },
   {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
    insulator_name: "Пенопласт ПСБ-С 25",
    insulator_description: "Лёгкий и дешёвый",
    Insulator_active: true,
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.038,
    price_per_m2: "80.00",
    density: 15,
    fire_rating: "Г3"
  }
];

export const fetchInsulators = async (
  search = '',
  minPrice?: number,
  maxPrice?: number
): Promise<Insulator[]> => {
  const params = new URLSearchParams();

  // ТОЧНО КАК В ТВОЁМ БЭКЕНДЕ
  if (search) params.append('search', search);
  params.append('only_active', 'true');  // ← всегда true
  if (minPrice !== undefined) params.append('min_price', minPrice.toString());
  if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());

  const url = `/api/insulators/?${params.toString()}`;
  console.log('Запрос к бэкенду:', url); // ← для дебага

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log('Ответ от бэкенда:', data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Бэкенд недоступен → используем mock:', error);
    // Фильтрация mock по тем же параметрам
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
    const res = await fetch(`/api/insulators/${id}/`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    const mock = MOCK_INSULATORS.find(i => i.id === id);
    if (!mock) throw new Error('Not found');
    return mock;
  }
};