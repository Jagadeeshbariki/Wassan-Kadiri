import { User } from '../types';

// In-memory mock user database with passwords for demonstration
const mockUsers: (User & { passwordHash: string })[] = [
  { id: '1', email: 'customer@example.com', name: 'Test Customer', role: 'customer', passwordHash: 'customer123' },
  { id: '2', email: 'admin@example.com', name: 'Test Admin', role: 'admin', passwordHash: 'admin123' },
];

const USER_STORAGE_KEY = 'wassan-kadiri-user';

export const authService = {
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        // In a real app, you would verify a hashed password. Here we do a simple string comparison for the mock.
        if (user && user.passwordHash === password) {
          const userToStore: User = { id: user.id, email: user.email, name: user.name, role: user.role };
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToStore));
          resolve(userToStore);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },

  signup: (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some(u => u.email === email)) {
          reject(new Error('An account with this email already exists.'));
          return;
        }
        const newUser: User = {
          id: String(mockUsers.length + 1),
          name,
          email,
          role: 'customer', // Default role for new signups
        };
        const newUserWithPass = { ...newUser, passwordHash: password };

        mockUsers.push(newUserWithPass);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        resolve(newUser);
      }, 500);
    });
  },

  logout: (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    if (!userJson) {
      return null;
    }
    try {
      const user = JSON.parse(userJson) as User;
      // Re-verify user from storage still exists in our mock db
      if (mockUsers.some(u => u.id === user.id)) {
        return user;
      }
      // User might have been deleted, so clear invalid session
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    } catch (error) {
      // Clear corrupted data from storage
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  },
};
