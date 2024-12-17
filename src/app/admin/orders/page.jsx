"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Search, Trash2, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Order() {
  const router = useRouter();
  const [orders, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const adminToken = Cookies.get("token");
    if (!adminToken) {
      router.push("/");
      return;
    }

    const fetchDataContracts = async () => {
      try {
        const response = await fetch("https://hieu.name.vn/datn/public/api/hoa-don", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setOrder(result.list || []);
        } else {
          setError("Không có quyền truy cập.");
          toast.error("Không có quyền truy cập.");
        }
      } catch (error) {
        setError("Lỗi khi tải dữ liệu.");
        toast.error("Lỗi khi tải dữ liệu.");
      }
    };

    fetchDataContracts();
  }, [router]);

  // Tìm kiếm và phân trang
  const filteredOrder = orders.filter((order) =>
    `${order.hop_dong_id} ${order.tong_tien} ${order.trang_thai}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrder.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredOrder.length / itemsPerPage);

  // Đặt lại trang khi số lượng trang giảm
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredOrder.length, totalPages]);



  const handleAdd = () => {
    router.push('/admin/orders/create_order')
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4 p-4 bg-gray-50 min-h-screen">
      {/* Thanh tìm kiếm và nút khôi phục */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Button onClick={handleAdd} className="bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Tạo hóa đơn
        </Button>
      </div>

      {/* Bảng dữ liệu */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hợp đồng</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hình thức</TableHead>
            <TableHead>Tháng</TableHead>
            <TableHead>Tiền thuê</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.hop_dong_id}</TableCell>
                <TableCell>{formatNumber(order.tong_tien)} <span className="text-green-500">vnđ</span></TableCell>
                <TableCell>{order.trang_thai}</TableCell>
                <TableCell>{order.hinh_thuc}</TableCell>
                <TableCell>{formatDate(order.ngay_tao)}</TableCell>

                <TableCell>{formatNumber(order.tien_thue)} <span className="text-green-500">vnđ</span></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                Không có dữ liệu liên hệ.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Nút phân trang */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-700"
              }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>




      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
const formatNumber = (num) => {
  if (!num) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}; const formatDate = (dateString) => {
  // Create a Date object from the input string
  const parts = dateString.split(' ');

  const month = parts[2]; // "11"
  const year = parts[4]; // "2024"

  // Return the formatted string
  return `tháng ${month}/${year}`;
};

// Inside your component's render method
