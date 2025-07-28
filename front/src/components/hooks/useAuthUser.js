import { useState, useEffect } from 'react';

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/user/me', {
          method: 'GET',
          credentials: 'include', // 🔥 Ключевой момент — чтобы cookie отправилась
        });

        if (res.ok) {
          const data = await res.json();
          console.log('User from cookie:', data);
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Fetch user failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
