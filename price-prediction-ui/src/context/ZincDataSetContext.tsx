// context/ZincPriceContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ZincPriceData } from '@/model/interfaceZincPriceData';
import { calculateKPIs } from '../utils/calculateKPI'; // Ensure this utility function is defined
import fs from 'fs'
import Papa from 'papaparse'

interface ZincPriceContextType {
  data: ZincPriceData[] | null;
  kpis: any | null;
  loading: boolean;
  error: any;
}

const ZincPriceContext = createContext<ZincPriceContextType | undefined>(undefined);

export const ZincPriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ZincPriceData[] | null>(null);
  const [kpis, setKPIs] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch('/json/zinc-db-jun24.json'); // Your JSON file path
        const parsedData = await response.json();
        setData(parsedData);
        const calculatedKPIs = calculateKPIs(parsedData);
        setKPIs(calculatedKPIs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };  
    fetchData();
   

    // const csvFile = fs.readFileSync('/csv/output', 'utf8');

    // const parsedData = Papa.parse(csvFile, {
    // header: true,
    // dynamicTyping: true,
    // });

    // console.log(parsedData.data); 
  }, []);

  return (
    <ZincPriceContext.Provider value={{ data, kpis, loading, error }}>
      {children}
    </ZincPriceContext.Provider>
  );
};

export const useZincPriceData = () => {
  const context = useContext(ZincPriceContext);
  if (context === undefined) {
    throw new Error('useZincPriceData must be used within a ZincPriceProvider');
  }
  return context;
};
