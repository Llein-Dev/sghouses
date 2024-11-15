"use client"

import { useEffect, useState } from "react"
import { Search, Trash2, BookCopy, Eye,  Plus, RefreshCcwDot,Pen } from "lucide-react"
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
// import { useRouter } from "next/navigation"


export default function BlogContent() {
  const [blog, setBlog] = useState([])
  const [error, setError] = useState([])
  const router = useRouter(); // Khởi tạo router
  // const router = useRouter()
  // Định nghĩa hàm fetchData
  const fetchDataBlog = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/blog/all');
      if (response.ok) {
        const result = await response.json();
        setBlog(result);
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
    fetchDataBlog();
    // Call the prop to expose fetchData
  });

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/blog/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Delete response status:', response.status);
      if (response.ok) {
        // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
        setBlog((prevBlog) => prevBlog.filter(blogs => blogs.id !== id));
        const shouldGoToRecovery = window.confirm("Xóa blog thành công! Bạn có muốn đến trang khôi phục không?");
        if (shouldGoToRecovery) {
          router.push("/admin/blog"); // Chuyển đến trang khôi phục
        } else {
          fetchDataBlog(); // Cập nhật danh sách người dùng nếu không chuyển trang
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi xóa blog");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi xóa blog");
    }
  };

  // nhân bản blog
  const handleCoppyBlog = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/blog/duplicate/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newBlog = await response.json();
        setBlog((prevBlog) => [...prevBlog, newBlog]); // Cập nhật danh sách user
        // Hiện thông báo và tải lại danh sách users
        fetchDataBlog(); // Gọi lại fetchData để tải lại danh sách user mới

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi lấy thông tin phản hồi");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi sao chép người dùng");
    }
  };

  const handleCreatPage = () => {
    router.push('/admin/blog/create_blog')
  }
  const handleRefeshBlog = () => {
    router.push('/admin/blog/refesh_blog')
  }
  const handleDetailBlog = (id) => {
    router.push(`/admin/detail_blog/${id}`)
  }
  const handleUpdateBlog = (id) => {
    router.push(`/admin/update_blog/${id}`)
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Cột input */}
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={""}
            // onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>

        {/* Cột buttons */}
        <div className="flex justify-end space-x-2">
          <Button onClick={handleCreatPage} className="bg-green-700 text-white hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" />
            create blog
          </Button>
          <Button onClick={handleRefeshBlog} variant="blue">
            <RefreshCcwDot className="mr-2 h-4 w-4" />
            Refresh Contract
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blog.map((blogs, index) => (
            <TableRow key={index} >
              <TableCell>{blogs.id}</TableCell>
              <TableCell>  <img style={{height:"150px", objectFit:"cover", borderRadius:"10px"}} src={`http://localhost:8000/storage/${blogs.image}`}></img> </TableCell>
              <TableCell>{blogs.title} </TableCell>
              <TableCell>{blogs.name_cate}</TableCell>
              <TableCell>{blogs.content}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {/* Nút Gọi điện */}
                  <Dialog>
                    <DialogTrigger asChild>
                      {/* <Button variant="outline" onClick={() => {
                        setSelectedUser(user); // Cập nhật user cần chỉnh sửa
                        setName(user.name);
                        setPhone(user.phone);
                        setAddress(user.address);
                        setBorn(user.born);
                      }}>
                        <Pencil className="mr-2 h-4 w-4" />
                      </Button> */}
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
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
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
                            // value={phone}
                            // onChange={(e) => setPhone(e.target.value)}
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
                            // value={born}
                            // onChange={(e) => setBorn(e.target.value)}
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
                            // value={address}
                            // onChange={(e) => setAddress(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit"  >Add User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteBlog(blogs.id)} >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleUpdateBlog(blogs.id)} >
                    <Pen className="h-4 w-4"
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleCoppyBlog(blogs.id)} >
                    <BookCopy className="h-4 w-4"
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDetailBlog(blogs.id)} >
                    <Eye className="h-4 w-4"
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