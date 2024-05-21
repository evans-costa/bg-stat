import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

const UserContext = createContext({
  user: null,
  error: null,
  fetchUser: () => {},
});

const protectedRoutes = ['/', '/signup'];

export function UserProvider({ children }) {
  let sessionRef = useRef(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/user', { method: 'GET' });
      const responseBody = await response.json();

      if (response.status === 200) {
        console.log(responseBody);

        const fetchedUser = responseBody.user;
        const fetchedSession = responseBody.session_id;

        const setUserObject = {
          id: responseBody.user.id,
          username: responseBody.user.username,
          email: responseBody.user.email,
        };

        setUser(fetchedUser);
        sessionRef = fetchedSession;

        localStorage.setItem('user', JSON.stringify(setUserObject));
      }

      if (response.status >= 400) {
        const error = new Error(responseBody.message);
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      setError(error);

      if (error.message === 'jwt expired') {
        await refreshSession(sessionRef);
      }

      if (error.status >= 400) {
        setUser(null);
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  const refreshSession = useCallback(
    async (session) => {
      try {
        console.log(session);
        const response = await fetch('/api/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: session.current }),
        });

        const data = await response.json();

        if (response.status === 200) {
          await fetchUser();
          return;
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    [fetchUser],
  );

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
