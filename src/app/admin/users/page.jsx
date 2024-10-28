"use client"

import { useEffect, useState } from "react"
import { Search, UserPlus, Pencil, Trash2, BookCopy } from "lucide-react"
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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [born, setBorn] = useState("");
  const router = useRouter()

  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }

    // fetch dữ liệu user

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setUsers(result.list || []);
        } else {
          setError('Không có quyền truy cập');
        }
      } catch (error) {
        setError('Không thể truy cập dữ liệu');
      }
    };
    fetchData();
  }, [router]);


  // nhân bản user
  const handleCopyUser = async (id) => {
    // Kiểm tra ID
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/user/duplicate/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Response status:', response.status); // Kiểm tra trạng thái phản hồi
      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]); // Cập nhật danh sách người dùng
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi lấy thông tin phản hồi");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi sao chép người dùng");
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    const adminToken = Cookies.get("token");
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
        // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
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
      phone,
      address,
      born
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
        const updatedData = await response.json();
        setUsers(users.map(user => (user.id === selectedUser.id ? updatedData : user))); // Cập nhật danh sách người dùng
        setSelectedUser(null); // Đặt lại user đã chọn
        setName("");
        setPhone("");
        setAddress("");
        setBorn("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi cập nhật thông tin người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi cập nhật thông tin người dùng");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={""}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="flex space-x-2">

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => {
                        setSelectedUser(user); // Cập nhật user cần chỉnh sửa
                        setName(user.name);
                        setPhone(user.phone);
                        setAddress(user.address);
                        setBorn(user.born);
                      }}>
                        <Pencil className="mr-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                         Edit a user account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="born" className="text-right">
                            Born
                          </Label>
                          <Input
                            id="born"
                            type="born"
                            value={born}
                            onChange={(e) => setBorn(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">
                            Address
                          </Label>
                          <Input
                            id="address"
                            type="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleEditUser} >Add User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleCopyUser(user.id)} >
                    <BookCopy className="h-4 w-4"
                    />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}