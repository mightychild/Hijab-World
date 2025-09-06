import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Home,
  ShoppingCart,
  Person,
  Favorite,
  History,
  Settings,
  Store,
  Category
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const drawerWidth = 280;

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Products', icon: <Store />, path: '/products' },
  { text: 'Categories', icon: <Category />, path: '/categories' },
  { text: 'Wishlist', icon: <Favorite />, path: '/wishlist' },
  { text: 'Order History', icon: <History />, path: '/orders' },
];

const accountItems = [
  { text: 'Profile', icon: <Person />, path: '/profile' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const drawer = (
    <Box>
      {/* Logo */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #7a3cff 30%, #9d6aff 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Hijab World
        </Typography>
      </Box>

      <Divider />

      {/* Main Menu */}
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '12px',
                '&.Mui-selected': {
                  bgcolor: 'rgba(122, 60, 255, 0.1)',
                  color: '#7a3cff',
                  '&:hover': {
                    bgcolor: 'rgba(122, 60, 255, 0.15)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(122, 60, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Cart Item */}
      <List sx={{ px: 2 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => navigate('/cart')}
            selected={location.pathname === '/cart'}
            sx={{
              borderRadius: '12px',
              '&.Mui-selected': {
                bgcolor: 'rgba(122, 60, 255, 0.1)',
                color: '#7a3cff',
                '&:hover': {
                  bgcolor: 'rgba(122, 60, 255, 0.15)',
                },
              },
              '&:hover': {
                bgcolor: 'rgba(122, 60, 255, 0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', position: 'relative' }}>
              <ShoppingCart />
              {cartItems.length > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: '#ff4757',
                    color: 'white',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                >
                  {cartItems.length}
                </Box>
              )}
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Account Menu */}
      <List sx={{ px: 2 }}>
        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, color: 'text.secondary' }}>
          Account
        </Typography>
        {accountItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '12px',
                '&.Mui-selected': {
                  bgcolor: 'rgba(122, 60, 255, 0.1)',
                  color: '#7a3cff',
                  '&:hover': {
                    bgcolor: 'rgba(122, 60, 255, 0.15)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(122, 60, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            bgcolor: 'background.paper',
            boxShadow: '2px 0 20px rgba(0, 0, 0, 0.1)',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}