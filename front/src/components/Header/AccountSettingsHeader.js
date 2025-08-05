import React from 'react'
import { styled } from '@mui/material/styles';
import {Typography, } from '@mui/material';
import { Link } from 'react-router-dom';


const MainDiv = styled('div')(({ theme }) => ({
  background: '#e9e9e9',
  height: '100px',
}))

export default function AccountSettingsHeader() {
  return (
    <div>
      <MainDiv>
        <div style={{
          marginLeft: '200px',
          padding: '25px',
          paddingTop: '40px',          
        }}>
          <Link to="/user-home" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography style={{
        fontWeight: '600',
        fontSize: '20px',
        fontFamily: 'Montserrat',
        }}>
            Site Label
        </Typography>
        </Link>
        </div>
      </MainDiv>
    </div>
  );
}
