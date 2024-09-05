// components/Layout.tsx
import React from 'react';
import { Inter, Roboto, Quicksand, Poppins, Montserrat } from 'next/font/google';
import { MainHeader } from '../header/main-header';
import { MainFooter } from '../footer/main-footer';


const inter = Inter({subsets:["latin"]});
const robo = Roboto({weight:['100','300','400','500','700'] , subsets:["latin"]});
const quicksand = Quicksand({subsets:["latin"]});
const poppins = Poppins({weight:['100','300','400','500','700'], subsets:["latin"]});
const montserrat = Montserrat({subsets:["latin"]});


interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={[inter.className, robo.className, quicksand.className, poppins.className, montserrat.className].join(' ') }>
      <header>
        <MainHeader/>
      </header>
      <main>{children}</main>
      <footer >
        <MainFooter/>
      </footer>
    </div>
  );
};

export default PageLayout;
