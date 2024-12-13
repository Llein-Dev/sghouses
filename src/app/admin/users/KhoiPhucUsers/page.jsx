"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Search, RefreshCcw, FileText, UserIcon } from "lucide-react"
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
import { toast, ToastContainer } from "react-toastify";

export default function KhoiPhucUsers() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  // search với fetchdata base
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách user sau khi lọc
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [usersPerPage] = useState(5); // Số lượng người dùng hiển thị mỗi trang

  // hàm tiềm kiếm dựa trên dữ liệu được fetch
  const handleSearchChange = (event) => {
    const searchValue = event.target.value; // Nhận giá trị tìm kiếm từ người dùng
    setSearchTerm(searchValue); // Cập nhật `searchTerm` với giá trị tìm kiếm mới

    const filtered = deletedUsers.filter((user) => {
      const lowerCaseSearchValue = searchValue.toLowerCase().trim();
      // Tạo chuỗi kết hợp chứa tên, số điện thoại, ID và email để tìm kiếm toàn diện
      const combinedString = `${user.name.toLowerCase()} ${user.phone} ${user.id} ${user.email.toLowerCase()}`;
      // Kiểm tra xem chuỗi kết hợp có chứa giá trị tìm kiếm không
      return combinedString.includes(lowerCaseSearchValue);
    });
    setFilteredUsers(filtered);
  };


  // Định nghĩa hàm fetchDeletedUsers
  const fetchDeletedUsers = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/user/list_delete', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setDeletedUsers(result.deleted_users || []);
        console.log(result);
        console.log(deletedUsers); // Kiểm tra dữ liệu
        // TOAST MENTION

      } else {
        setDeletedUsers([]);
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setDeletedUsers([]);
      // TOAST MENTION
      setError('Không thể truy cập dữ liệu');
    }
  };

  // Gọi fetchDeletedUsers trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchDeletedUsers(); // Gọi hàm fetchDeletedUsers
  }, [router]);

  useEffect(() => {
    const filtered = deletedUsers.filter((user) => {
      const name = user.name ? user.name.toLowerCase() : '';
      const email = user.email ? user.email.toLowerCase() : '';
      return `${name} ${email}`.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  }, [searchTerm, deletedUsers]);




  const handleRefesh = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/user/restore/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await response.json(); // Đợi dữ liệu trả về
        fetchDeletedUsers(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang
        toast.success("khôi phục người dùng thành công!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi khôi phục người dùng");
      }
    } catch (error) {
      console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
    }
  };



  const handleReturn = () => {
    router.push('/admin/users')
  }

  // Phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>

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
          <Button onClick={handleReturn} variant="blue">
            <FileText className="mr-2 h-4 w-4" />
            Quay lại trang người dùng
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Ảnh</TableHead> {/* New column for Avatar */}
              <TableHead>Tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Địa chỉ</TableHead> {/* New column for Address */}
              <TableHead>Ngày sinh</TableHead> {/* New column for Birth Date */}
              <TableHead>Giới tính</TableHead> {/* New column for Gender */}
              {/* <TableHead>Ngày đăng ký</TableHead> New column for Registration Date */}
              <TableHead>Quyền</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {user.avatar && user.avatar.trim() ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_PATH_FILE}${user.avatar}`}
                          alt={`${user.name}'s avatar`}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <UserIcon className="h-6 w-6" />
                        </div>
                      )}
                    </TableCell>

                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.address || 'Chưa có địa chỉ'}</TableCell> {/* Display address, handle null */}
                    <TableCell>{new Date(user.born).toLocaleDateString()}</TableCell> {/* Display birth date */}
                    <TableCell>{user.gender === 1 ? 'Nam' : 'Nữ'}</TableCell> {/* Display gender */}
                    {/* <TableCell>{user.date_create}</TableCell> Display registration date */}
                    <TableCell>{user.role === 0 ? 'Admin' : 'User'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleRefesh(user.id)}>
                          <RefreshCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-gray-500">
                    Không có người dùng nào bị cấm.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>

        </Table>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(filteredUsers.length / usersPerPage))].map((_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              variant={currentPage === index + 1 ? "blue" : "outline"}
            >
              {index + 1}
            </Button>
          ))}
        </div>

      </div>
      <ToastContainer />
    </>
  );
}