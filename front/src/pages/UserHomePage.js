import React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useAuthUser from '../components/hooks/useAuthUser';

const theme = createTheme();

export default function UserHomePage() {
  const { user, loading } = useAuthUser();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // отправляем cookie
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      window.location.href = '/'; // редирект после выхода
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <Header isUserHome={true} user={user} onLogout={handleLogout} />
      <Footer />
    </ThemeProvider>
  );
}
