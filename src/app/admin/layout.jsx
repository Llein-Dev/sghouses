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

export default function RootLayout({ children }) {
    const [activeTab, setActiveTab] = useState('dashboard')

    return (
        (<div className="flex  bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md w-16 md:w-64">
                <div className="p-4 md:block hidden">
                    <h1 className="text-2xl font-bold">SGHouses</h1>
                </div>
                <nav className="mt-4 space-y-2">
                    <Link
                        href="#"
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center px-4 py-3 text-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-200' : ''}`}>
                        <LayoutDashboard className="md:mr-2 m-0 " />
                        <span className="hidden md:block">Dashboard</span> {/* Hide on mobile */}
                    </Link>
                    <Link
                        href="#"
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center px-4 py-3 text-gray-700 ${activeTab === 'projects' ? 'bg-gray-200' : ''}`}>
                        <Home className="md:mr-2 m-0 " />
                        <span className="hidden md:block">Projects</span> {/* Hide on mobile */}
                    </Link>
                    <Link
                        href="#"
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center px-4 py-3 text-gray-700 ${activeTab === 'users' ? 'bg-gray-200' : ''}`}>
                        <Users className="md:mr-2 m-0 " />
                        <span className="hidden md:block">Users</span> {/* Hide on mobile */}
                    </Link>
                    <Link
                        href="#"
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center px-4 py-3 text-gray-700 ${activeTab === 'settings' ? 'bg-gray-200' : ''}`}>
                        <Settings className="md:mr-2 m-0 " />
                        <span className="hidden md:block">Settings</span> {/* Hide on mobile */}
                    </Link>
                </nav>F
            </aside>

            {/* Main content */}
            <main className="w-full">
                {/* Top navigation */}
                <header className="bg-white shadow-sm">
                    <div
                        className=" p-4 flex justify-between items-center">
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
                <div className="p-4">
                    {children}
                    {/* Overview Cards */}
                    
                </div>
            </main>
        </div>)
    );
}