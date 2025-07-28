import React from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const theme = createTheme();

export default function HomePage() {

  return (
    <ThemeProvider theme={theme}>
        <Header />
        <Footer />
    </ThemeProvider>
  )
}
