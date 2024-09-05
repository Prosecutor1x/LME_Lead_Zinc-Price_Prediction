// components/ZincPriceChart.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ZincPriceChartProps {
  data: { Date: string; Predicted: number }[];
  title:string,
  label:string
}

const ZincPriceChart: React.FC<ZincPriceChartProps> = ({ data,title,label }) => {
  const chartData = {
    labels: data.map(item => item.Date),
    datasets: [
      {
        label: label,
        data: data.map(item => item.Predicted),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)', // Blue color for the line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color for the fill under the line
        pointBorderColor: 'rgba(54, 162, 235, 1)', // Blue color for the points
        pointBackgroundColor: 'rgba(225, 99, 132, 1)', // Red color for the point background
        pointRadius: 4,
        pointHoverRadius: 2,
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.2, // Smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Lead Price Predictions',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: 'black',
          font: {
            size: 10,
            weight: 'bold' as const,
          },
        },
        grid: {
          display: true,
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Predicted Price',
          color: 'black',
          font: {
            size: 10,
            weight: 'bold' as const,
          },
        },
        grid: {
          display: true,
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1,
        },
      },
    },
  };

  return (
    <div className='flex flex-col justify-center items-center px-24'>
      <h2 className='text-center text-bold text-xl'>{title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ZincPriceChart;
