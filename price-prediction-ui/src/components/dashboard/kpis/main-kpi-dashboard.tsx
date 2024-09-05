// app/page.tsx
import React, { useEffect, useState } from 'react';
import { useZincPriceData } from '../../../context/ZincDataSetContext';
import ZincPriceChart from '../kpis/chart-kpi';
import moment from 'moment';
import { ZincPriceData } from '@/model/interfaceZincPriceData';
import { KpiData } from '@/model/interfaceZincPricesKpis';
import KPIChart from './charts/averages-charts';
import KPITable from './charts/averages-table';

const Dashboard: React.FC = () => {
  const { data,kpis , loading, error } = useZincPriceData();
  const [dataset,setDataset]=useState<KpiData|null>()
  const [lastYearTodayPrice,setlastYearTodayPrice]=useState<number|null>()
  const  dateToday= moment().format('YYYY-MM-DD')
  // console.log(dateToday) 

  const lastYearThisDay=moment().subtract(356,"days").format('YYYY-MM-DD')
  
  // console.log(lastYearThisDay )


  useEffect(()=>{
    const fetchKPIs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/kpis');
        if (!response.ok) {
          throw new Error('Failed to fetch KPIs');
        }
        const data = await response.json();
        setDataset(data);
      } catch (error:any) {
        console.log(error.message);
      }
    };

    fetchKPIs();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;
  const formatNumber = (number:number|null | undefined) => (number ? number.toFixed(2) : 'N/A');
  
  console.log(dataset)

  
      

  return (
    
    <div className="flex flex-col p-6 justify-center  ">
      <h2 className="text-2xl font-bold mb-4 text-center">KPI Section</h2>
      <div>
      <KPIChart/>
      </div>
    
    <div className="overflow-x-auto mt-24">
      <h3 className='text-center text-xl font-bold mb-4 '> Today's Metrics </h3>
      <table className="min-w-full bg-white border border-blue-200  shadow-md ">
        <thead className='text-center'>
          <tr className="bg-blue-200 ">
            <th className="py-3 px-6 text-left">KPI</th>
            <th className="py-3 px-6 ">Price[Dollar Per Ton]</th>
          </tr>
        </thead>
        <tbody className=''>
          <tr className="bg-blue-100">
            <td className="py-3 px-6 border-b border-blue-200">Last Month's Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200  text-center">{formatNumber(dataset?.lastMonthAvg)}</td>
          </tr>
          <tr className="bg-white">
            <td className="py-3 px-6 border-b border-blue-200">Same Month Last Year's Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.sameMonthLastYearAvg)}</td>
          </tr>
          <tr className="bg-blue-100">
            <td className="py-3 px-6 border-b border-blue-200">Last 3 Months Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.last3MonthsAvg)}</td>
          </tr>
          <tr className="bg-white">
            <td className="py-3 px-6 border-b border-blue-200">Same 3 Months Last Year's Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.same3MonthsLastYearAvg)}</td>
          </tr>
          <tr className="bg-blue-100">
            <td className="py-3 px-6 border-b border-blue-200">YTD Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.ytdAvg)}</td>
          </tr>
          <tr className="bg-white">
            <td className="py-3 px-6 border-b border-blue-200">YTD Last Year Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.ytdLastYearAvg)}</td>
          </tr>
          <tr className="bg-blue-100">
            <td className="py-3 px-6 border-b border-blue-200">Rolling 6 Months Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.rolling6MonthsAvg)}</td>
          </tr>
          <tr className="bg-white">
            <td className="py-3 px-6 border-b border-blue-200">Quarterly Average Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.quarterlyAvg)}</td>
          </tr>
          <tr className="bg-blue-100">
            <td className="py-3 px-6 border-b border-blue-200">Highest Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.highestPrice)}</td>
          </tr>
          <tr className="bg-white">
            <td className="py-3 px-6 border-b border-blue-200">Lowest Lead Price</td>
            <td className="py-3 px-6 border-b border-blue-200 text-center">{formatNumber(dataset?.lowestPrice)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 className='text-center text-xl font-bold m-4'> Monthly Metrics </h3>
    <KPITable/>
  </div>

  );
};

export default Dashboard;
