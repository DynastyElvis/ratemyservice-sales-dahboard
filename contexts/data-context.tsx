"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface SalesData {
  id: string
  month: string
  revenue: number
  units: number
  product: string
  region: string
}

interface DataContextType {
  salesData: SalesData[]
  addSalesData: (data: Omit<SalesData, "id">) => void
  updateSalesData: (id: string, data: Partial<SalesData>) => void
  deleteSalesData: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const initialData: SalesData[] = [
  { id: "1", month: "January", revenue: 45000, units: 150, product: "Laptops", region: "North" },
  { id: "2", month: "February", revenue: 52000, units: 180, product: "Laptops", region: "South" },
  { id: "3", month: "March", revenue: 48000, units: 160, product: "Tablets", region: "East" },
  { id: "4", month: "April", revenue: 61000, units: 200, product: "Phones", region: "West" },
  { id: "5", month: "May", revenue: 58000, units: 190, product: "Laptops", region: "North" },
  { id: "6", month: "June", revenue: 67000, units: 220, product: "Tablets", region: "South" },
  { id: "7", month: "July", revenue: 72000, units: 240, product: "Phones", region: "East" },
  { id: "8", month: "August", revenue: 69000, units: 230, product: "Laptops", region: "West" },
  { id: "9", month: "September", revenue: 75000, units: 250, product: "Tablets", region: "North" },
  { id: "10", month: "October", revenue: 81000, units: 270, product: "Phones", region: "South" },
  { id: "11", month: "November", revenue: 88000, units: 290, product: "Laptops", region: "East" },
  { id: "12", month: "December", revenue: 95000, units: 320, product: "Phones", region: "West" },
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [salesData, setSalesData] = useState<SalesData[]>([])

  useEffect(() => {
    // Load data from localStorage or use initial data
    const savedData = localStorage.getItem("salesData")
    if (savedData) {
      setSalesData(JSON.parse(savedData))
    } else {
      setSalesData(initialData)
      localStorage.setItem("salesData", JSON.stringify(initialData))
    }
  }, [])

  const addSalesData = (data: Omit<SalesData, "id">) => {
    const newData = { ...data, id: Date.now().toString() }
    const updatedData = [...salesData, newData]
    setSalesData(updatedData)
    localStorage.setItem("salesData", JSON.stringify(updatedData))
  }

  const updateSalesData = (id: string, data: Partial<SalesData>) => {
    const updatedData = salesData.map((item) => (item.id === id ? { ...item, ...data } : item))
    setSalesData(updatedData)
    localStorage.setItem("salesData", JSON.stringify(updatedData))
  }

  const deleteSalesData = (id: string) => {
    const updatedData = salesData.filter((item) => item.id !== id)
    setSalesData(updatedData)
    localStorage.setItem("salesData", JSON.stringify(updatedData))
  }

  return (
    <DataContext.Provider value={{ salesData, addSalesData, updateSalesData, deleteSalesData }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
