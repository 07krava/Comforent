import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import HeaderRegister from '../HeaderRegister/HeaderRegister';
import {
  TextField,
  Typography,
  Button,
  Divider,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Footer from '../../Footer/Footer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { validateEmail, validatePassword } from '../../../utils/validations';

const PageWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const CenteredContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
}));

const TextFieldStyle = styled(TextField)(() => ({
  width: '300px',
  marginBottom: '15px',
  '& .MuiInputBase-root': {
    height: '40px',
    top: '7px',
  },
}));

const FormStyle = styled('form')(() => ({
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ContinueButton = styled(Button)(() => ({
  background: '#1e90ff',
  marginTop: '10px',
  width: '300px',
  color: '#fff',
  fontFamily: 'Montserrat',
  textTransform: 'none',
  '&:hover': {
    background: '#1c86ee',
  },
}));

const GoogleButton = styled(Button)(() => ({
  background: '#1e90ff',
  marginTop: '10px',
  width: '300px',
  color: '#fff',
  fontFamily: 'Montserrat',
  textTransform: 'none',
  '&:hover': {
    background: '#1c86ee',
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 🔥 обязательно!
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        // localStorage.setItem('jwt_token', data.token);
        alert('Login successful!');
        window.location.href = '/user-home';
      } else {
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
      }
    } catch (error) {
      alert('Error during login');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <PageWrapper>
      <HeaderRegister />
      <CenteredContainer>
        <FormStyle onSubmit={handleSignIn}>
          <Typography
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Sign in or create an account
          </Typography>

          <TextFieldStyle
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
          <TextFieldStyle
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ContinueButton type="submit">Continue with email</ContinueButton>

          <Divider style={{ width: '300px', margin: '30px 0' }}>or</Divider>

          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            Sign in with Google
          </Typography>

          <GoogleButton onClick={handleGoogleLogin}>
            Continue with Google
          </GoogleButton>
        </FormStyle>
      </CenteredContainer>
      <Footer />
    </PageWrapper>
  );
}
