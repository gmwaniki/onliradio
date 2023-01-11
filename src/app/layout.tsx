import './globals.css';

import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import React from 'react';

import Providers from './providers';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${nunito.variable} `}>
      <head />
      <body className='relative'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Onliradio',
  description: 'Listen to over 30,000 radio station from over 200 countries',
};
