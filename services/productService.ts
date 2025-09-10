import { Product } from '../types';

// Mock data
let mockProducts: Product[] = [
  { id: '1', name: 'Organic Carrots', description: 'Fresh and crunchy carrots, straight from the farm.', price: 50, imageUrl: 'https://picsum.photos/seed/carrots/400/300', category: 'Vegetable', stock: 100 },
  { id: '2', name: 'Millet Cookies', description: 'Healthy and delicious cookies made from foxtail millet.', price: 120, imageUrl: 'https://picsum.photos/seed/cookies/400/300', category: 'Millet Snack', stock: 50 },
  { id: '3', name: 'Fresh Spinach', description: 'Rich in iron and vitamins, perfect for a healthy meal.', price: 40, imageUrl: 'https://picsum.photos/seed/spinach/400/300', category: 'Vegetable', stock: 80 },
  { id: '4', name: 'Ripe Tomatoes', description: 'Juicy and red tomatoes for your salads and curries.', price: 60, imageUrl: 'https://picsum.photos/seed/tomatoes/400/300', category: 'Vegetable', stock: 120 },
  { id: '5', name: 'Ragi Murukku', description: 'A crispy and savory snack made from finger millet flour.', price: 90, imageUrl: 'https://picsum.photos/seed/murukku/400/300', category: 'Millet Snack', stock: 60 },
  { id: '6', name: 'Fresh Apples', description: 'Sweet and crisp apples from the Himalayas.', price: 150, imageUrl: 'https://picsum.photos/seed/apples/400/300', category: 'Fruit', stock: 75 },
];

// Mock API service
export const productService = {
  getProducts: (): Promise<Product[]> => {
    return new Promise(resolve => {
      setTimeout(() => resolve([...mockProducts]), 500);
    });
  },
  addProduct: (productData: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newProduct: Product = {
          id: (Math.random() + 1).toString(36).substring(7),
          ...productData
        };
        mockProducts.push(newProduct);
        resolve(newProduct);
      }, 300);
    });
  },
  updateProduct: (productData: Product): Promise<Product> => {
     return new Promise(resolve => {
      setTimeout(() => {
        mockProducts = mockProducts.map(p => p.id === productData.id ? productData : p);
        resolve(productData);
      }, 300);
    });
  },
  deleteProduct: (productId: string): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        mockProducts = mockProducts.filter(p => p.id !== productId);
        resolve();
      }, 300);
    });
  }
};