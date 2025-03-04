import React, { useEffect, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import apiClient, { generateLabels } from "../../../../lib/utils";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = ({range}) => {
const [salesData, setSalesData] = useState([]);

const labels = generateLabels(range)
const monthNames = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12'
}
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await apiClient.get({ url: `/shipping/getSales/${range}`,});

               // Convert API data to object for quick lookup
               const salesMap = res?.data?.reduce((acc, item) => {
                acc[item._id] = item.totalSales;
                return acc;
              }, {});
              // Fill missing data points with `0`
              const filledSalesData = labels.map((label) => (range.includes('d')?salesMap[label.split('-')[0]]||0:salesMap[monthNames[label]] || 0));
      
              setSalesData(filledSalesData);
      } catch (error) {
        console.log(error?.data?.message || "error");
      }
    };
    getAllProducts();
  }, [range]);


  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 1",
        data: salesData,
        borderColor: "#4F46E5",
        borderWidth: 1.4,
        backgroundColor: "rgb(79, 70, 229, 0.1)",
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
      },
      // {
      //   fill: true,
      //   label: "Dataset 2",
      //   data: [
      //     25000, 27000, 28000, 30000, 32000, 33000, 34000, 35000, 36000, 37000,
      //     38000, 39000,
      //   ],
      //   borderColor: "#818CF8",
      //   borderWidth: 1.4,
      //   backgroundColor: "rgb(79, 70, 229, 0.05)",
      //   tension: 0.4,
      //   pointRadius: 0,
      //   pointHitRadius: 10,
      // },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="w-full sm:h-[55vh] p-4">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
