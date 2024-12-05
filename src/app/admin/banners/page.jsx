"use client"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"
import { Search, Trash2, BookCopy, Eye, Plus, RefreshCcwDot, Pen } from "lucide-react"
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
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/navigation"
export default function Banners() {
  const [banners, setBanner] = useState([])
  const [error, setError] = useState([])
  const router = useRouter(); // Khởi tạo router
  // const router = useRouter()
  // Định nghĩa hàm fetchData
  const fetchDataBanners = async () => {

    try {
      const adminToken = Cookies.get("token");
      const response = await fetch('http://localhost:8000/api/banner', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setBanner(result);
        console.log(result)
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
    fetchDataBanners();
    // Call the prop to expose fetchData
  }, [router]);

 
   const handleDeleteBanners = async (id) => {
      const adminToken = Cookies.get("token");
      try {
        const response = await fetch(`http://localhost:8000/api/banner/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log('Delete response status:', response.status);
        if (response.ok) {
          // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
          setBanner((prevBanner) => prevBanner.filter(banner => banner.id !== id));
          toast.success('Xóa biểu ngữ thành công !')
          fetchDataBanners(); // Cập nhật danh sách người dùng nếu không chuyển trang

        } else {
          const errorData = await response.json();
          setError(errorData.message || "Lỗi khi xóa biểu ngữ");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Có lỗi xảy ra khi xóa biểu ngữ");
      }
    };
  // nhân bản bannner
   const handleCoppyBanner = async (id) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/banner/duplicate/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newArea = await response.json();
        setBanner((prevBanner) => [...prevBanner, newArea]); // Cập nhật danh sách user
        // Hiện thông báo và tải lại danh sách users
        fetchDataBanners(); // Gọi lại fetchData để tải lại danh sách user mới

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Lỗi lấy thông tin phản hồi");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Có lỗi xảy ra khi sao chép người dùng");
    }
  };
  const handleToggle = async (id, isHot) => {
    const adminToken = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:8000/api/banner/editStatus/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: !isHot }), // Toggle trạng thái status
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message || 'Cập nhật thành công');
        setBanner(prevBanner =>
          prevBanner.map(banners =>
            banners.id === id ? { ...banners, status: !isHot } : banners
          )
        );
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Lỗi khi cập nhật');
      }
    } catch (error) {
      toast.error('Lỗi khi gửi yêu cầu');
    }
  };


  const handleRefeshBanner = () => {
    router.push('/admin/banners/refesh_banners')
  }
  const handleCreatBanner = () => {
    router.push('/admin/banners/c')
  }
  const handleUpdateArea = (id) => {
    router.push(`/admin/banners/update_banners/${id}`)
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Cột input */}
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Tìm kiếm..."
            value={""}
            // onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
        {/* Cột buttons */}
        <div className="flex justify-end space-x-2">
          <Button onClick={handleCreatBanner} className="bg-green-700 text-white hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" />
            Tạo biểu ngữ
          </Button>
          <Button onClick={handleRefeshBanner} variant="blue">
            <RefreshCcwDot className="mr-2 h-4 w-4" />
            Khôi phục biểu ngữ
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Nội dung</TableHead>
            <TableHead>Thứ tự</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.map((banner, index) => (
            <TableRow key={index} >
              <TableCell>{banner.id}</TableCell>
              <TableCell> <img style={{ height: "150px", width: '250px', objectFit: "cover", borderRadius: "10px" }} src={`http://localhost:8000/storage/${banner.image}`}></img> </TableCell>
              <TableCell className={!banner.title ? 'text-gray-500' : ''}>
                {banner.title ? banner.title : 'Tên trống'}
              </TableCell>

              <TableCell className={!banner.content ? 'text-gray-500' : ''}>
                {banner.content ? banner.content : 'Tiêu đề trống'}
              </TableCell>

              <TableCell>{banner.order} </TableCell>
              <TableCell>{banner.date} </TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{banner.status ? "On" : "Off"}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={banner.status}
                      onChange={() => handleToggle(banner.id, banner.status)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-700 peer-focus:ring-4 peer-focus:ring-blue-300 transition-all"></div>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border rounded-full border-gray-300 peer-checked:translate-x-5 peer-checked:border-white transition-all"></div>
                  </label>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleDeleteBanners(banner.id)} >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleUpdateArea(banner.id)}  >
                    <Pen className="h-4 w-4"
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleCoppyBanner(banner.id)}  >
                    <BookCopy className="h-4 w-4"
                    />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  )
}