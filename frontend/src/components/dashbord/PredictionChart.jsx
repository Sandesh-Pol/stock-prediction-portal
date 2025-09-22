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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const PredictionChart = ({ labels, data }) => {
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Predicted Prices',
          data,
          borderColor: 'hsl(var(--chart-prediction))',
          backgroundColor: 'hsl(var(--chart-prediction) / 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: 'hsl(var(--chart-prediction))',
          pointBorderColor: 'hsl(var(--background))',
          pointBorderWidth: 2,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'hsl(var(--foreground))',
            usePointStyle: true,
            padding: 20,
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'hsl(var(--chart-grid))',
          },
          ticks: {
            color: 'hsl(var(--muted-foreground))',
            maxTicksLimit: 8,
          },
        },
        y: {
          grid: {
            color: 'hsl(var(--chart-grid))',
          },
          ticks: {
            color: 'hsl(var(--muted-foreground))',
          },
        },
      },
      interaction: {
        intersect: false,
      },
    };
  
    return (
      <div className="h-80 w-full">
        <Line data={chartData} options={options} />
      </div>
    );
  };
  
  export default PredictionChart;