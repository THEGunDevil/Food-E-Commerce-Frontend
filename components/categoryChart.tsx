"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CategoryChartProps {
  className?: string;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
  trend: number;
}

const categoryData: CategoryData[] = [
  { name: "Biriyani", value: 42, color: "#ef4444", trend: 15 },
  { name: "Meat Dishes", value: 25, color: "#f97316", trend: 8 },
  { name: "Fish", value: 18, color: "#3b82f6", trend: -3 },
  { name: "Vegetables", value: 8, color: "#10b981", trend: 12 },
  { name: "Desserts", value: 5, color: "#8b5cf6", trend: 20 },
  { name: "Drinks", value: 2, color: "#06b6d4", trend: 5 },
];

export default function CategoryChart({ className }: CategoryChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(value * 10000);
  };

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      payload: CategoryData;
    }>;
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold" style={{ color: data.color }}>
            {data.name}
          </p>
          <p className="text-sm text-gray-600">{data.value}% of total sales</p>
          <p className="text-sm font-medium">~ {formatCurrency(data.value)}</p>
          <div className="flex items-center mt-1">
            {data.trend >= 0 ? (
              <>
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">
                  +{data.trend}% from last month
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                <span className="text-xs text-red-600">
                  {data.trend}% from last month
                </span>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  interface LegendProps {
    payload?: Array<{
      value: string;
      color: string;
    }>;
  }

  const CustomLegend = ({ payload }: LegendProps) => {
    if (!payload) return null;

    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="h-3 w-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Fixed label function with type safety
  const renderLabel = (entry: CategoryData & { percent?: number }) => {
    const percent = entry.percent ?? 0;
    return `${entry.name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>Category Performance</CardTitle>
        <CardDescription>Sales distribution by menu category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData as any[]}
                cx="50%"
                cy="50%"
                label={({ name, percent = 0 }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categoryData.slice(0, 2).map((category) => (
            <div
              key={category.name}
              className="p-3 rounded-lg border"
              style={{
                borderLeftColor: category.color,
                borderLeftWidth: "4px",
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-sm text-gray-600">
                    {category.value}% of sales
                  </p>
                </div>
                <div className="flex items-center">
                  {category.trend >= 0 ? (
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="text-xs">+{category.trend}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      <span className="text-xs">{category.trend}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>• Biriyani remains the top-selling category</p>
          <p>• Desserts showing strong growth (+20%)</p>
          <p>• Consider adding more fish varieties</p>
        </div>
      </CardContent>
    </Card>
  );
}
