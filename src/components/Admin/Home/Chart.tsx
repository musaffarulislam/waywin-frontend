import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';  
import { useSelector } from 'react-redux';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
 


export function Chart() { 
  
  const chartData = useSelector((state: any) => state.admin.chartData);

  if (!chartData || !chartData.labels || !chartData.datasets) {
    return <div>Loading...</div>;  
  }

  const chartDataCopy = {
    ...chartData,
    datasets: chartData.datasets.map((dataset: any) => ({
      ...dataset,
      data: [...dataset.data], // Create a new reference for data array
    })),
  };

  return <Bar className='bg-white' options={options} data={chartDataCopy} />;
}