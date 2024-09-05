import type { Metadata } from 'next';
import { Inter, Roboto, Quicksand, Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import React from 'react';
import { ZincPriceProvider } from '@/context/ZincDataSetContext';

const inter = Inter({subsets:["latin"]});
const robo = Roboto({weight:['100','300','400','500','700'] , subsets:["latin"]});
const quicksand = Quicksand({subsets:["latin"]});
const poppins = Poppins({weight:['100','300','400','500','700'], subsets:["latin"]});
const montserrat = Montserrat({subsets:["latin"]});

export const metadata: Metadata = {
  title: 'Price Prediction',
  description: 'Check the commodity prices',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[inter.className, robo.className, quicksand.className, poppins.className, montserrat.className].join(' ')}>
      <ZincPriceProvider>

        {children}
      </ZincPriceProvider>
      </body>
    </html>
  );
}
