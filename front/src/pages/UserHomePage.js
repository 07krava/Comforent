import React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useAuthUser from '../hooks/useAuthUser';

const theme = createTheme();

export default function UserHomePage() {
  const user = useAuthUser();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    window.location.href = '/signin'; // или navigate('/signin')
  };

  return (
    <ThemeProvider theme={theme}>
      <Header isUserHome={true} user={user} onLogout={handleLogout} />
      <Footer />
    </ThemeProvider>
  );
}

