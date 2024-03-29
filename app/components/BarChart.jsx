import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

const BarChart = ({ data, options }) => {

  ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
  
  return <Bar data={data} options={options} />;
};

export default BarChart;