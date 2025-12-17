// frontend/src/api/api.ts  (новый файл)
import { Insulator } from './types';
import { API_BASE } from '../api/base';

const MOCK_INSULATORS: Insulator[] = [
  {
    id: 1,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035
  },
   {
    id: 2,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035
  },
   {
    id: 3,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035
  },
   {
    id: 4,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035
  },
   {
    id: 5,
    insulator_name: "Минвата Rockwool",
    insulator_description: "Отличная теплоизоляция",
    image_key: null,
    image_url: null,
    thermal_conductivity: 0.035
  }
];

export const fetchInsulators = async (search = ''): Promise<Insulator[]> => {
  const params = new URLSearchParams();
  if (search) params.append('q', search);

  try {
    // Используем относительный путь через прокси Vite для избежания Mixed Content
    const res = await fetch(`/api/insulators/?${params}`);    
    if (!res.ok) throw new Error();
      return await res.json();
  } catch (e) {
    console.warn('Бэк недоступен — моки');
    return MOCK_INSULATORS.filter(i => {
      const matchesName = search ? i.insulator_name.toLowerCase().includes(search.toLowerCase()) : true;
      return matchesName;
    });
  }
};


export const fetchInsulatorById = async (id: number): Promise<Insulator> => {
  try {
    // Используем относительный путь через прокси Vite для избежания Mixed Content
    const res = await fetch(`/api/insulators/${id}/`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    const mock = MOCK_INSULATORS.find(i => i.id === id);
    if (!mock) throw new Error('Not found');
    return mock;
  }
};