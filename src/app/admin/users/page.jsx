"use client"

import { useEffect, useState } from "react"
import { Search, UserPlus, Pencil, Trash2, BookCopy, Phone, FileText, UserIcon, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function UsersContent() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State cho user cần chỉnh sửa
  const [name, setName] = useState("");
  const [role, setRole] = useState("")
  const [address, setAddress] = useState("");
  const router = useRouter()

  // search State dựa trên state users đã render dữ liệu
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách user sau khi lọc
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [usersPerPage] = useState(5); // Số lượng người dùng hiển thị mỗi trang



  // hàm tiềm kiếm dựa trên dữ liệu được fetch
  const handleSearchChange = (event) => {
    const searchValue = event.target.value; // Nhận giá trị tìm kiếm từ người dùng
    setSearchTerm(searchValue); // Cập nhật `searchTerm` với giá trị tìm kiếm mới

    const filtered = users.filter((user) => {
      const lowerCaseSearchValue = searchValue.toLowerCase().trim();
      // Tạo chuỗi kết hợp chứa tên, số điện thoại, ID và email để tìm kiếm toàn diện
      const combinedString = `${user.name.toLowerCase()} ${user.phone} ${user.id} ${user.email.toLowerCase()}`;
      // Kiểm tra xem chuỗi kết hợp có chứa giá trị tìm kiếm không
      return combinedString.includes(lowerCaseSearchValue);
    });
    setFilteredUsers(filtered);
  };


  // Định nghĩa hàm fetchData
  const fetchData = async () => {
    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        // Tách admin và người dùng bình thường
        const admins = result.list.filter(user => user.role === 0); // Admin (role = 0)
        const users = result.list.filter(user => user.role === 1);  // Người dùng bình thường (role = 1)

        // Gộp lại: admin trước, người dùng bình thường sau
        const sortedUsers = [...admins, ...users];
        setUsers(sortedUsers); // Cập nhật lại danh sách người dùng đã sắp xếp
      } else {
        setError('Không có quyền truy cập');
      }
    } catch (error) {
      setError('Không thể truy cập dữ liệu');
    }
  };

  // Gọi fetchData trong useEffect khi trang load lần đầu
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    fetchData();
    // Call the prop to expose fetchData
  }, [router]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const name = user.name ? user.name.toLowerCase() : '';
      const email = user.email ? user.email.toLowerCase() : '';
      return `${name} ${email}`.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  }, [searchTerm, users]);


  

  // Delete user
  const handleDeleteUser = async (id) => {
    const adminToken = Cookies.get("token");
    // Tìm user theo ID
    const userToDelete = filteredUsers.find((user) => user.id === id);
    // Kiểm tra nếu role là 
    if (userToDelete?.role === 0) {
      toast.error("Không thể xóa admin!"); // Thông báo lỗi    
    }
    try {
      const response = await fetch(`http://localhost:8000/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        toast.success("Cấm người dùng thành công !"); // Thông báo lỗi        // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        fetchData(); // Cập nhật danh sách người dùng nếu không chuyển trang

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi xóa người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi xóa người dùng");
    }
  };

  // Edit user
  const handleEditUser = async () => {
    const adminToken = Cookies.get("token");
    if (!selectedUser) return;

    const updatedUser = {
      name,
      address,
      role,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/user/edit/${selectedUser.id}`, {
        method: "PUT", // Sử dụng PUT để cập nhật thông tin người dùng
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        toast.success('cập nhật thành công !')
        const updatedData = await response.json();
        setUsers(users.map(user => (user.id === selectedUser.id ? updatedData : user))); // Cập nhật danh sách người dùng
        setSelectedUser(null); // Đặt lại user đã chọn
        setName("");
        setAddress("");
        setRole("");
        fetchData();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi cập nhật thông tin người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi cập nhật thông tin người dùng");
    }
  };

  const handleRefesh = () => {
    router.push('/admin/users/KhoiPhucUsers')
  }
  console.log(users);

  // Phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
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
        <Button onClick={handleRefesh} variant="blue">
          <FileText className="mr-2 h-4 w-4" />
          Khôi phục người dùng
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Avatar</TableHead> {/* New column for Avatar */}
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
          {currentUsers.map((user, index) => (
            <TableRow key={user.id}> {/* Use user.id for the key */}
              <TableCell>{index + 1}</TableCell> {/* STT */}
              <TableCell>
                {user.avatar ? (
                  <img
                    src={`http://localhost:8000/storage/${user.avatar}`}
                    alt={`${user.name}'s avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <UserIcon className="h-6 w-6" /> {/* Biểu tượng người dùng */}
                  </div>
                )}
              </TableCell> {/* Avatar display */}
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
                  {/* Edit Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="orange" size="icon" onClick={() => {
                        setSelectedUser(user);
                        setName(user.name);
                        setAddress(user.address || ''); // Set address if available
                        setRole(user.role.toString()); // Ensure role is a string for the select
                      }}>
                        <Pencil className=" h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                        <DialogDescription>
                          Chỉnh sửa tài khoản!
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                          <Label htmlFor="name" className="text-start">Tên</Label>
                          <Input
                            id="name"
                            value={name}
                            disabled
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid hidden grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">Địa chỉ</Label>
                          <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="name" className="text-start">Quyền</Label>
                          <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="col-span-3 p-2 rounded-lg border"
                          >
                            <option value="0">Admin</option>
                            <option value="1">User</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleEditUser}>Xác nhận!</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Button */}
                  <Button variant="danger" size="icon" onClick={() => handleDeleteUser(user.id)}>
                    <Ban className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
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
      <ToastContainer />
    </div>
  )
}