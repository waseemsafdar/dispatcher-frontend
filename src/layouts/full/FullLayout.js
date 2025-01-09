import React, { useState } from "react";
import { styled, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { padding } from "@mui/system";
import { pad } from "lodash";

const MainWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  padding: theme.spacing(2), // Add padding here
}));

const PageWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
  padding: theme.spacing(2), // Add padding here
}));

const FullLayout = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Box
    className='mainwrapper'
    sx={{  }} // Add padding here
  >
    <Header  
          // Pass any props needed by Header
        />    
      
       
    <Box style={{padding:'20px'}}>
    <Outlet  />
    </Box>
  </Box>
   
        
      
  );
};

export default FullLayout;