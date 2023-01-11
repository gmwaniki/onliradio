import './globals.css';

import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import AudioContextProvider from './AudioContext';
import { Metadata } from 'next';

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
      <body className='relative bg-CustomBlack'>
        <AudioContextProvider>{children}</AudioContextProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Onliradio',
  description: 'Listen to over 30,000 radio station from over 200 countries',
};
