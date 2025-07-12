import { useEffect, useState } from 'react';

export default function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Invalid user data in localStorage');
      }
    }
  }, []);

  return user;
}
