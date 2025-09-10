
import { Order, CartItem, OrderItem } from '../types';

const mockOrders: Order[] = [
    {
        id: 'ord101',
        userId: '1',
        date: '2023-10-26T10:00:00Z',
        items: [
            { product: { id: '1', name: 'Organic Carrots', description: '', price: 50, imageUrl: 'https://picsum.photos/seed/carrots/400/300', category: 'Vegetable', stock: 100 }, quantity: 2, price: 50 },
            { product: { id: '2', name: 'Millet Cookies', description: '', price: 120, imageUrl: 'https://picsum.photos/seed/cookies/400/300', category: 'Millet Snack', stock: 50 }, quantity: 1, price: 120 }
        ],
        total: 220,
        status: 'Delivered'
    },
];

export const orderService = {
    getOrders: (userId: string): Promise<Order[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userOrders = mockOrders.filter(order => order.userId === userId);
                resolve(userOrders);
            }, 500);
        });
    },

    placeOrder: (userId: string, cartItems: CartItem[]): Promise<Order> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newOrder: Order = {
                    id: `ord${Math.floor(Math.random() * 1000)}`,
                    userId,
                    date: new Date().toISOString(),
                    items: cartItems.map(item => ({
                        // FIX: Added missing 'price' property to the product object to conform to the Product type.
                        product: { id: item.id, name: item.name, imageUrl: item.imageUrl, description: '', category: 'Vegetable', stock: 0, price: item.price },
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    status: 'Pending'
                };
                mockOrders.push(newOrder);
                resolve(newOrder);
            }, 500);
        });
    }
};
