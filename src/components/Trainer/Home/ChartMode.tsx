import React, { useEffect } from 'react';
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
      text: 'Mode',
    },
  },
};
 


export function ChartMode() { 
  
  const chartMode = useSelector((state: any) => state.trainer.chartMode);

  if (!chartMode || !chartMode.labels || !chartMode.datasets) {
    return <div>Loading...</div>;  
  }

  const chartModeCopy = {
    ...chartMode,
    datasets: chartMode.datasets.map((dataset: any) => ({
      ...dataset,
      data: [...dataset.data], // Create a new reference for data array
    })),
  };

  return <Line className='bg-white' options={options} data={chartModeCopy} />;
}