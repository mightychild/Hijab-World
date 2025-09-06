import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import MobileBottomNavigation from './BottomNavigation';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - 280px)` },
          ml: { md: '280px' },
          pb: { xs: '70px', md: 3 },
          // Add centering for content
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          minHeight: '100vh'
        }}
      >
        {/* Content container with max width for better centering */}
        <Box sx={{ 
          width: '100%', 
        //   maxWidth: '1000px', // Add max width for better centering on large screens
          flex: 1 
        }}>
          {children}
        </Box>
      </Box>

      <MobileBottomNavigation handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
}