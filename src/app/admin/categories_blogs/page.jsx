"use client"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"
import { Search, FileText, Eye, Download, Trash2, BookCopy, Link, Pencil } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Label } from "recharts"


export default function CategoryBlog() {
  const [categoryBlog, setCatagoryBlog] = useState([])
  const router = useRouter()
  const [selectedCateBlog, setSelectedCateBlog] = useState(null); // State cho user cần chỉnh sửa
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    const adminToken = Cookies.get('token');
    if (!adminToken) {
      router.push('/');
      return;
    }
    // fetch dữ liệu user

    const fetchDataCatagoryBlog = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cate_blog', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setCatagoryBlog(result.list_cate_blog || []);
      } else {
          setError('Không có quyền truy cập');
        }
      } catch (error) {
        setError('Không thể truy cập dữ liệu');
      }
    };
    fetchDataCatagoryBlog();
  }, [router]);

  const handleDeleteCategoryBlog = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/cate_blog/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
        setCatagoryBlog((prevCategoriesBlog) => prevCategoriesBlog.filter(blogs => blogs.id !== id));
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
      if (!selectedCateBlog) return;
  
      const updatedUser = {
        id,
        name,
        slug,
        status
      };
  
      try {
        const response = await fetch(`http://localhost:8000/api/cate_blog/edit/${selectedCateBlog.id}`, {
          method: "PUT", // Sử dụng PUT để cập nhật thông tin người dùng
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
        if (response.ok) {
          toast.success("Cập nhật thành công!");
          setCatagoryBlog(categoryBlog.map(blogs => (blogs.id === selectedCateBlog.id ? updatedUser : blogs)));
          setSelectedCateBlog(null);
          setName("");
          setSlug("");
          setStatus("");
          router.refresh();  // Load lại trang sau khi cập nhật thành công
          alert('Đã cập nhật thành công')
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Lỗi khi cập nhật thông tin");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  

// khôi pbuc llien hệ
const handleRefesh = () =>{
  router.push('/admin/categories_blogs/refesh_categoriesBlog')
}
  



  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search contracts..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button  onClick={handleRefesh} variant="blue">
          <FileText className="mr-2 h-4 w-4" />
          Refesh Contract
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên Danh Mục Tin Tức</TableHead>
            <TableHead>SLug</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryBlog.map((blogs, index) => (
            <TableRow key={index}>
              <TableCell>{blogs.id}</TableCell>
              <TableCell>{blogs.name}</TableCell>
              <TableCell>{blogs.slug}</TableCell>
              <TableCell>{blogs.status}</TableCell>
              <TableCell>{blogs.Order}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {/* Nút Gọi điện */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => {
                        setSelectedCateBlog(blogs); // Cập nhật blogs cần chỉnh sửa
                        setId(blogs.id);
                        setName(blogs.name);
                        setSlug(blogs.slug);
                        setStatus(blogs.status);
                      }}>
                        <Pencil className="mr-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Cate BLog</DialogTitle>
                        <DialogDescription>
                          Edit a Cate Blog account.
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
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
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
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleEditUser} >Add User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteCategoryBlog(blogs.id)}>
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