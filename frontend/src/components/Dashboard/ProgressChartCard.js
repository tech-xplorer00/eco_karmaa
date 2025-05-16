import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChartCard = () => {
  // Sample data for the chart
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Carbon Saved (kg)',
        data: [3, 5, 2, 8, 6, 7, 4],
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  // Chart configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const handleTimeframeChange = (e) => {
    // In a real app, you would fetch new data based on the selected timeframe
    console.log('Timeframe changed to:', e.target.value);
  };

  return (
    <div className="card card-wide">
      <div className="card-header">
        <h2 className="card-title">
          <FontAwesomeIcon icon={faChartBar} />
          Your Impact
        </h2>
        <select id="chart-timeframe" onChange={handleTimeframeChange}>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProgressChartCard;