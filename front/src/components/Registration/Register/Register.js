import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Typography, Button, } from '@mui/material';
import Footer from '../../Footer/Footer';
import HeaderRegister from '../HeaderRegister/HeaderRegister';
import AppleButton from '../../AppleRegButton/AppleButton';
import FaceBookButton from '../../FaceBookRegButton/FaceBookButton';
import GoogleButton from '../../GoogleRegButton/GoogleButton';
import { useNavigate } from 'react-router-dom';

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
    //border: '1px solid black',
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
    marginTop: '-20px', // поднимаем на 10 пикселей
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
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();


    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameCharge = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailCharge = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePhoneCharge = (e) => {
        setPhone(e.target.value);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        // Находим ближайшую к кнопке "Continue with email" форму
        const form = e.target.closest("form");
        const formData = new FormData(form);

        const updatedRequestBody = {
            firstname: formData.get('firstname') || firstName,
            lastname: formData.get('lastname') || lastName,
            email: formData.get('email') || email,
            password: formData.get('password') || password,
            phone: formData.get('phone') || phone,
        };

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRequestBody),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                alert('Registration successful!');
                navigate('/')
            } else {
                const errorText = await response.text();
                console.error('Registration failed:', errorText);
                alert(`Registration failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
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
                    placeholder="Enter your first name" // Используем placeholder вместо label
                    value={firstName} // Привязываем значение поля к состоянию
                    onChange={handleFirstNameChange} // Отслеживаем изменения в поле
                >
                </TextFieldStyle>

                {/* Last name field*/}
                <Typography style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }}>
                    Last name
                </Typography>
                <TextFieldStyle
                    placeholder='Enter your last name'
                    value={lastName}
                    onChange={handleLastNameCharge}
                >
                </TextFieldStyle>

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
                    onChange={handleEmailCharge}
                >
                </TextFieldStyle>

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
                    value={password}
                    onChange={handlePasswordChange}
                >
                </TextFieldStyle>

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
                    onChange={handlePhoneCharge}
                >
                </TextFieldStyle>

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
