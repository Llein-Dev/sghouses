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
import OverdueInvoices from '@/components/hoadontrehen';
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
  const [deployment, setDoanhThu] = useState([])
  const [hoadontrehen, setHoaDonTreHen] = useState([])
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [districtsData, setdistrictsData] = useState(null); // State để lưu năm
  const [contactData, setContactData] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [contractError, setContractError] = useState(null);

  const fetchTreHam = async () => {

    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/dashboard/distric', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setdistrictsData(result || []);
      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  }

  const fetchHoaDonTreHen = async () => {

    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/dashboard/tre_han', {
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
      const response = await fetch('http://localhost:8000/api/dashboard/doanh_thu', {
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

  const [deploymentData, setDeploymentData] = useState([]);
  const year = 2024; // Set the year as a constant or from state

  // Function to fetch revenue data from the API
  const fetchRevenueData = async () => {
    try {
      const adminToken = Cookies.get('token');
      const response = await fetch(`http://localhost:8000/api/dashboard/hoa_don/${year}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        // Process the result data to match the format needed for the chart
        const formattedData = result.data.map(item => ({
          name: `Tháng ${item.month}`, // Format month
          doanh_thu: item.tong_hoa_don // Match the key used in the BarChart
        }));
        setDeploymentData(formattedData);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  // Gọi fetchData trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDoanhThu();
    fetchHoaDonTreHen();
    fetchTreHam();
    fetchContactData();
    fetchContractData();
    fetchRevenueData();
    // Call the prop to expose fetchData
  }, [router]);
  const adminToken = Cookies.get("token");
  const fetchContactData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/dashboard/total_contact`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setContactData(result);
      } else if (response.status === 403) {
        setContactError('Không có quyền truy cập');
      } else {
        throw new Error('Không thể truy cập dữ liệu');
      }
    } catch (error) {
      setContactError(error.message);
    }
  };

  const fetchContractData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/dashboard/hop_dong`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setContractData(result);
      } else if (response.status === 403) {
        setContractError('Không có quyền truy cập');
      } else {
        throw new Error('Không thể truy cập dữ liệu');
      }
    } catch (error) {
      setContractError(error.message);
    }
  };

  return (
    <>
      <div className="grid  grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 w-full">
        <Card className=" col-span-4 grid grid-cols-4 bg-white">
          {districtsData?.map((districtData, index) => {
            const { name, buildings } = districtData.District;
            const totalBuilding = buildings.length;
            const rentingCount = buildings.filter(b => b.trong === 0).reduce((acc, b) => acc + b.cho_thue, 0) || 0;
            const occupiedCount = buildings.filter(b => b.trong === 1).length || 0;


            return (
              <div key={index}>
                {/* Card Header */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{name}</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>

                {/* Main Total */}
                <CardContent>
                  <div className="text-xl text-center font-bold">{totalBuilding} </div>
                  <div className="text-sm opacity-50 text-center font-bold">tòa nhà</div>
                </CardContent>

                {/* Child Totals */}
                <CardContent>
                  <div className="grid grid-cols-2 ">
                    {/* Card for "Đang thuê" */}
                    <div className="text-center border py-2 shadow-md bg-blue-100 border-blue-300 hover:bg-blue-200 transition">
                      <p className="text-xs text-muted-foreground">Đang thuê</p>
                      <p className="font-bold text-blue-600">{rentingCount}</p>
                    </div>

                    {/* Card for "Hết hạn" */}
                    <div className="text-center border py-2 shadow-md bg-red-100 border-red-300 hover:bg-red-200 transition">
                      <p className="text-xs text-muted-foreground">Còn trống</p>
                      <p className="font-bold text-red-600">{occupiedCount}</p>
                    </div>
                  </div>
                </CardContent>
              </div>
            );
          })}
        </Card>

      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 ">
        <Card >
          <CardHeader >
            <CardTitle >Doanh thu trong năm {year}</CardTitle>
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
                <BarChart data={deployment}>
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
        <div className='gap-2 grid'>
          <Card>
            {/* Card Header for Total Contacts */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng lượt liên hệ</CardTitle>
              {/* SVG icon here */}
            </CardHeader>
            <CardContent>
              {contactError ? (
                <p className="text-red-500">{contactError}</p>
              ) : !contactData ? (
                <p>Đang tải dữ liệu...</p>
              ) : (
                <div className="text-xl text-center font-bold">
                  {contactData.da_xu_ly + contactData.chua_xu_ly}
                </div>

              )}
            </CardContent>
            {/* Child Totals for Contact */}
            <CardContent>
              <div className="grid grid-cols-2 ">
                <div className="text-center border py-2 shadow-md bg-green-100 border-green-300 hover:bg-green-200 transition">
                  <p className="text-xs text-muted-foreground">Đã xử lý</p>
                  <p className="font-bold text-green-600">
                    {contactData?.da_xu_ly || "Đang tải..."}
                  </p>
                </div>
                <div className="text-center border py-2 shadow-md bg-gray-100 border-gray-300 hover:bg-gray-200 transition">
                  <p className="text-xs text-muted-foreground">Chưa xử lý</p>
                  <p className="font-bold text-gray-600">
                    {contactData?.chua_xu_ly || "Đang tải..."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            {/* Card Header for Total Contracts */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng hợp đồng</CardTitle>
              {/* SVG icon here */}
            </CardHeader>
            <CardContent>
              {contractError ? (
                <p className="text-red-500">{contractError}</p>
              ) : !contractData ? (
                <p>Đang tải dữ liệu...</p>
              ) : (
                <div className="text-xl text-center font-bold">{contractData.tong_hop_dong}</div>
              )}
            </CardContent>
            {/* Child Totals for Contracts */}
            <CardContent>
              <div className="grid grid-cols-3 ">
                <div className="text-center border py-2 shadow-md bg-blue-100 border-blue-300 hover:bg-blue-200 transition">
                  <p className="text-xs text-muted-foreground">Đang thuê</p>
                  <p className="font-bold text-blue-600">
                    {contractData?.dang_thue || "Đang tải..."}
                  </p>
                </div>
                <div className="text-center border py-2 shadow-md bg-red-100 border-red-300 hover:bg-red-200 transition">
                  <p className="text-xs text-muted-foreground">Hết hạn</p>
                  <p className="font-bold text-red-600">
                    {contractData?.het_han || "Đang tải..."}
                  </p>
                </div>
                <div className="text-center border py-2 shadow-md bg-yellow-100 border-yellow-300 hover:bg-yellow-200 transition">
                  <p className="text-xs text-muted-foreground">Sắp hết hạn</p>
                  <p className="font-bold text-yellow-600">
                    {contractData?.sap_het_han || "0"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Hóa đơn chưa đóng tiền</CardTitle>
          <CardDescription>Danh sách hóa đơn chưa đóng tiền !</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID hợp đồng</TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Thời hạn</TableHead>
                <TableHead>Giá đặt phòng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hoadontrehen.map((deployment) => (
                <TableRow key={deployment.index} className={getRowColor(deployment.date)}>
                  <TableCell>{deployment.hop_dong_id}</TableCell>
                  <TableCell>
                    <img style={{ height: "50px", width: "50px", objectFit: "cover", borderRadius: "50%", }}
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
                  <TableCell>{formatDate(deployment.date)}</TableCell>
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
const formatDate = (dateString) => {
  // Extract day, month, hour, and minute using regex
  const regex = /(\d{1,2}) Tháng (\d{1,2}) lúc (\d{1,2}):(\d{2})/;
  const match = dateString.match(regex);

  if (!match) {
    return "Invalid date format"; // Handle invalid date format
  }

  const day = parseInt(match[1], 10); // Get day
  const month = parseInt(match[2], 10) - 1; // Get month (0-indexed)
  const hours = parseInt(match[3], 10); // Get hours
  const minutes = parseInt(match[4], 10); // Get minutes

  // Create a new date object (using the current year)
  const year = new Date().getFullYear();
  const date = new Date(year, month, day, hours, minutes);
  const today = new Date();

  // Calculate overdue days
  const diffTime = today - date;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

  return `Trễ ${diffDays} ngày`; // Return formatted overdue text
};

// Function to determine row color based on overdue days
const getRowColor = (dateString) => {
  const regex = /(\d{1,2}) Tháng (\d{1,2}) lúc (\d{1,2}):(\d{2})/;
  const match = dateString.match(regex);

  if (!match) {
    return ''; // Return empty if date format is invalid
  }

  const day = parseInt(match[1], 10); // Get day
  const month = parseInt(match[2], 10) - 1; // Get month (0-indexed)

  // Create a new date object
  const year = new Date().getFullYear();
  const date = new Date(year, month, day);
  const today = new Date();

  // Calculate overdue days
  const diffTime = today - date;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

  // Return color class based on overdue days
  if (diffDays < 5) return 'bg-gray-500'; // Overdue by 5 days
  if (diffDays > 5 & diffDays < 20) return 'bg-yellow-500'; // Overdue by 10 days
  if (diffDays >= 20) return 'bg-red-500'; // Overdue by 20 days or more
  return ''; // Default color
};

