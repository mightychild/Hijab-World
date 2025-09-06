import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  MenuItem,
  Pagination,
  Chip,
  CircularProgress,
  Alert,
  Skeleton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getProducts, getProductsByCategory, searchProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductSkeleton = () => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '16px'
    }}>
      <Skeleton 
        variant="rectangular" 
        height={250} 
        animation="wave" 
        sx={{ 
          borderTopLeftRadius: '16px', 
          borderTopRightRadius: '16px' 
        }} 
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={30} animation="wave" />
        <Skeleton variant="text" width="40%" height={25} animation="wave" />
        <Skeleton variant="text" height={20} animation="wave" />
        <Skeleton variant="text" height={20} animation="wave" />
        <Skeleton variant="text" width="80%" height={25} animation="wave" />
        <Skeleton variant="text" width="60%" height={20} animation="wave" />
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Skeleton 
          variant="rectangular" 
          height={40} 
          animation="wave" 
          sx={{ borderRadius: '12px' }} 
        />
      </Box>
    </Card>
  </Grid>
);

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'hijabs', label: 'Hijabs' },
  { value: 'abayas', label: 'Abayas' },
  { value: 'jilbabs', label: 'Jilbabs' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'perfumes', label: 'Perfumes' },
  { value: 'skincare', label: 'Skincare' }
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    page: 1,
    limit: 12
  });
  const [pagination, setPagination] = useState({});
  
  
  // Get cart functions and items from context
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        let data;
        
        if (filters.search) {
          data = await searchProducts(filters.search);
          setProducts(Array.isArray(data) ? data : (data.products || []));
        } else if (filters.category !== 'all') {
          data = await getProductsByCategory(filters.category);
          setProducts(Array.isArray(data) ? data : (data.products || []));
        } else {
          data = await getProducts(filters);
          if (Array.isArray(data)) {
            setProducts(data);
            setPagination({
              page: 1,
              pages: 1,
              total: data.length
            });
          } else {
            setProducts(data.products || []);
            setPagination({
              page: data.page || 1,
              pages: data.pages || 1,
              total: data.total || (data.products ? data.products.length : 0)
            });
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters.category, filters.page, filters.search]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
    }
  };

  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Skeleton */}
        <Box textAlign="center" mb={4}>
            <Skeleton 
            variant="text" 
            width="40%" 
            height={60} 
            animation="wave" 
            sx={{ mx: 'auto', mb: 2 }} 
            />
            <Skeleton 
            variant="text" 
            width="30%" 
            height={30} 
            animation="wave" 
            sx={{ mx: 'auto' }} 
            />
        </Box>

        {/* Filter Skeletons */}
        <Box display="flex" gap={2} mb={4} flexWrap="wrap">
            <Skeleton variant="rectangular" width={200} height={56} animation="wave" sx={{ borderRadius: '12px' }} />
            <Skeleton variant="rectangular" width={400} height={56} animation="wave" sx={{ borderRadius: '12px' }} />
        </Box>

        {/* Products Grid Skeleton */}
        <Grid container spacing={3}>
            {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
            ))}
        </Grid>
        </Container>
    );
    }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with Cart Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#7a3cff' }}>
            Our Collection
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover our beautiful range of Islamic fashion and products
          </Typography>
        </Box>
        
        <Button 
          component={RouterLink} 
          to="/cart"
          variant="contained"
          sx={{
            bgcolor: '#7a3cff',
            '&:hover': { bgcolor: '#692fd9' }
          }}
        >
          View Cart ({cartItems.length})
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          select
          label="Category"
          value={filters.category}
          onChange={handleCategoryChange}
          sx={{ minWidth: 200 }}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
          fullWidth
          label="Search products..."
          variant="outlined"
          onKeyPress={handleSearch}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id || product.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}>
                {/* Product Image */}
                <CardMedia
                  component="img"
                  height="250"
                  image={product.images?.[0]?.url || '/placeholder-image.jpg'}
                  alt={product.images?.[0]?.alt || product.name}
                  sx={{ objectFit: 'cover' }}
                />
                
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Category Chip */}
                  <Chip 
                    label={product.category} 
                    size="small" 
                    sx={{ 
                      mb: 1, 
                      bgcolor: '#f0e6ff',
                      color: '#7a3cff',
                      textTransform: 'capitalize'
                    }} 
                  />
                  
                  {/* Product Name */}
                  <Typography variant="h6" component="h2" gutterBottom noWrap>
                    {product.name}
                  </Typography>
                  
                  {/* Product Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </Typography>
                  
                  {/* Price */}
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                    ${product.price}
                  </Typography>
                  
                  {/* Stock Status */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: product.stock > 0 ? 'success.main' : 'error.main',
                      mb: 2 
                    }}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </Typography>
                </CardContent>
                
                {/* Add to Cart Button */}
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={product.stock === 0}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      bgcolor: '#7a3cff',
                      '&:hover': { bgcolor: '#692fd9' },
                      '&:disabled': { bgcolor: 'grey.300' }
                    }}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          /* No Products Message */
          <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {loading ? 'Loading products...' : 'No products found'}
            </Typography>
            {!loading && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {filters.search ? `No results for "${filters.search}"` : 'Check back later for new products'}
              </Typography>
            )}
          </Box>
        )}
      </Grid>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={pagination.pages}
            page={filters.page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
}