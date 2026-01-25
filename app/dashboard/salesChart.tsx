// components/analytics/SalesChart.tsx
'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface SalesChartProps {
  className?: string;
}

const salesData = [
  { day: 'Sat', sales: 42500, orders: 48 },
  { day: 'Sun', sales: 51200, orders: 56 },
  { day: 'Mon', sales: 38900, orders: 42 },
  { day: 'Tue', sales: 46700, orders: 51 },
  { day: 'Wed', sales: 53400, orders: 59 },
  { day: 'Thu', sales: 49800, orders: 53 },
  { day: 'Fri', sales: 61200, orders: 67 },
];

export default function SalesChart({ className }: SalesChartProps) {
  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalSales / totalOrders;
  const weekGrowth = 12.5; // Percentage growth from previous week

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-green-600">
            Sales: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-blue-600">
            Orders: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily sales and order trends</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {weekGrowth >= 0 ? (
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+{weekGrowth}% this week</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{weekGrowth}% this week</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
            <p className="text-xs text-gray-500">This week</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            <p className="text-xs text-gray-500">This week</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Avg. Order Value</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgOrderValue)}</p>
            <p className="text-xs text-gray-500">Per order</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#666" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#666" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `৳${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales (৳)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
            Sales peak on Fridays with highest revenue
          </p>
          <p className="flex items-center mt-1">
            <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
            Order count follows sales pattern closely
          </p>
        </div>
      </CardContent>
    </Card>
  );
}