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
export default function RefeshBanner() {
    const [bannerDeleted, setBannerDeleted] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();


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

    const fetchDataBannerDeleted = async () => {
        try {
            const adminToken = Cookies.get("token");
            if (!adminToken) {
                setError("Không có token hợp lệ");
                return;
            }

            const response = await fetch("http://localhost:8000/api/banner/list_delete", {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                setBannerDeleted(result);
            } else {
                setBannerDeleted([])
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
        fetchDataBannerDeleted();
    }, [router]);

    const handleRefeshBanner = async (id) => {
        const adminToken = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:8000/api/banner/restore/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                await response.json(); // Đợi dữ liệu trả về
                toast.success('Khôi phục khu vực thành công !')
                fetchDataBannerDeleted(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang

            } else {
                const errorData = await response.json();
                setError(errorData.message || "Lỗi khi khôi phục người dùng");
            }
        } catch (error) {
            console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
        }
    };

    const handleRefesh = () => {
        router.push('/admin/banners')
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
                        Danh sách khôi phục
                    </Button>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Ảnh</TableHead>
                        <TableHead>Tên</TableHead>
                        <TableHead>Đường dẫn</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bannerDeleted.length > 0 ? (
                        bannerDeleted.map((banner, index) => (
                            <TableRow key={index}>
                                <TableCell>{banner.id}</TableCell>
                                <TableCell>
                                    <img
                                        style={{
                                            height: "150px",
                                            width: "250px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                        }}
                                        src={`${process.env.NEXT_PUBLIC_PATH_FILE}${banner.image}`}
                                        alt={`${banner.image}`}
                                    />
                                </TableCell>
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
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleRefeshBanner(banner.id)}
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
            <ToastContainer />
        </div>
    );
}
