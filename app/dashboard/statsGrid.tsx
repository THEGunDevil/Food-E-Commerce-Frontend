// components/dashboard/StatsGrid.tsx
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { title: 'Total Revenue', value: '৳42,500', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
  { title: 'Total Orders', value: '156', change: '+8.2%', icon: ShoppingCart, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { title: 'Active Customers', value: '342', change: '+5.1%', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { title: 'Average Order Value', value: '৳272', change: '+3.4%', icon: TrendingUp, color: 'text-amber-600', bgColor: 'bg-amber-100' },
];

const StatCard = ({ stat }: any) => {
  const Icon = stat.icon;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            <div className="flex items-center gap-1 mt-2">
              {stat.change.startsWith('+') ? (
                <ArrowUp className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-600" />
              )}
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground">from last week</span>
            </div>
          </div>
          <div className={`${stat.bgColor} p-3 rounded-full`}>
            <Icon className={`h-6 w-6 ${stat.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}