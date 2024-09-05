// components/ZincPriceChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';

interface ZincPriceChartProps {
  data: { date: string; lmeZinc: number }[];
  title: string;
  label: string;
}

const ZincPriceChart: React.FC<ZincPriceChartProps> = ({
  data,
  title,
  label,
}) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: label,
        data: data.map((item) => item.lmeZinc),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)', // Blue color for the line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color for the fill under the line
        pointBorderColor: 'rgba(54, 162, 235, 1)', // Blue color for the points
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Red color for the point background
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(54, 162, 235, 1)',
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        color: 'rgba(54, 162, 235, 1)',
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(54, 162, 235, 1)',
        },
        grid: {
          color: 'rgba(54, 162, 235, 0.2)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(54, 162, 235, 1)',
        },
        grid: {
          color: 'rgba(54, 162, 235, 0.2)',
        },
      },
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ZincPriceChart;
