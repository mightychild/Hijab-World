import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Alert,
  Fade,
  Zoom,
  Slide,
  Container,
  Paper
} from "@mui/material";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  ShoppingBag
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ 
        bgcolor: "#f9f7fd",
        p: 2,
        background: 'linear-gradient(135deg, #f9f7fd 0%, #e8e2f9 100%)'
      }}
    >
      <Container maxWidth="sm">
        <Box
          component={Paper}
          elevation={6}
          sx={{
            p: 4,
            borderRadius: '20px',
            background: 'white',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Animated Logo */}
          <Slide direction="down" in={true} timeout={800}>
            <Box textAlign="center" mb={3}>
              <ShoppingBag 
                sx={{ 
                  fontSize: 48, 
                  color: '#7a3cff',
                  animation: 'pulse 2s infinite',
                  mb: 1
                }} 
              />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: "bold",
                  background: 'linear-gradient(45deg, #7a3cff 30%, #9d6aff 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 0.5
                }}
              >
                Hijab World
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Welcome back
              </Typography>
            </Box>
          </Slide>

          <Fade in={true} timeout={1000}>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: '12px',
                    animation: 'bounce 0.5s ease-in-out'
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Email Input */}
              <TextField
                label="Email Address"
                name="email"
                variant="outlined"
                fullWidth
                required
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                sx={{
                  mb: 2,
                  bgcolor: "white",
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '12px',
                    paddingLeft: 1,
                  },
                }}
                InputProps={{
                  startAdornment: <Email sx={{ color: '#7a3cff', mr: 1 }} />,
                }}
              />

              {/* Password Input */}
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleInputChange}
                sx={{
                  mb: 1,
                  bgcolor: "white",
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '12px',
                    paddingLeft: 1,
                  },
                }}
                InputProps={{
                  startAdornment: <Lock sx={{ color: '#7a3cff', mr: 1 }} />,
                  endAdornment: (
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ minWidth: 'auto', p: 0.5 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  ),
                }}
              />

              {/* Forgot Password */}
              <Box sx={{ mb: 3, textAlign: 'right' }}>
                <Link href="#" underline="hover" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                  Forgot password?
                </Link>
              </Box>

              {/* Login Button */}
              <Zoom in={true} timeout={1200}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mb: 3,
                    bgcolor: "#7a3cff",
                    ":hover": { 
                      bgcolor: "#692fd9",
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(122, 60, 255, 0.3)'
                    },
                    borderRadius: "12px",
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Zoom>

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.300' }} />
                <Typography variant="body2" sx={{ px: 2, color: 'grey.600' }}>
                  or continue with
                </Typography>
                <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.300' }} />
              </Box>

              {/* Create & Guest Buttons */}
              <Box display="flex" gap={2}>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="outlined"
                  fullWidth
                  startIcon={<Person />}
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "white",
                    ":hover": { 
                      bgcolor: "grey.50",
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    },
                    py: 1.2,
                    fontWeight: 500
                  }}
                >
                  Create Account
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "white",
                    ":hover": { 
                      bgcolor: "grey.50",
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    },
                    py: 1.2,
                    fontWeight: 500
                  }}
                >
                  Continue as Guest
                </Button>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}