import React from 'react';
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
import { Line } from 'react-chartjs-2';  
import { useSelector } from 'react-redux';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Service',
    },
  },
};
 


export function ChartService() { 
  
  const chartService = useSelector((state: any) => state.trainer.chartService);

  if (!chartService || !chartService.labels || !chartService.datasets) {
    return <div>Loading...</div>;  
  }

  const chartServiceCopy = {
    ...chartService,
    datasets: chartService.datasets.map((dataset: any) => ({
      ...dataset,
      data: [...dataset.data],  
    })),
  };

  return <Line className='bg-white' options={options} data={chartServiceCopy} />;
}