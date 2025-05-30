"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { useState } from "react"
import type { SalesData } from "@/contexts/data-context"

interface SalesChartProps {
  data: SalesData[]
}

export default function SalesChart({ data }: SalesChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  const chartData = data.map((item) => ({
    month: item.month,
    revenue: item.revenue,
    units: item.units,
  }))

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType("line")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === "line" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === "bar" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bar Chart
          </button>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? `$${Number(value).toLocaleString()}` : value,
                  name === "revenue" ? "Revenue" : "Units Sold",
                ]}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={3}
                name="Revenue ($)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="units"
                stroke="#10B981"
                strokeWidth={3}
                name="Units Sold"
              />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? `$${Number(value).toLocaleString()}` : value,
                  name === "revenue" ? "Revenue" : "Units Sold",
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
              <Bar yAxisId="right" dataKey="units" fill="#10B981" name="Units Sold" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
