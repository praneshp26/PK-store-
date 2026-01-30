export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number; // Optional original price for calculating discount
  description: string;
  image: string;
  deliveryDays: 1 | 2; // Strictly 1 or 2 per PRD
  category: string;
  rating: number;
  sellerName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  items: Product[];
  total: number;
  date: string;
  status: 'confirmed' | 'delivered';
  deliveryPromise: string;
}

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'fastest';