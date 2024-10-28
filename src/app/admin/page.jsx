"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const deploymentData = [
  { name: 'Jan', deployments: 65 },
  { name: 'Feb', deployments: 59 },
  { name: 'Mar', deployments: 80 },
  { name: 'Apr', deployments: 81 },
  { name: 'May', deployments: 56 },
  { name: 'Jun', deployments: 55 },
  { name: 'Jul', deployments: 40 },
];

const usageData = [
  { name: 'Mon', usage: 4000 },
  { name: 'Tue', usage: 3000 },
  { name: 'Wed', usage: 2000 },
  { name: 'Thu', usage: 2780 },
  { name: 'Fri', usage: 1890 },
  { name: 'Sat', usage: 2390 },
  { name: 'Sun', usage: 3490 },
];

const recentDeployments = [
  { id: 1, project: 'E-commerce Site', status: 'Success', time: '2 hours ago' },
  { id: 2, project: 'Blog Platform', status: 'Failed', time: '5 hours ago' },
  { id: 3, project: 'Mobile App Backend', status: 'Success', time: '1 day ago' },
  { id: 4, project: 'Analytics Dashboard', status: 'In Progress', time: 'Just now' },
];

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const adminToken = Cookies.get('token');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard/total', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const result = await response.json();
          setData(result);
        } else if (response.status === 403) {
          setError('Không có quyền truy cập');
        } else {
          throw new Error('Không thể truy cập dữ liệu');
        }
      } catch (error) {
        setError(error.message);
      }
    };
    if (adminToken) {
      fetchData();
    } else {
      router.push('/login');
    }
  }, [router]);
  if (error) return <p>Lỗi: {error}</p>;
  if (!data) return <p>Đang tải dữ liệu...</p>;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tài khoản</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_user}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng lượt liên hệ</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_contract}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng hợp đồng</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_contact_room}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <Card>
          <CardHeader>
            <CardTitle>Lượt xem tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                deployments: {
                  label: "Deployments",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deploymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="deployments" fill="var(--color-deployments)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Server Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                usage: {
                  label: "Usage",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="usage" stroke="var(--color-usage)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deployments Table */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>A list of recent deployments across all projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDeployments.map((deployment) => (
                <TableRow key={deployment.id}>
                  <TableCell>{deployment.project}</TableCell>
                  <TableCell>{deployment.status}</TableCell>
                  <TableCell>{deployment.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
