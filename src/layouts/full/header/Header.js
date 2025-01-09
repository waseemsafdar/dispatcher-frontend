import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge } from '@mui/material';
import PropTypes from 'prop-types';

import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import SidebarItems from '../sidebar/SidebarItems';
import Profile from '../header/Profile';
import Logo from '../shared/logo/Logo';

const Header = (props) => {

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled style={{ paddingTop: '20px', paddingBottom: '20px', background: "#fbfbfb" }} position="sticky" color="default">
      <ToolbarStyled>

        {/* Menu Button for Mobile */}
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <IconMenu />
        </IconButton> */}

        {/* Logo or Title */}
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Logo />
          <Box display="flex" flexDirection="row" width="auto" justifyContent="flex-end">
            <SidebarItems direction="horizontal" />
          </Box>
        </Box>

        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              ...(typeof anchorEl2 === 'object' && {
                color: 'primary.main',
              }),
            }}
          >
            {/* <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge> */}
          </IconButton>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;