import React, { useRef, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Avatar, Box } from '@mui/material';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import AccountSettingsHeader from '../components/Header/AccountSettingsHeader';

const theme = createTheme();

export default function AccountSetting() {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef();

  // Получаем текущий userId и аватар с backend
  useEffect(() => {
    axios.get('/api/users/me', {
      withCredentials: true, // чтобы отправить cookie
    })
    .then(res => {
       console.log("Профиль пользователя:", res.data); // ← Посмотри, как выглядит объект
      setAvatar(res.data.profilePicture); // ссылка на изображение
    })
    .catch(err => console.error("Ошибка загрузки профиля", err));
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`/api/users/me/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
          withCredentials: true
      });

      // Обновим превью (можно также взять из ответа, если backend возвращает URL)
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);

    } catch (err) {
      console.error("Ошибка загрузки файла", err);
      alert("Ошибка загрузки изображения");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <AccountSettingsHeader />
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Avatar
          alt="User Avatar"
          src={avatar}
          sx={{ width: 120, height: 120, margin: '0 auto' }}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{ mt: 2 }}
        >
          Загрузить фото
        </Button>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
