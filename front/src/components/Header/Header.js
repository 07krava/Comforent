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

const StyleButton = styled(Button)(({theme}) => ({
    color: '#222',
    fontFamily: 'Montserrat',
    textTransform: 'none',
    border: '1px solid #222',
    borderRadius: '14px',
}))

const StyleHeader = styled(Stack)(({theme}) => ({
    float: 'right',
    background: '#fff',
    margin: '50px',
}));

const Logo = styled('span')({
    fontWeight: '600',
    fontSize: '20px',
    margin: '50px',
    position: 'relative',
    top:'50px',
    bottom: '150px'
});

const Presentation = styled('div')({
    backgroundImage: `url(${backgroundImage})`,
    width: '100%',
    height: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center' ,
    backgroundBlendMode: 'multiply',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    top: '100px',
});

export default function Header({ isUserHome = false, user = null, onLogout }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    navigate('/account'); // если есть страница аккаунта
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    handleMenuClose();
  };

    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleSignInClick = () => {
        navigate('/signin');
    }
    const handleRentOutClick = () => {
        navigate('/create_housing');
    }

  return (
    <header>
        <div>
        <Logo>Site logo</Logo>
        <StyleHeader spacing={2} direction="row">
          {isUserHome && user ? (
            <>
              <Avatar
                src={user.avatarUrl || ''}
                alt={user.firstname || 'User'}
                onClick={handleAvatarClick}
                sx={{ cursor: 'pointer' }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleAccountClick}>Account Settings</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <StyleButton variant="text" onClick={handleRentOutClick}>Rent out</StyleButton>
              <StyleButton variant="text" onClick={handleRegisterClick}>Register</StyleButton>
              <StyleButton variant="text" onClick={handleSignInClick}>Sign in</StyleButton>
            </>
          )}
        </StyleHeader>
      </div>
        <Presentation />
      <SearchBlock />
    </header>
  )
}
