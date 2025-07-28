import React from 'react'
import './Footer.css';
import { styled } from '@mui/material/styles';

const FooterStyle = styled('footer')({
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '20px',
    position: 'relative',
    bottom: '-50px'
});


export default function Footer() {
  return (
    <FooterStyle>Developed by Dmytro Kravchuk &copy;</FooterStyle>
  )
}
