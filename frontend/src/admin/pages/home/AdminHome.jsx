import React, { useEffect, useState } from "react";
import Loading from "../../../components/loading/Loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBookingCountByMonthYear } from "../../../service/bookingService";
import { getRevenueByMonthYear } from "../../../service/billService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [revenueData, setRevenueData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const years = Array.from(
    { length: 10 },
    (v, i) => new Date().getFullYear() - i
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const revenue = await Promise.all(
          months.map(async (month) => {
            const { data } = await getRevenueByMonthYear(month, year);
            return data;
          })
        );

        const revenueData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Revenue",
              data: revenue.map((data) => data.totalRevenue),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Room Price",
              data: revenue.map((data) => data.totalRoomCharge),
              backgroundColor: "rgba(255, 205, 86, 0.2)",
              borderColor: "rgba(255, 205, 86, 1)",
              borderWidth: 1,
            },
          ],
        };

        const booking = await Promise.all(
          months.map(async (month, index) => {
            const { data } = await getBookingCountByMonthYear(month, year);

            return data;
          })
        );

        const bookingData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Total Bookings",
              data: booking.map((data) => data.totalBookingCount),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Canceled Bookings",
              data: booking.map((data) => data.canceledBookingCount),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        };

        setRevenueData(revenueData);
        setBookingData(bookingData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [year]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="text-[40px] font-semibold text-gray-600 mb-8">
        Dashboard
      </div>
      <div className="mb-4">
        <label className="mr-2">Year:</label>
        <select
          className="border border-gray-300 rounded p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8">
        {revenueData && (
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `Monthly Revenue Statistics for ${year}`,
                },
              },
            }}
          />
        )}
      </div>
      <div className="mt-8">
        {bookingData && (
          <Bar
            data={bookingData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `Monthly Bookings Statistics for ${year}`,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default AdminHome;
