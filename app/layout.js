import '@/styles/globals.css';
import localFont from 'next/font/local';

const notoSans = localFont({
  src: '../public/fonts/noto-sans.ttf',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={notoSans.className}>
      <body>{children}</body>
    </html>
  );
}
