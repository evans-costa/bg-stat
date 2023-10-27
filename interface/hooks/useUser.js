import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

const protectedRoutes = ['/', '/signup'];

const UserContext = createContext({
  user: null,
  error: null,
  authUser: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  console.log(router);

  const authUser = useCallback(async () => {
    try {
      const response = await fetch('/api/user', { method: 'GET' });
      const responseBody = await response.json();

      if (response.status === 200) {
        const fetchedUser = responseBody;
        console.log(fetchedUser);
        const setUserObject = {
          id: responseBody.id,
          username: responseBody.username,
          email: responseBody.email,
        };

        setUser(fetchedUser);
        localStorage.setItem('user', JSON.stringify(setUserObject));
      }
    } catch (error) {
      console.log(error);
      setError(error);

      if (error.status >= 400) {
        setUser(null);
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  useEffect(() => {
    console.log('To aqui');
    if (!router || !protectedRoutes.includes(router.pathname)) return;

    (async () => {
      if (!user?.id || router.pathname !== '/') return;

      await router.replace('/boardgames');
    })();
  }, [user, router, authUser]);

  const contextValue = {
    user,
    error,
    authUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
