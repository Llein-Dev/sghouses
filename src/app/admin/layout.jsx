"use client";
import { useState } from "react";
import Link from "next/link";

// Thay đổi cách import từ recharts
import BarChart from "recharts/lib/chart/BarChart";
import Bar from "recharts/lib/cartesian/Bar";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";

import {
  Bell,
  ChevronDown,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for charts

export default function RootLayout({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-m w-12 md:w-64">
        <div className="p-5 md:block hidden">
          <h1 className="text-2xl font-bold">SGHouses</h1>
        </div>
        <nav className="space-y-2 text-sm font-semibold">
          <Link
            href="#"
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center space-x-0 lg:space-x-3 px-4 py-3 text-gray-700 ${
              activeTab === "dashboard" ? "bg-gray-200" : ""
            }`}
          >
            <LayoutDashboard className="" />
            <span className="hidden md:block">Dashboard</span> {/* Hide on mobile */}
          </Link>
          <Link
            href="#"
            onClick={() => setActiveTab("projects")}
            className={`flex items-center space-x-0 lg:space-x-3 px-4 py-3 text-gray-700 ${
              activeTab === "projects" ? "bg-gray-200" : ""
            }`}
          >
            <Home className="" />
            <span className="hidden md:block">Projects</span> {/* Hide on mobile */}
          </Link>
          <Link
            href="#"
            onClick={() => setActiveTab("users")}
            className={`flex items-center space-x-0 lg:space-x-3 px-4 py-3 text-gray-700 ${
              activeTab === "users" ? "bg-gray-200" : ""
            }`}
          >
            <Users className="" />
            <span className="hidden md:block">Users</span> {/* Hide on mobile */}
          </Link>
          <Link
            href="#"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center space-x-0 lg:space-x-3 px-4 py-3 text-gray-700 ${
              activeTab === "settings" ? "bg-gray-200" : ""
            }`}
          >
            <Settings className="" />
            <span className="hidden md:block">Settings</span> {/* Hide on mobile */}
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="w-full">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className=" p-4 flex justify-between items-center">
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
    </div>
  );
}
