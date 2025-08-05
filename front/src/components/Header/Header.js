import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import backgroundImage from '../../assets/img/Rectangle_2.png';
import SearchBlock from '../Search/SearchBlock';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyleButton = styled(Button)(({ theme }) => ({
  color: '#222',
  fontFamily: 'Montserrat',
  textTransform: 'none',
  border: '1px solid #222',
  borderRadius: '14px',
}));

const StyleHeader = styled(Stack)(({ theme }) => ({
  float: 'right',
  background: '#fff',
  margin: '50px',
}));

const Logo = styled('span')({
  fontWeight: '600',
  fontSize: '20px',
  margin: '50px',
  position: 'relative',
  top: '50px',
  bottom: '150px',
});

const Presentation = styled('div')({
  backgroundImage: `url(${backgroundImage})`,
  width: '100%',
  height: '500px',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundBlendMode: 'multiply',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  top: '100px',
});

const menuStyles = {
  mt: 1.5,
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

export default function Header({ isUserHome = false, user = null, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    // Убираем фокус ДО закрытия меню
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    navigate('/account_settings');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    handleMenuClose();
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleRentOutClick = () => {
    navigate('/create_housing');
  };

  const open = Boolean(anchorEl);

  return (
    <header>
      <div>
        <Logo>Site logo</Logo>

        <StyleHeader spacing={2} direction="row" alignItems="center">
          {isUserHome && user ? (
            <>
              <StyleButton variant="text" onClick={handleRentOutClick} sx={{ position: 'relative', top: '-13px' }}>
                Rent out
              </StyleButton>
              {user.profilePicture ? (
                <Avatar
                  src={user.profilePicture}
                  alt={user.firstname || 'User'}
                  onClick={handleAvatarClick}
                  sx={{ cursor: 'pointer', width: 56, height: 56, position: 'relative', top: '-13px' }}
                />
              ) : (
                <Avatar
                  onClick={handleAvatarClick}
                  sx={{ cursor: 'pointer', bgcolor: 'grey.400', position: 'relative', top: '-13px' }}
                >
                  <AccountCircleIcon fontSize="large" />
                </Avatar>
              )}

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 4,
                  sx: menuStyles,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

                // 🔧 Отключаем автофокус, чтобы избежать фокуса в aria-hidden
                disableAutoFocusItem
                disableEnforceFocus
                disableRestoreFocus
                MenuListProps={{
                  autoFocus: false,
                }}
              >
                <MenuItem onClick={handleAccountClick}>Account Settings</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <StyleButton variant="text" onClick={handleRegisterClick}>
                Register
              </StyleButton>
              <StyleButton variant="text" onClick={handleSignInClick}>
                Sign in
              </StyleButton>
            </>
          )}
        </StyleHeader>
      </div>

      <Presentation />
      <SearchBlock />
    </header>
  );
}
