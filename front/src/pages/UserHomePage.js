import React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useAuthUser from '../components/hooks/useAuthUser';

const theme = createTheme();

export default function UserHomePage() {
  const { user, loading } = useAuthUser();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    window.location.href = '/';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <Header isUserHome={true} user={user} onLogout={handleLogout} />
      <Footer />
    </ThemeProvider>
  );
}
