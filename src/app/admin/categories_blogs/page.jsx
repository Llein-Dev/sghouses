"use client"
import { useEffect, useState } from "react"
import { Search, FileText, Eye, Download, Trash2, BookCopy, Link, Pencil, Book, Plus } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CategoryBlog() {
  const [categoryBlog, setCatagoryBlog] = useState([])
  const router = useRouter()
  const [selectedCateBlog, setSelectedCateBlog] = useState(null); // State cho user cần chỉnh sửa
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(5); // Số lượng mục mỗi trang
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm



    const fetchDataCatagoryBlog = async () => {
      const adminToken = Cookies.get("token");
      try {
        const response = await fetch('https://hieu.name.vn/datn/public/api/cate_blog', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          // Kiểm tra nếu list_cate_blog là mảng hợp lệ
          if (result && Array.isArray(result.list_cate_blog)) {
            setCatagoryBlog(result.list_cate_blog);
            console.log("Dữ liệu trả về từ API:", result.list_cate_blog);
          } else {
            // Nếu không phải mảng, gán mảng rỗng và log thông báo lỗi
            setCatagoryBlog([]);
            console.error("list_cate_blog không phải là mảng hợp lệ.");
          }
        } else {
          // Xử lý khi không có quyền truy cập hoặc response không thành công
          setError('Không có quyền truy cập');
          console.error('Không có quyền truy cập API');
        }
      } catch (error) {
        // Xử lý khi có lỗi trong quá trình fetch
        setError('Không thể truy cập dữ liệu');
        console.error('Lỗi khi fetch dữ liệu:', error);
      }
    };

    useEffect(() => {
      const adminToken = Cookies.get('token');
      if (!adminToken) {
        router.push('/');
        return;
      }
      // fetch dữ liệu user
    fetchDataCatagoryBlog();
  }, [router]);

  const handleDeleteCategoryBlog = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`https://hieu.name.vn/datn/public/api/cate_blog/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json", 
        },
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        fetchDataCatagoryBlog();
        toast.success('Xóa thành công')
        setCatagoryBlog((prevCategoriesBlog) => prevCategoriesBlog.filter(blogs => blogs.id !== id));
      } else {
        fetchDataCatagoryBlog();
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
      const response = await fetch(`https://hieu.name.vn/datn/public/api/cate_blog/edit/${selectedCateBlog.id}`, {
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
        toast.success('đã cập nhật thành công !')
        
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi khi cập nhật thông tin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddCateBlog = async (e) => {
    e.preventDefault();

    const adminToken = Cookies.get("token");
    if (!adminToken) {
      toast.warning('vui lòng đăng nhập trước khi tạo blog !')
      router.push("/");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);

    try {
      const response = await fetch("https://hieu.name.vn/datn/public/api/cate_blog/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchDataCatagoryBlog()
        toast.success('Thêm danh mục tin tức thành công!');
      } else {
        fetchDataCatagoryBlog()
        const errorData = await response.json();
        toast.error(`Lỗi khi thêm danh mục: ${errorData.message || "Có lỗi xảy ra"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi kết nối API.");
    }
  };
  // khôi pbuc llien hệ
  const handleRefesh = () => {
    router.push('/admin/categories_blogs/refesh_categoriesBlog')
  }

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCategoryBlog = Array.isArray(categoryBlog)
  ? categoryBlog.filter((blog) =>
      `${blog.name} ${blog.slug} ${blog.status}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  : []; // Nếu không phải mảng, trả về mảng rỗng
  const currentItems = filteredCategoryBlog.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCategoryBlog.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {/* Cột chứa thanh tìm kiếm */}
          <div className="flex items-center space-x-2 w-1/2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Tìm kiếm..."
              className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Cột chứa 2 nút Refesh và Thêm Danh Mục */}
          <div className="flex items-center space-x-4 w-1/2 justify-end">
            {/* Nút Thêm Danh Mục và Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="blue" className="bg-green-700 text-white hover:bg-green-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm Danh Mục
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Thêm danh mục tin tức</DialogTitle>
                  <DialogDescription>
                    Thêm danh mục tin tức !
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tên
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="born" className="text-right">
                      Trạng thái
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
                  <Button type="button" onClick={handleAddCateBlog}>Thêm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* khôi phục Danh Mục tin tức */}
            <Button onClick={handleRefesh} variant="blue">
              <FileText className="mr-2 h-4 w-4" />
              Khôi phục
            </Button>
          </div>
        </div>


        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên Danh Mục Tin Tức</TableHead>
              <TableHead>Dường dẫn</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(currentItems

            ) && currentItems
              .length > 0 ? (
              currentItems
                .map((blogs, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{blogs.name}</TableCell>
                    <TableCell>{blogs.slug}</TableCell>
                    <TableCell>{new Date(blogs.created_at).toLocaleDateString()}</TableCell>
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
                              <DialogTitle>Chỉnh sửa danh mục tin tức</DialogTitle>
                              <DialogDescription>
                                chỉnh sửa với danh mục tin tức !
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Tên
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
                                  Đường dẫn
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
                                  Trạng thái
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
                              <Button type="submit" onClick={handleEditUser} >SửaUser</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>




                        <Button variant="outline" size="icon" onClick={() => handleDeleteCategoryBlog(blogs.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center  mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
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
      <ToastContainer/>
    </>
  )
}