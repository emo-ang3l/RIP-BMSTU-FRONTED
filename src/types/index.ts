export interface Insulator {
  id: number;
  insulator_name: string;
  insulator_description: string;
  Insulator_active: boolean;
  image_key: string | null;
  image_url: string | null;
  thermal_conductivity: number;
  price_per_m2: string;
  density: number;
  fire_rating: string;
}