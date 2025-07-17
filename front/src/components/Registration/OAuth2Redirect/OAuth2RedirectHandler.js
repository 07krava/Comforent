// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export default function OAuth2RedirectHandler() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const token = params.get('token');

//     if (token) {
//       localStorage.setItem('jwt_token', token);
//       // Можно здесь дополнительно запросить user info, если нужно
//       navigate('/user-home'); // или другая защищённая страница
//     } else {
//       // Ошибка - нет токена, возвращаем на страницу входа
//       navigate('/signin');
//     }
//   }, [location, navigate]);

//   return <div>Redirecting...</div>;
// }

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Просто редиректим пользователя на защищённую страницу
    navigate('/user-home');
  }, [navigate]);

  return <div>Redirecting...</div>;
}

