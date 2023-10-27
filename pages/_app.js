import "../styles/globals.css";
import { UserProvider } from "../interface/hooks/useUser.js";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
