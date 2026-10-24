import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Let's Chat — Anonymous Text & Video Chat",
  description: 'Meet strangers with shared interests safely and anonymously.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#070A11] obsidian-bg text-slate-100 antialiased selection:bg-cyan-500 selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
