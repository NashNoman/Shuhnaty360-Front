import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
);

const LineChartComponent = ({ data }: any) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        animations: { active: { duration: 10 } },
        callbacks: {
          label: function (context: any) {
            return `${context.raw} شحنة`;
          },
        },
      },
    },
    scales: {
      x: {
        offset: true,
        reverse: true,
        grid: {
          display: true,
        },
        ticks: {
          align: "center",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(221, 126, 31, 0.1)",
        },
        position: "right",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartComponent;
