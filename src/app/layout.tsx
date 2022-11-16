import './globals.css';
import React from 'react';
import { Nunito } from '@next/font/google';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={nunito.variable}>
      <head />
      <body className='relative bg-CustomBlack'>{children}</body>
    </html>
  );
}
