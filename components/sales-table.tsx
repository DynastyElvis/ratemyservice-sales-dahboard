"use client"

import { type SalesData, useData } from "@/contexts/data-context"

interface SalesTableProps {
  data: SalesData[]
  onEdit: (data: SalesData) => void
}

export default function SalesTable({ data, onEdit }: SalesTableProps) {
  const { deleteSalesData } = useData()

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      deleteSalesData(id)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.month}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.region}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.revenue.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.units}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-900">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
