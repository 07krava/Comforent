import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('jwt_token', token);
      // Можно вызвать API для загрузки профиля и т.п.
      navigate('/'); // редирект куда надо
    } else {
      // Если токена нет — можно редиректить на страницу логина
      navigate('/signin');
    }
  }, [navigate]);

  return <div>Loading...</div>;
}
