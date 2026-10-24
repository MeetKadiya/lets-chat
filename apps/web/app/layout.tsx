import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'mingleo — Meet strangers. Make connections.',
  description: 'A playful cartoon-style social discovery platform to meet new people through random video conversations and shared interests.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FFF9ED] text-[#252820] antialiased selection:bg-[#65A843] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
