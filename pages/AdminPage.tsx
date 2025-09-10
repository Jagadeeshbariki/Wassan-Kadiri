
import React, { useState, FormEvent } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

const AdminPage = () => {
  const { products, addProduct, updateProduct, loading } = useProducts();
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '0', category: 'Vegetable' as Product['category'], stock: '0' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please upload a product image.");
      return;
    }

    // This is a mock of image upload. In a real app, you'd upload to a service and get a URL.
    const imageUrl = URL.createObjectURL(imageFile); 

    try {
      await addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
        imageUrl: imageUrl,
      });
      // Reset form
      setNewProduct({ name: '', description: '', price: '0', category: 'Vegetable', stock: '0' });
      setImageFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert("Failed to add product.");
    }
  };
  
  const handleStockUpdate = async (product: Product, newStock: number) => {
    if (newStock < 0) return;
    try {
        await updateProduct({ ...product, stock: newStock });
    } catch (error) {
        alert("Failed to update stock.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={newProduct.description} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required min="0" step="0.01" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={newProduct.category} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option>Vegetable</option>
              <option>Millet Snack</option>
              <option>Fruit</option>
            </select>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" required accept="image/*" />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Add Product</button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Manage Stock</h2>
        {loading ? <p>Loading...</p> : (
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 border rounded-md">
                <div className="flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded"/>
                    <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Stock:</label>
                  <input 
                    type="number" 
                    value={product.stock}
                    onChange={(e) => handleStockUpdate(product, parseInt(e.target.value, 10))}
                    className="w-20 border border-gray-300 rounded-md p-1 text-center"
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
