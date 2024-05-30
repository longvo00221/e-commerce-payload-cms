import React, { useState, useEffect } from 'react';
import MonthlyRevenueChart from '../Chart';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productsInStock, setProductsInStock] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [completedInvoices, setCompletedInvoices] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          fetch('http://localhost:3000/api/products').then((res) => res.json()),
          fetch('http://localhost:3000/api/orders').then((res) => res.json()),
        ])
        let totalRev = 0;
        let pendingCount = 0;
        let completedCount = 0;
        const monthlyRev = new Array(12).fill(0);
        console.log(ordersResponse)
        ordersResponse.docs.forEach((order) => {
          if (order.state === 'completed') {
            totalRev += order.total;
            completedCount++;
            const month = new Date(order.createdAt).getMonth();
            monthlyRev[month] += order.total;
          } else if (order.state === 'pending') {
            pendingCount++;
          }
        });

        setTotalRevenue(totalRev);
        setProductsInStock(productsResponse.totalDocs);
        setPendingInvoices(pendingCount);
        setCompletedInvoices(completedCount);
        setMonthlyRevenue(monthlyRev);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
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
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
        <MonthlyRevenueChart data={monthlyRevenue} />
      </div>
    </div>
  );
};

export default Dashboard;
