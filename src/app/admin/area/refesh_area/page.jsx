"use client"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, RefreshCcw, FileText } from "lucide-react";
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
import Cookies from "js-cookie";
export default function RefeshArea() {
  const [areaDeleted, setAreaDeleted] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchDataAreaDeleted = async () => {
    try {
      const adminToken = Cookies.get("token");
      if (!adminToken) {
        setError("Không có token hợp lệ");
        return;
      }

      const response = await fetch("http://localhost:8000/api/khu-vuc/list_delete", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAreaDeleted(result);
      } else {
        setAreaDeleted([])
      }
    } catch (error) {
      setError("Không thể truy cập dữ liệu");
    }
  };

  useEffect(() => {
    const adminToken = Cookies.get("token");
    if (!adminToken) {
      router.push("/");
      return;
    }
    fetchDataAreaDeleted();
  }, [router]);

  const handleRefeshArea = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/khu-vuc/restore/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success('Khôi phục khu vực thành công !')
        fetchDataAreaDeleted(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };

  const handleRefesh = () => {
    router.push('/admin/area')
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            value={""}
            className="max-w-sm"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="blue" onClick={handleRefesh}>
            <FileText className="mr-2 h-4 w-4" />
             Danh sách khu vực
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Đường dẫn</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areaDeleted.length > 0 ? (
            areaDeleted.map((areas, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    style={{
                      height: "150px",
                      width: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    src={`${process.env.NEXT_PUBLIC_PATH_FILE}${areas.image}`}
                    alt={`${areas.image}`}
                  />
                </TableCell>
                <TableCell>{areas.name}</TableCell>
                <TableCell>{areas.slug}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRefeshArea(areas.id)}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                Danh sách khôi phục trống
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ToastContainer/>
    </div>
  );
}
