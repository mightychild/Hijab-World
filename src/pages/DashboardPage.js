import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { logoutUser, getStoredUserInfo } from '../services/authService';

export default function DashboardPage() {
  // Remove unused navigate: const navigate = useNavigate();
  const userInfo = getStoredUserInfo();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Dashboard, {userInfo?.firstName}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {userInfo?.email}
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleLogout}
        sx={{
          bgcolor: "#7a3cff",
          ":hover": { bgcolor: "#692fd9" },
          mt: 2
        }}
      >
        Logout
      </Button>
    </Box>
  );
}