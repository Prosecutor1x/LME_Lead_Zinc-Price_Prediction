import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

interface KPI {
  month: string;
  avg_lead: number;
  max_lead: number;
  min_lead: number;
  avg_lead_3m: number;
  avg_stock: number;
  rolling_3m_avg?: number;
  rolling_6m_avg?: number;
  ytd_avg: number;
}

interface KPIResponse {
  '1_month': KPI[];
  '3_months': KPI[];
  '6_months': KPI[];
  '1_year': KPI[];
  '2_years': KPI[];
  '5_years': KPI[];
}

const timeRanges = [
  { value: '1_month', label: '1 Month' },
  { value: '3_months', label: '3 Months' },
  { value: '6_months', label: '6 Months' },
  { value: '1_year', label: '1 Year' },
  { value: '2_years', label: '2 Years' },
  { value: '5_years', label: '5 Years' },
];

const kpiOptions = [
  { value: 'avg_lead', label: 'Average Lead' },
  { value: 'max_lead', label: 'Max Lead' },
  { value: 'min_lead', label: 'Min Lead' },
  { value: 'avg_lead_3m', label: 'Average Lead (3 Months)' },
  { value: 'avg_stock', label: 'Average Stock' },
  // { value: 'rolling_3m_avg', label: 'Rolling 3 Month Avg' },
  // { value: 'rolling_6m_avg', label: 'Rolling 6 Month Avg' },
  { value: 'ytd_avg', label: 'YTD Average' },
];

const KPIChart: React.FC = () => {
  const [kpis, setKpis] = useState<KPIResponse | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('1_month');
  const [selectedKPI, setSelectedKPI] = useState<string>('avg_lead');

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await axios.get<KPIResponse>('http://127.0.0.1:5000/kpism');
        console.log('Fetched KPIs:', response.data);
        setKpis(response.data);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      }
    };
    fetchKpis();
  }, []);

  if (!kpis) {
    return <div>Loading...</div>;
  }

  const selectedData = kpis[selectedTimeRange as keyof KPIResponse];
  console.log('Selected Data:', selectedData);

  const labels = selectedData.map((kpi) => kpi.month);
  const dataPoints = selectedData.map((kpi) => kpi[selectedKPI as keyof KPI]);

  console.log('Labels:', labels);
  console.log('Data Points:', dataPoints);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: kpiOptions.find((option) => option.value === selectedKPI)?.label,
        data: dataPoints,
        borderWidth: 2,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)', // Blue color for the line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color for the fill under the line
        pointBorderColor: 'rgba(54, 162, 235, 1)', // Blue color for the points
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Red color for the point background
        pointRadius: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.2, // Smooth curves
      },
    ],
  };

  console.log('Chart Data:', chartData);

  return (
    <div className="">
      <h2 className="text-xl text-center mb-4 font-bold">KPI Chart</h2>
      <div className="flex justify-center mb-4">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => setSelectedTimeRange(range.value)}
            className={`border-2 rounded-xl px-4 py-2 mx-2 font-semibold ${
              selectedTimeRange === range.value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
      <select
        onChange={(e) => setSelectedKPI(e.target.value)}
        value={selectedKPI}
        className="border-2 rounded-xl text-center font-semibold mb-4"
      >
        {kpiOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Line data={chartData} />
    </div>
  );
};

export default KPIChart;
