'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface ChartProps {
  title: string;
  data: ChartData[];
  type?: 'bar' | 'line' | 'pie';
  className?: string;
}

export function Chart({ title, data, type = 'bar', className }: ChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const renderBarChart = () => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{item.name}</span>
            <span className="text-muted-foreground">{item.value}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#3b82f6'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <div className="relative h-32">
      <svg className="w-full h-full" viewBox="0 0 300 120">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 280},${120 - (item.value / maxValue) * 100}`
          ).join(' ')}
        />
        {data.map((item, index) => (
          <circle
            key={index}
            cx={(index / (data.length - 1)) * 280}
            cy={120 - (item.value / maxValue) * 100}
            r="4"
            fill="#3b82f6"
          />
        ))}
      </svg>
    </div>
  );

  const renderPieChart = () => (
    <div className="flex items-center justify-center h-32">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percentage = item.value / data.reduce((sum, d) => sum + d.value, 0);
            const startAngle = data.slice(0, index).reduce((sum, d) => 
              sum + (d.value / data.reduce((total, item) => total + item.value, 0)) * 360, 0
            );
            const endAngle = startAngle + percentage * 360;
            
            const x1 = 50 + 40 * Math.cos(startAngle * Math.PI / 180);
            const y1 = 50 + 40 * Math.sin(startAngle * Math.PI / 180);
            const x2 = 50 + 40 * Math.cos(endAngle * Math.PI / 180);
            const y2 = 50 + 40 * Math.sin(endAngle * Math.PI / 180);
            
            const largeArcFlag = percentage > 0.5 ? 1 : 0;

            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color || `hsl(${index * 60}, 70%, 60%)`}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };

    return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
        {type === 'pie' && (
          <div className="mt-4 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 60%)` }}
                />
                <span>{item.name}</span>
                <span className="text-muted-foreground ml-auto">{item.value}</span>
            </div>
            ))}
      </div>
        )}
      </CardContent>
    </Card>
  );
}

// Sample chart data for demonstration
export const sampleChartData = {
  sales: [
    { name: 'Electronics', value: 45, color: '#3b82f6' },
    { name: 'Clothing', value: 32, color: '#10b981' },
    { name: 'Furniture', value: 28, color: '#f59e0b' },
    { name: 'Books', value: 15, color: '#ef4444' }
  ],
  revenue: [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 18000 },
    { name: 'Apr', value: 22000 },
    { name: 'May', value: 25000 },
    { name: 'Jun', value: 30000 }
  ],
  categories: [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Furniture', value: 20 },
    { name: 'Books', value: 20 }
  ]
};

// Dashboard component that uses multiple charts
export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Chart 
        title="Sales by Category" 
        data={sampleChartData.sales} 
        type="bar" 
      />
      <Chart 
        title="Revenue Trend" 
        data={sampleChartData.revenue} 
        type="line" 
      />
      <Chart 
        title="Category Distribution" 
        data={sampleChartData.categories} 
        type="pie" 
      />
    </div>
  );
}

export default Chart;
