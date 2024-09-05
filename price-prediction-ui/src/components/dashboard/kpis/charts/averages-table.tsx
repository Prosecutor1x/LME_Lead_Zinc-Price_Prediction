import React, { useEffect, useState } from 'react';
import { KPI_monthwise ,KPI_monthwise_lead} from '../../../../model/interfaceZincPricesKpis';
import axios from 'axios';

const KPITable: React.FC = () => {
  const [kpis, setKpis] = useState<KPI_monthwise_lead[]>([]);
  const [showMore1, setShowMore1] = useState<boolean>(false); // State to manage show more/less for first table
  const [showMore2, setShowMore2] = useState<boolean>(false); // State to manage show more/less for second table

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/calculate_kpis');
        // Sort data by date descending
        const sortedData = response.data.sort((a: KPI_monthwise, b: KPI_monthwise) =>
          new Date(b.month).getTime() - new Date(a.month).getTime()
        );
        setKpis(sortedData);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      }
    };

    fetchKpis();
  }, []);

  // Toggle show more/less for first table
  const toggleShowMore1 = () => {
    setShowMore1(!showMore1);
  };

  // Toggle show more/less for second table
  const toggleShowMore2 = () => {
    setShowMore2(!showMore2);
  };

  // Function to render rows based on showMore state for first table
  const renderRows1 = () => {
    if (showMore1) {
      return kpis.map((kpi, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 text-center' : 'bg-white text-center'}>
          {/* <td className="py-2 px-4 border-b">{kpi?.month}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_zinc?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.max_zinc?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.min_zinc?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_zinc_3m?.toFixed(2)}</td> */}
          <td className="py-2 px-4 border-b">{kpi?.month}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_lead?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.max_lead?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.min_lead?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_lead_3m?.toFixed(2)}</td>
        </tr>
      ));
    } else {
      // Render only first 5 rows
      return kpis.slice(0, 15).map((kpi, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 text-center' : 'bg-white text-center'}>
          <td className="py-2 px-4 border-b">{kpi?.month}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_lead?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.max_lead?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.min_lead?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_lead_3m?.toFixed(2)}</td>
        </tr>
      ));
    }
  };

  // Function to render rows based on showMore state for second table
  const renderRows2 = () => {
    if (showMore2) {
      return kpis.map((kpi, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 text-center' : 'bg-white text-center'}>
          <td className="py-2 px-4 border-b">{kpi?.month}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_stock?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.rolling_3m_avg?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.rolling_6m_avg?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.ytd_avg?.toFixed(2)}</td>
        </tr>
      ));
    } else {
      // Render only first 5 rows
      return kpis.slice(0, 15).map((kpi, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 text-center' : 'bg-white text-center'}>
          <td className="py-2 px-4 border-b">{kpi?.month}</td>
          <td className="py-2 px-4 border-b">{kpi?.avg_stock?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.rolling_3m_avg?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.rolling_6m_avg?.toFixed(2)}</td>
          <td className="py-2 px-4 border-b">{kpi?.ytd_avg?.toFixed(2)}</td>
        </tr>
      ));
    }
  };

  return (
    <div className="overflow-x-auto flex flex-col items-center ">
      <table className="min-w-full bg-white border mt-4">
        <thead className='bg-blue-200 text-center'>
          <tr>
            <th className="py-2 px-4 border-b">Month</th>
            <th className="py-2 px-4 border-b">Monthly Average Lead Price</th>
            <th className="py-2 px-4 border-b">Monthly Highest Lead Price</th>
            <th className="py-2 px-4 border-b">Monthly Lowest Lead Price</th>
            <th className="py-2 px-4 border-b">Monthly Average 3-Month Lead Price</th>
          </tr>
        </thead>
        <tbody>
          {renderRows1()}
        </tbody>
      </table>

      {/* Show more button for first table */}
      {kpis.length > 5 && (
        <button className="px-3 py-1 bg-blue-800 text-white font-semibold rounded-3xl border-blue-400 border-2 m-2 hover:bg-blue-200 hover:text-black block w-1/2"
          onClick={toggleShowMore1}>
          {showMore1 ? 'Show Less' : 'Show More'}
        </button>
      )}

      <table className="min-w-full bg-white mt-4  border ">
        <thead className='bg-blue-200 text-center'>
          <tr>
            <th className="py-2 px-4 border-b">Month</th>
            <th className="py-2 px-4 border-b">Monthly Average Lead Stock</th>
            <th className="py-2 px-4 border-b">Rolling 3-Month Average Lead Price</th>
            <th className="py-2 px-4 border-b">Rolling 6-Month Average Lead Price</th>
            <th className="py-2 px-4 border-b">Year-to-Date Average Lead Price</th>
          </tr>
        </thead>
        <tbody>
          {renderRows2()}
        </tbody>
      </table>

      {/* Show more button for second table */}
      {kpis.length > 5 && (
        <button className="px-3 py-1 bg-blue-800 text-white font-semibold rounded-3xl border-blue-400 border-2 m-2 hover:bg-blue-200 hover:text-black"
          onClick={toggleShowMore2}>
          {showMore2 ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default KPITable;
