"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Search, RefreshCcw, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function RefeshContracts() {
  const [deletedContracts, setDeletedCataBlog] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // search với fetchdata base
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách user sau khi lọc


  // hàm tiềm kiếm dựa trên dữ liệu được fetch
  const handleSearchChange = (event) => {
    const searchValue = event.target.value; // Nhận giá trị tìm kiếm từ người dùng
    setSearchTerm(searchValue); // Cập nhật `searchTerm` với giá trị tìm kiếm mới

    const filtered = deletedContracts.filter((contracts) => {
      const lowerCaseSearchValue = searchValue.toLowerCase().trim();
      // Tạo chuỗi kết hợp chứa tên, số điện thoại, ID và email để tìm kiếm toàn diện
      const combinedString = `${contracts.name.toLowerCase()} ${contracts.slug} ${contracts.id} ${contracts.status.toLowerCase()}`;
      // Kiểm tra xem chuỗi kết hợp có chứa giá trị tìm kiếm không
      return combinedString.includes(lowerCaseSearchValue);
    });
    setFilteredUsers(filtered);
  };


  // Định nghĩa hàm fetchDeletedContracts
  const fetchDeletedContracts = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/hop-dong/list_delete', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDeletedCataBlog(result || []);
        console.log(result);
        console.log(deletedContracts); // Kiểm tra dữ liệu


      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  };

  // Gọi fetchDeletedContracts trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDeletedContracts(); // Gọi hàm fetchDeletedContracts
  }, [router]);

  useEffect(() => {
    setFilteredUsers(deletedContracts); // Cập nhật  mỗi khi users thay đổi
  }, [deletedContracts]);



  const handleRefesh = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/hop-dong/restore/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await response.json(); // Đợi dữ liệu trả về
        const shouldGoToRecovery = window.confirm(
          "Đã khôi phục thành công, bạn có muốn quay về trang users không?"
        );
        if (shouldGoToRecovery) {
          router.push("/admin/contracts"); // Chuyển đến trang users
        } else {
          fetchDeletedContracts(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };
  const handleReturn = () => {
    router.push('/admin/contracts');
  }
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleReturn} className="bg-blue-900 text-white hover:bg-blue-600">
          <FileText className="mr-2 h-4 w-4" />
          Trang hợp đồng
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-sm"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Phòng</TableHead>
              <TableHead>ID người dùng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filteredUsers.length > 0 ? (
                filteredUsers.map((contracts, index) => (
                  <TableRow key={index}>
                    <TableCell>{contracts.id_room}</TableCell>
                    <TableCell>{contracts.id_user}</TableCell>
                    <TableCell>{contracts.status}</TableCell>
                    <TableCell>{contracts.date_start}</TableCell>
                    <TableCell>{contracts.date_end}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleRefesh(contracts.id)}>
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Không có dữ liệu để hiển thị
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>

        </Table>
      </div>
</>
      );
}