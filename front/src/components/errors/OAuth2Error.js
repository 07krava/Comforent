// src/pages/OAuth2Error.jsx

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OAuth2Error() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const msg = params.get('message');
    setMessage(decodeURIComponent(msg || 'Авторизация через Google не удалась.'));
  }, [params]);

  return (
    <div style={{ padding: '2rem', color: 'red' }}>
      <h2>Ошибка авторизации</h2>
      <p>{message}</p>
      <a href="/">Вернуться на главную</a>
    </div>
  );
}
