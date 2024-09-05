import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';

interface ZincPriceChartProps {
    data: { Date: string; Predicted: number }[];
  }

const ZincPriceChart2 : React.FC<ZincPriceChartProps> = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Zinc Price Predictions',
    },
    rangeSelector: {
      selected: 1,
    },
    series: [{
      name: 'Zinc Price',
      data: data.map(item => [new Date(item.Date).getTime(), item.Predicted]),
      tooltip: {
        valueDecimals: 2,
      },
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default ZincPriceChart2;