// app/dashboard/page.tsx
'use client';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import StatsGrid from './statsGrid';
import SalesChart from './salesChart';
import RecentOrders from './recentOrders';
import TopDishes from './topDishes';
import AnalyticsPage from './analytics';
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurant Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <SalesChart />
            <RecentOrders />
          </div>
          
          <TopDishes />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsPage/>
          {/* <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Coming soon - More detailed analytics</CardDescription>
            </CardHeader>
          </Card> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}