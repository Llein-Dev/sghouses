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
        const response = await fetch("http://localhost:8000/api/hoa-don", {
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
            <TableHead>Token</TableHead>
            <TableHead>Hợp đồng</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hình thức</TableHead>
            <TableHead>Tiền thuê</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.token}</TableCell>
                <TableCell>{order.hop_dong_id}</TableCell>
                <TableCell>{order.tong_tien}</TableCell>
                <TableCell>{order.trang_thai}</TableCell>
                <TableCell>{order.hinh_thuc}</TableCell>
                <TableCell>{order.tien_thue}</TableCell>
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
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <ToastContainer />
      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
