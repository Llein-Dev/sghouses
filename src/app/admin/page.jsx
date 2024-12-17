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
const usageData = [
  { name: 'Mon', usage: 4000 },
  { name: 'Tue', usage: 3000 },
  { name: 'Wed', usage: 2000 },
  { name: 'Thu', usage: 2780 },
  { name: 'Fri', usage: 1890 },
  { name: 'Sat', usage: 2390 },
  { name: 'Sun', usage: 3490 },
];


export default function Home() {
  const [deploymentData, setDoanhThu] = useState([])
  const [hoadontrehen, setHoaDonTreHen] = useState([])
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [year, setYear] = useState(null); // State để lưu năm

  const fetchHoaDonTreHen = async () => {

    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('https://hieu.name.vn/datn/public/api/dashboard/tre_han', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setHoaDonTreHen(result.hoa_don_tre_han || []);
      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  }

  const fetchDoanhThu = async () => {

    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('https://hieu.name.vn/datn/public/api/dashboard/doanh_thu', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDoanhThu(result.data || []);
        setYear(result.year); // Lưu năm vào state
      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  }
  // Gọi fetchData trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDoanhThu();
    fetchHoaDonTreHen();
    // Call the prop to expose fetchData
  }, [router]);

  useEffect(() => {
    const adminToken = Cookies.get('token');
    const fetchData = async () => {
      try {
        const response = await fetch('https://hieu.name.vn/datn/public/api/dashboard/total', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const result = await response.json();
          setData(result);
          console.log(result)
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
            {error ? (
              <p className="text-red-500 "> {error}</p>
            ) : !data ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div className="text-2xl font-bold">{data.total_user}</div>
            )}
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
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : !data ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div className="text-2xl font-bold">{data.total_contract}</div>
            )}
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
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : !data ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div className="text-2xl font-bold">{data.total_contact_room}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 ">
        <Card >
          <CardHeader >
            <CardTitle >Doanh thu {year}</CardTitle>
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
                  <Bar dataKey="doanh thu" fill="var(--color-deployments)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Thống kê -- tính sau</CardTitle>
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
          <CardTitle>Hóa đơn trễ hẹn</CardTitle>
          <CardDescription>Danh sách hóa đơn trễ hẹn !</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID hợp đồng</TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Giá đặt phòng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hoadontrehen.map((deployment) => (
                <TableRow key={deployment.index}>
                  <TableCell>{deployment.hop_dong_id}</TableCell>
                  <TableCell>
                    <img style={{ height: "50px", width: "50px",objectFit: "cover",borderRadius: "50%",}}
                     src={`REACT_APP_IMAGE_ERROR/${deployment.avatar_user}`}
                     onError={(e) => {
                       e.target.onerror = null; // Ngăn việc gọi onError lặp lại
                       e.target.src = "https://vnsteelthanglong.vn/core/img/default_image.png"; // Đường dẫn ảnh mặc định
                     }}
                     alt="Avatar"
                    />
                  </TableCell>
                  <TableCell>{deployment.name_user}</TableCell>
                  <TableCell>{deployment.email_user}</TableCell>
                  <TableCell>{deployment.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
