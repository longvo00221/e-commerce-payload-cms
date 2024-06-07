import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface MonthlyRevenueChartProps {
  data: { month: number; revenue: number }[]
}

const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" dot={{ strokeWidth: 2, r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MonthlyRevenueChart
