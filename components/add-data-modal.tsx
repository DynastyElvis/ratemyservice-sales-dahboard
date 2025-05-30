"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/contexts/data-context"

interface AddDataModalProps {
  onClose: () => void
}

export default function AddDataModal({ onClose }: AddDataModalProps) {
  const { addSalesData } = useData()
  const [formData, setFormData] = useState({
    month: "",
    product: "",
    region: "",
    revenue: "",
    units: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addSalesData({
      month: formData.month,
      product: formData.product,
      region: formData.region,
      revenue: Number.parseInt(formData.revenue),
      units: Number.parseInt(formData.units),
    })

    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Sales Record</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select name="month" value={formData.month} onChange={handleChange} className="form-input" required>
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select name="product" value={formData.product} onChange={handleChange} className="form-input" required>
              <option value="">Select Product</option>
              <option value="Laptops">Laptops</option>
              <option value="Tablets">Tablets</option>
              <option value="Phones">Phones</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select name="region" value={formData.region} onChange={handleChange} className="form-input" required>
              <option value="">Select Region</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($)</label>
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter revenue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Units Sold</label>
            <input
              type="number"
              name="units"
              value={formData.units}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter units sold"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-success flex-1">
              Add Record
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
