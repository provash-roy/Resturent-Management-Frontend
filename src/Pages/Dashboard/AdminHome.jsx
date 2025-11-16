import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// React Chart.js
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Admin stats
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Category-wise sales chart
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchCategorySales = async () => {
      try {
        const res = await axiosSecure.get("/category-sales"); // backend route

        // 5 fixed categories
        const allCategories = ["pizza", "soups", "salad", "drink", "dessert"];

        const salesData = res.data;

        const soldCount = allCategories.map((cat) => {
          const found = salesData.find((item) => item._id === cat);
          return found ? found.totalSold : 0;
        });

        setChartData({
          labels: allCategories.map(
            (c) => c.charAt(0).toUpperCase() + c.slice(1)
          ),
          datasets: [
            {
              data: soldCount,
              backgroundColor: "rgba(255, 165, 0, 0.7)",
              borderColor: "rgba(255, 140, 0, 1)",
              borderWidth: 1,
              barThickness: 25,
              maxBarThickness: 35,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategorySales();
  }, [axiosSecure]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Remove legend
      title: {
        display: true,
        text: "Category-wise Product Sales",
        font: { size: 18, weight: "bold" },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#FF8C00",
        font: { weight: "bold", size: 14 },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 14, weight: "bold" }, color: "#FF8C00" },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 14, weight: "bold" }, color: "#FF8C00" },
      },
    },
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6 text-orange-600 text-center">
        Hi, Welcome Back {user?.displayName || "Admin"}!
      </h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-orange-50 rounded-lg shadow-md p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="stat-title font-bold text-orange-700 text-lg mb-2">
            Total Users
          </div>
          <div className="stat-value text-orange-600 text-xl">
            {stats?.users || 0}
          </div>
        </div>
        <div className="stat bg-orange-50 rounded-lg shadow-md p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="stat-title font-bold text-orange-700 text-lg mb-2">
            Menu Items
          </div>
          <div className="stat-value text-orange-600 text-xl">
            {stats?.menuItems || 0}
          </div>
        </div>
        <div className="stat bg-orange-50 rounded-lg shadow-md p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="stat-title font-bold text-orange-700 text-lg mb-2">
            Orders
          </div>
          <div className="stat-value text-orange-600 text-xl">
            {stats?.orders || 0}
          </div>
        </div>
        <div className="stat bg-orange-50 rounded-lg shadow-md p-8 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300 text-center">
          <div className="stat-title font-bold text-orange-700 text-lg mb-2">
            Revenue
          </div>
          <div className="stat-value text-orange-600 text-xl">
            ${stats?.revenue?.toFixed(2) || "0.00"}
          </div>
        </div>
      </div>

      {/* Category Sales Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md h-[400px] md:h-[350px]">
        <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default AdminHome;
