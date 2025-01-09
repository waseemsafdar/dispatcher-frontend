import React from 'react';
import MenuItems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List, ListItem } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = ({ direction = 'vertical' }) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: direction === 'vertical' ? 3 : 0 }}>
      <List
        sx={{ 
          pt: 0, 
          display: 'flex', 
          flexDirection: direction === 'vertical' ? 'column' : 'row',
          justifyContent: 'flex-end', // Align items to the end for horizontal direction
          width: '100%',
        }} 
        className="sidebarNav"
      >
        {MenuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <ListItem key={item.id} sx={{ display: 'inline-flex' }}>
                <NavItem item={item} pathDirect={pathDirect} />
              </ListItem>
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;