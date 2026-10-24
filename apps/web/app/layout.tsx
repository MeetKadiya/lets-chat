import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Let's Chat — Random Video Chat with New People",
  description: 'Meet new people. Have fun conversations. Fast, anonymous, and friendly random video chat.',
  icons: {
    icon: '/assets/logo/logo-bubble.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#E8F2DF] text-[#111111] antialiased selection:bg-[#65C93F] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
