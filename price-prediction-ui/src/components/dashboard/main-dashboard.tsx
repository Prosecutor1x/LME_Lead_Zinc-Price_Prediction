// pages/index.tsx
'use-client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ZincPriceChart from './sevendays-chart-dashboard';
import KpiDashboard from './kpis/main-kpi-dashboard';

interface PredictionData {
  Date: string;
  Predicted: number;
}

const MainDashboard: React.FC = () => {
  const [data, setData] = useState<PredictionData[] | null>(null);
  const [tmdata, setTmData] = useState<PredictionData[] | null>(null);
  const [madata, setMAData] = useState<PredictionData[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('7days'); // Default selection

  useEffect(() => {
    async function fetchData(option: string) {
      let url = '';
      switch (option) {
        case '7days':
          url = 'http://127.0.0.1:5000/model_prediction';
          break;
        case '3months':
          url = 'http://127.0.0.1:5000/model_3mprediction';
          break;
        case 'monthlyavg':
          url = 'http://127.0.0.1:5000/model_prediction_monthlyavg';
          break;
        default:
          return;
      }

      try {
        const response = await axios.get(url);
        const jsonData = JSON.parse(response.data);
        const parsedData: PredictionData[] = Object.keys(jsonData.Predicted).map(date => {
          const timestamp = parseInt(date); // Convert date string to Unix timestamp
          const formattedDate = new Date(timestamp).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }); // Format as DD-MM-YYYY
          return {
            Date: formattedDate,
            Predicted: jsonData.Predicted[date],
          };
        });

        switch (option) {
          case '7days':
            setData(parsedData);
            break;
          case '3months':
            setTmData(parsedData);
            break;
          case 'monthlyavg':
            setMAData(parsedData);
            break;
          default:
            return;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(selectedOption);
  }, [selectedOption]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <div className='p-4'>
        <h1 className='text-2xl font-bold text-center '>Prediction Charts</h1>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className='border-2 rounded-xl text-center font-semibold px-12 border-gray-100'>
          <option value="7days">7 Days Predicted Price</option>
          <option value="3months">Quaterly Predicted Price</option>
          <option value="monthlyavg">Monthly Average Predicted Price</option>
        </select>
      </div>

      {selectedOption === '7days' && <ZincPriceChart data={data} label='7 Days Predicted Price' title='7 Days Price'/>}
      {selectedOption === '3months' && tmdata && <ZincPriceChart data={tmdata} label='3 Months Predicted Price' title='Next Year Price'/>}
      {selectedOption === 'monthlyavg' && madata && <ZincPriceChart data={madata} label='Monthly Average Predicted Price' title='Monthly Average Price'/>}

      <KpiDashboard/>
    </div>
  );
};

export default MainDashboard;
