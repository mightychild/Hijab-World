import { apiRequest } from './authService';

// Get all products with optional filtering
export const getProducts = async (filters = {}) => {
  const { page = 1, limit = 12, category, search, featured } = filters;
  
  let url = `/products?page=${page}&limit=${limit}`;
  
  if (category && category !== 'all') {
    url += `&category=${category}`;
  }
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (featured) {
    url += '&featured=true';
  }

  return await apiRequest(url, {
    method: 'GET',
  });
};

// Get single product
export const getProduct = async (productId) => {
  return await apiRequest(`/products/${productId}`, {
    method: 'GET',
  });
};

// Get featured products
export const getFeaturedProducts = async () => {
  return await apiRequest('/products/featured/products', {
    method: 'GET',
  });
};

// Create product with images (admin only)
export const createProduct = async (formData) => {
  // For FormData, we need to handle it differently
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const token = userInfo?.token;

  const response = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create product');
  }

  return await response.json();
};

// Update product (admin only)
export const updateProduct = async (productId, productData) => {
  return await apiRequest(`/products/${productId}`, {
    method: 'PUT',
    body: productData,
  });
};

// Delete product (admin only)
export const deleteProduct = async (productId) => {
  return await apiRequest(`/products/${productId}`, {
    method: 'DELETE',
  });
};

// Search products
export const searchProducts = async (query) => {
  return await apiRequest(`/products?search=${encodeURIComponent(query)}`, {
    method: 'GET',
  });
};

// Get products by category
export const getProductsByCategory = async (category) => {
  return await apiRequest(`/products?category=${encodeURIComponent(category)}`, {
    method: 'GET',
  });
};