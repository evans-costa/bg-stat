import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

const UserContext = createContext({
  user: null,
  error: null,
  fetchUser: () => {},
});

const protectedRoutes = ['/', '/signup'];

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/user', { method: 'GET' });
      const responseBody = await response.json();

      if (response.status === 200) {
        const fetchedUser = responseBody;

        const setUserObject = {
          id: responseBody.id,
          username: responseBody.username,
          email: responseBody.email,
        };

        setUser(fetchedUser);
        localStorage.setItem('user', JSON.stringify(setUserObject));
      }

      if (response.status >= 400) {
        const error = new Error(responseBody.message);
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      setError(error);
      if (error.status >= 400) {
        setUser(null);
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  useEffect(() => {
    if (!router || !protectedRoutes.includes(router.pathname)) return;

    (async () => {
      if (!user?.id) await fetchUser();

      if (!user?.id || router.pathname !== '/') return;

      router.replace('/boardgames');
    })();
  }, [user, router, fetchUser]);

  const contextValue = {
    user,
    error,
    fetchUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
