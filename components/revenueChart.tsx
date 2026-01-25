// components/analytics/RevenueChart.tsx
'use client';

import React, { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RevenueChartProps {
  className?: string;
}

const monthlyData = [
  { month: 'Jul', revenue: 1850000, profit: 425000, orders: 1850 },
  { month: 'Aug', revenue: 1920000, profit: 445000, orders: 1920 },
  { month: 'Sep', revenue: 2100000, profit: 510000, orders: 2100 },
  { month: 'Oct', revenue: 2250000, profit: 550000, orders: 2250 },
  { month: 'Nov', revenue: 2400000, profit: 600000, orders: 2400 },
  { month: 'Dec', revenue: 2750000, profit: 700000, orders: 2750 },
];

const weeklyData = [
  { week: 'Week 1', revenue: 625000, profit: 150000 },
  { week: 'Week 2', revenue: 680000, profit: 165000 },
  { week: 'Week 3', revenue: 720000, profit: 180000 },
  { week: 'Week 4', revenue: 725000, profit: 185000 },
];

export default function RevenueChart({ className }: RevenueChartProps) {
  const [timeRange, setTimeRange] = useState('monthly');
  const data = timeRange === 'monthly' ? monthlyData : weeklyData;

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const avgProfitMargin = (totalProfit / totalRevenue) * 100;
  const lastPeriodGrowth = timeRange === 'monthly' ? 14.6 : 8.3;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-green-600">
            Profit: {formatCurrency(payload[1].value)}
          </p>
          {payload[2] && (
            <p className="text-sm text-purple-600">
              Orders: {payload[2].value}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Profit Margin: {((payload[1].value / payload[0].value) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Revenue & Profit</CardTitle>
            <CardDescription>Financial performance overview</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-blue-700">Total Revenue</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
            <div className="flex items-center gap-1 mt-1">
              {lastPeriodGrowth >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{lastPeriodGrowth}% growth</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-xs text-red-600">{lastPeriodGrowth}% decline</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-700">Total Profit</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalProfit)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {avgProfitMargin.toFixed(1)}% average margin
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <p className="text-sm text-purple-700">Period</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {timeRange === 'monthly' ? '6 Months' : '4 Weeks'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {timeRange === 'monthly' ? 'Jul - Dec' : 'December weeks'}
            </p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={timeRange === 'monthly' ? 'month' : 'week'}
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `৳${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                name="Revenue" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="profit" 
                name="Profit" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
              {timeRange === 'monthly' && (
                <Bar 
                  dataKey="orders" 
                  name="Orders" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Profit</span>
          </div>
          {timeRange === 'monthly' && (
            <div className="flex items-center">
              <div className="h-3 w-3 rounded bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-600">Orders</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}