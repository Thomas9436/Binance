import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { formatISO9075 } from "date-fns";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export function CryptoChart() {
  const selectedCoin = useSelector((state) => state.crypto.selectedCoin);
  const selectedDevise = useSelector((state) => state.crypto.selectedDevise);
  const tickers = useSelector((state) => state.crypto.tickers);

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const tickerKey = `${selectedCoin}${selectedDevise}`.toUpperCase();
    const tickerHistory = tickers[tickerKey]?.history;

    if (tickerHistory) {
      const chartDataPoints = tickerHistory.map(({ timestamp, price }) => ({
        x: formatISO9075(new Date(timestamp)),
        y: price,
      }));
      console.log(chartDataPoints);

      setChartData({
        datasets: [
          {
            label: tickerKey,
            data: chartDataPoints,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      });
    }
  }, [selectedCoin, selectedDevise, tickers]);

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: "dd/MM/yyyy HH:mm:ss",
          displayFormats: {
            minute: "HH:mm",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Prix",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "400px", width: "750px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
