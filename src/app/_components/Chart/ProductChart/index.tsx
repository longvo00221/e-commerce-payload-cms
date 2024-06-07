import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ProductSellChartProps {
  data: { product: string; quantity: number }[]
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF6363',
  '#36A2EB',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FFCD56',
]

const ProductSellChart: React.FC<ProductSellChartProps> = ({ data }) => {
  const aggregatedData = data.reduce((acc, curr) => {
    const found = acc.find(item => item.name === curr.product)
    if (found) {
      found.value += curr.quantity
    } else {
      acc.push({ name: curr.product, value: curr.quantity })
    }
    return acc
  }, [] as { name: string; value: number }[])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={aggregatedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {aggregatedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ProductSellChart
