import React, { useState, useEffect } from 'react';
import MonthlyRevenueChart from '../Chart';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productsInStock, setProductsInStock] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [completedInvoices, setCompletedInvoices] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          fetch('http://localhost:3000/api/products').then((res) => res.json()),
          fetch('http://localhost:3000/api/orders').then((res) => res.json()),
        ]);

        const years = new Set();
        let totalRev = 0;
        let pendingCount = 0;
        let completedCount = 0;
        const monthlyRev = new Array(12).fill(0);

        ordersResponse.docs.forEach((order) => {
          const orderYear = new Date(order.createdAt).getFullYear();
          years.add(orderYear);

          if (order.state === 'completed' && orderYear === selectedYear) {
            totalRev += order.total;
            completedCount++;
            const month = new Date(order.createdAt).getMonth();
            monthlyRev[month] += order.total;
          } else if (order.state === 'pending' && orderYear === selectedYear) {
            pendingCount++;
          }
        });

        setTotalRevenue(totalRev);
        setProductsInStock(productsResponse.totalDocs);
        setPendingInvoices(pendingCount);
        setCompletedInvoices(completedCount);

        const formattedMonthlyRev = monthlyRev.map((revenue, index) => ({
          month: index + 1,
          revenue,
        }));

        setMonthlyRevenue(formattedMonthlyRev);
        setAvailableYears(Array.from(years).sort((a:number, b:number) => b - a));

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="year-select" className="mr-2">Select Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Products in Stock</h2>
          <p className="text-2xl">{productsInStock}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Pending Invoices</h2>
          <p className="text-2xl">{pendingInvoices}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Completed Invoices</h2>
          <p className="text-2xl">{completedInvoices}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue for {selectedYear}</h2>
        <MonthlyRevenueChart data={monthlyRevenue} />
      </div>
    </div>
  );
};

export default Dashboard;
