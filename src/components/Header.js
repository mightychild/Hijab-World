import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge
} from '@mui/material';
import {
  Menu,
  ShoppingCart,
  Search,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper', 
        color: 'text.primary',
        borderRadius: '16px',
        mb: 3
      }}
    >
      <Toolbar>
        {/* Menu Button (Mobile only) */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <Menu />
        </IconButton>

        {/* Logo */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #7a3cff 30%, #9d6aff 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Hijab World
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          
          <IconButton 
            color="inherit" 
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          <IconButton 
            color="inherit"
            onClick={() => navigate('/profile')}
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}