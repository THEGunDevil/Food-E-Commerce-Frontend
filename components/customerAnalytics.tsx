// components/analytics/CustomerAnalytics.tsx
'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Star, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface CustomerAnalyticsProps {
  className?: string;
}

const customerGrowthData = [
  { month: 'Jul', new: 45, returning: 120, total: 165 },
  { month: 'Aug', new: 52, returning: 135, total: 187 },
  { month: 'Sep', new: 61, returning: 148, total: 209 },
  { month: 'Oct', new: 68, returning: 165, total: 233 },
  { month: 'Nov', new: 72, returning: 180, total: 252 },
  { month: 'Dec', new: 85, returning: 210, total: 295 },
];

const topCustomers = [
  { id: 1, name: 'Rahim Khan', visits: 24, spending: '৳12,500', lastVisit: '2 days ago' },
  { id: 2, name: 'Fatima Begum', visits: 18, spending: '৳8,900', lastVisit: '1 week ago' },
  { id: 3, name: 'Karim Ahmed', visits: 16, spending: '৳10,200', lastVisit: '3 days ago' },
  { id: 4, name: 'Sadia Rahman', visits: 12, spending: '৳6,800', lastVisit: '2 weeks ago' },
  { id: 5, name: 'Mizanur Rahman', visits: 10, spending: '৳9,500', lastVisit: '5 days ago' },
];

const customerSegments = [
  { segment: 'VIP Customers', count: 12, growth: 8, color: 'bg-purple-100 text-purple-800' },
  { segment: 'Regular Customers', count: 85, growth: 15, color: 'bg-green-100 text-green-800' },
  { segment: 'New Customers', count: 45, growth: 22, color: 'bg-blue-100 text-blue-800' },
  { segment: 'At Risk', count: 8, growth: -5, color: 'bg-amber-100 text-amber-800' },
];

export default function CustomerAnalytics({ className }: CustomerAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('6months');

  const totalCustomers = customerGrowthData[customerGrowthData.length - 1].total;
  const newCustomers = customerGrowthData[customerGrowthData.length - 1].new;
  const returningCustomers = customerGrowthData[customerGrowthData.length - 1].returning;
  const retentionRate = (returningCustomers / totalCustomers) * 100;
  const growthRate = 18.5; // Percentage growth

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            New Customers: {payload[0].value}
          </p>
          <p className="text-sm text-green-600">
            Returning: {payload[1].value}
          </p>
          <p className="text-sm text-gray-900 font-medium">
            Total: {payload[2].value}
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
            <CardTitle>Customer Analytics</CardTitle>
            <CardDescription>Customer growth and behavior</CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            {totalCustomers} Total Customers
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-gray-600">New Customers</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{newCustomers}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+22% this month</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-green-600" />
              <p className="text-sm text-gray-600">Retention Rate</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{retentionRate.toFixed(1)}%</p>
            <Progress value={retentionRate} className="h-1.5 mt-2" />
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <p className="text-sm text-gray-600">Avg. Visits</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">4.2</p>
            <p className="text-xs text-gray-500 mt-1">Per customer</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <p className="text-sm text-gray-600">Growth Rate</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">+{growthRate}%</p>
            <p className="text-xs text-gray-500 mt-1">Last 6 months</p>
          </div>
        </div>

        <div className="h-[300px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={customerGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                name="Total Customers"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="returning"
                name="Returning Customers"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="new"
                name="New Customers"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <div>
            <h3 className="font-semibold mb-4">Top Customers</h3>
            <div className="space-y-3">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.visits} visits</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{customer.spending}</p>
                    <p className="text-xs text-gray-500">Last: {customer.lastVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Segments */}
          <div>
            <h3 className="font-semibold mb-4">Customer Segments</h3>
            <div className="space-y-4">
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${segment.color}`}>
                      {segment.segment}
                    </span>
                    <div className="flex items-center">
                      {segment.growth >= 0 ? (
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span className="text-xs">+{segment.growth}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          <span className="text-xs">{segment.growth}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-2xl font-bold mb-1">{segment.count}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">customers</span>
                    <span className="text-gray-500">
                      {((segment.count / totalCustomers) * 100).toFixed(1)}% of total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>• VIP Customers (12) generate 35% of total revenue</p>
          <p>• Customer retention rate increased by 8% this quarter</p>
          <p>• Consider loyalty program for at-risk customers</p>
        </div>
      </CardContent>
    </Card>
  );
}