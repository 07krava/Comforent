
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

