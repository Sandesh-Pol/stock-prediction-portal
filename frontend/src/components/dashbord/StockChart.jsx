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
  
  const StockChart = ({ closePrice, ma100, ma200 }) => {
    // Generate labels for the data points
    const labels = closePrice.map((_, index) => `Day ${index + 1}`);
  
    const data = {
      labels,
      datasets: [
        {
          label: 'Close Price',
          data: closePrice,
          borderColor: 'hsl(var(--chart-primary))',
          backgroundColor: 'hsl(var(--chart-primary) / 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'MA 100',
          data: ma100,
          borderColor: 'hsl(var(--chart-ma100))',
          backgroundColor: 'hsl(var(--chart-ma100) / 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'MA 200',
          data: ma200,
          borderColor: 'hsl(var(--chart-ma200))',
          backgroundColor: 'hsl(var(--chart-ma200) / 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
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
            maxTicksLimit: 10,
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
      elements: {
        point: {
          hoverBackgroundColor: 'hsl(var(--primary))',
        },
      },
    };
  
    return (
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default StockChart;