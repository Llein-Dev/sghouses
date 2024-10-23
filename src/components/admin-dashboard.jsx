"use client";
import { useState } from 'react'
import Link from 'next/link'
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
import { Bell, ChevronDown, Home, LayoutDashboard, Settings, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for charts
const deploymentData = [
  { name: 'Jan', deployments: 65 },
  { name: 'Feb', deployments: 59 },
  { name: 'Mar', deployments: 80 },
  { name: 'Apr', deployments: 81 },
  { name: 'May', deployments: 56 },
  { name: 'Jun', deployments: 55 },
  { name: 'Jul', deployments: 40 },
]

const usageData = [
  { name: 'Mon', usage: 4000 },
  { name: 'Tue', usage: 3000 },
  { name: 'Wed', usage: 2000 },
  { name: 'Thu', usage: 2780 },
  { name: 'Fri', usage: 1890 },
  { name: 'Sat', usage: 2390 },
  { name: 'Sun', usage: 3490 },
]

const recentDeployments = [
  { id: 1, project: 'E-commerce Site', status: 'Success', time: '2 hours ago' },
  { id: 2, project: 'Blog Platform', status: 'Failed', time: '5 hours ago' },
  { id: 3, project: 'Mobile App Backend', status: 'Success', time: '1 day ago' },
  { id: 4, project: 'Analytics Dashboard', status: 'In Progress', time: 'Just now' },
]

export function AdminDashboardComponent() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    (<div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link
            href="#"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-200' : ''}`}>
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Link>
          <Link
            href="#"
            onClick={() => setActiveTab('projects')}
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'projects' ? 'bg-gray-200' : ''}`}>
            <Home className="mr-2" />
            Projects
          </Link>
          <Link
            href="#"
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'users' ? 'bg-gray-200' : ''}`}>
            <Users className="mr-2" />
            Users
          </Link>
          <Link
            href="#"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'settings' ? 'bg-gray-200' : ''}`}>
            <Settings className="mr-2" />
            Settings
          </Link>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div
            className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800">Dashboard</h2>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    Admin User
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deployments</CardTitle>
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
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
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
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Server Usage</CardTitle>
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
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deployments</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    deployments: {
                      label: "Deployments",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]">
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
                  className="h-[300px]">
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
          <Card className="mt-5">
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
        </div>
      </main>
    </div>)
  );
}