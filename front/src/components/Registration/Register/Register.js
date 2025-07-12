import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Typography, Button, } from '@mui/material';
import Footer from '../../Footer/Footer';
import HeaderRegister from '../HeaderRegister/HeaderRegister';
import AppleButton from '../../AppleRegButton/AppleButton';
import FaceBookButton from '../../FaceBookRegButton/FaceBookButton';
import GoogleButton from '../../GoogleRegButton/GoogleButton';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { isValidPhoneNumber, validateFirstName, validateLastName, validateEmail } from '../../../utils/validations';

const TextFieldStyle = styled(TextField)(({ theme }) => ({
    width: '300px',
    marginBottom: '15px',
    '& .MuiInputBase-root': {
        height: '40px',
        top: '7px',
    },
}))

const FormStyle = styled('form')(({ theme }) => ({
    width: '400px',
    maxWidth: '400px',
    height: '300px',
    right: '-760px',
    position: 'relative',
    top: '50px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
}))

const FooterContainer = styled('div')({
    marginLeft: '-80px',
    marginTop: '-20px',
});

const ContinueButton = styled(Button)(({ theme }) => ({
    background: '#1e90ff',
    marginTop: '10px',
    width: '300px',
    color: '#fff',
    fontFamily: 'Montserrat',
    textTransform: 'none',
    '&:hover': {
        background: '#1c86ee',
    }
}))

const LineDive = styled('div')(({ theme }) => ({
    marginTop: '10px',
    marginLeft: '30px',
}))

const IconContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
    marginLeft: '75px',
    marginTop: '10px',

}))

const IconStyle = styled('div')(({ theme }) => ({
    marginTop: '10px',
    border: '1px solid #e9e9e9',
    fontSize: '20px',
    padding: '10px',
    color: '#1773cd',
}))

export default function Register() {
   const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  // Можно добавить пароль ошибку при необходимости

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Валидация и установка ошибки для каждого поля
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(validateFirstName(value));
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(validateLastName(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Можно добавить валидацию пароля
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (!isValidPhoneNumber(value)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Перед отправкой формы проверяем все ошибки:
    const fnError = validateFirstName(firstName);
    const lnError = validateLastName(lastName);
    const emError = validateEmail(email);
    const phError = isValidPhoneNumber(phone) ? '' : 'Invalid phone number';

    setFirstNameError(fnError);
    setLastNameError(lnError);
    setEmailError(emError);
    setPhoneError(phError);

    if (fnError || lnError || emError || phError) {
      // Если есть ошибки — не отправляем форму
      alert('Please fix the errors in the form');
      return;
    }

    const updatedRequestBody = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      phone: phone,
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRequestBody),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Registration successful!');
        navigate('/');
      } else {
        const errorText = await response.text();
        alert(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      alert('Error during registration');
    }
  };

    return (
        <div>
            <HeaderRegister />
            <FormStyle>
                <Typography style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }}>
                    Sign in or create an account
                </Typography>

                {/* First name field*/}
                <Typography style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }}>
                    First name
                </Typography>
               <TextFieldStyle
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    error={!!firstNameError}
                    helperText={firstNameError}
                    name="firstname"
                />

                {/* Last name field*/}
                <Typography style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }}>
                    Last name
                </Typography>
                <TextFieldStyle
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    error={!!lastNameError}
                    helperText={lastNameError}
                    name="lastname"
                />

                {/* Email field*/}
                <Typography style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }}>
                    Email address
                </Typography>
                <TextFieldStyle
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                    name="email"
                />

                {/* Password field*/}
                <Typography style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }}>
                    Password
                </Typography>
                <TextFieldStyle
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
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

                {/* Phone field*/}
                <Typography style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }}>
                    Phone number
                </Typography>
               <TextFieldStyle
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={!!phoneError}
                    helperText={phoneError}
                    name="phone"
                />
                <ContinueButton onClick={handleRegister}>
                    Continue with email
                </ContinueButton>
                <div style={{
                    marginLeft: '-70px',
                }}>
                    <LineDive>
                        __________ or use one of these options __________
                    </LineDive>
                    <IconContainer>
                        <IconStyle>
                            <FaceBookButton />
                        </IconStyle>
                        <IconStyle>
                            <GoogleButton />
                        </IconStyle>
                        <IconStyle>
                            <AppleButton />
                        </IconStyle>
                    </IconContainer>
                    <LineDive>
                        ________________________________________________
                    </LineDive>

                </div>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </FormStyle>
        </div>
    )
}
