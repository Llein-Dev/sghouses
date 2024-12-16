"use client"
import { useEffect, useState } from "react"
import { Search, FileText, Eye, Download, Trash2, BookCopy, Link, Pencil, Book, Plus, RefreshCcw, ListX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Badge } from "@/components/ui/badge"
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
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
export default function CategoryBlog() {
    const [room, setRoom] = useState([])
    const router = useRouter()
    const [error, setError] = useState([])
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
    useEffect(() => {
        const adminToken = Cookies.get('token');
        if (!adminToken) {
            router.push('/');
            return;
        }
        fetchDataRoom();
    }, [router]);
    const fetchDataRoom = async () => {
        const adminToken = Cookies.get("token");

        try {
            const response = await fetch('http://localhost:8000/api/phong', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setRoom(result.list_room || []);
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

    const handleDeleteRoom = async (id) => {
        const adminToken = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:8000/api/phong/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });

            console.log('Delete response status:', response.status);

            const contentType = response.headers.get("Content-Type");
            let errorMessage;
            if (response.ok) {
                toast.success("xóa thành công !"); // Thông báo lỗi
                // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
                setRoom((prevRoom) => prevRoom.filter(rooms => rooms.id !== id));
            }else {
                if (contentType.includes("application/json")) {
                    const data = await response.json();
                    errorMessage = data.message || "Đã xảy ra lỗi, vui lòng thử lại!";
                } else {
                    errorMessage = await response.text(); // Nếu là chuỗi thuần
                }
                toast.error(`Lỗi: ${errorMessage}`); // Hiển thị toàn bộ chuỗi
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // nhân bản blog
    const handleCoppyRoom = async (id) => {
        const adminToken = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:8000/api/phong/duplicate/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                toast.success("nhân bản thành công !"); // Thông báo lỗi
                const newRoom = await response.json();
                setRoom((prevRoom) => [...prevRoom, newRoom]); // Cập nhật danh sách user
                // Hiện thông báo và tải lại danh sách users
                fetchDataRoom(); // Gọi lại fetchData để tải lại danh sách user mới
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Lỗi lấy thông tin phản hồi");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Có lỗi xảy ra khi sao chép người dùng");
        }
    };

    const filteredRoom = room.filter((rooms) =>
        `${rooms.ten_phong} ${rooms.trang_thai} ${rooms.dien_tich} ${rooms.ngay_tao}  `
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    const handleRefesh = () => {
        router.push('/admin/room/refesh_room')
    }
    const handleCreatPage = () => {
        router.push('/admin/room/create_room')
    }
    const handleEditRoom = (id) => {
        router.push(`/admin/room/update/${id}`)
    }
    const handleDetailRoom = (id) => {
        router.push(`/admin/room/detail_room/${id}`)
    }

    return (
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
                            <Button onClick={handleCreatPage} className="bg-green-700 text-white hover:bg-green-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Tạo Phòng
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                    {/* khôi phục Danh Mục tin tức */}
                    <Button variant="blue" onClick={handleRefesh}>
                        <FileText className="mr-2 h-4 w-4" />
                        Khôi phục Phòng
                    </Button>
                </div>
            </div>


            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>STT</TableHead>
                        <TableHead>Thông tin phòng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Diện tích</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredRoom.map((rooms, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="flex gap-5">  <img className="object-cover h-[100px] rounded-lg aspect-video" src={`${process.env.NEXT_PUBLIC_PATH_FILE}${rooms.hinh_anh}`}
                             onError={(e) => {
                                e.target.src = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"; // URL ảnh mặc định
                            }}></img> <div><div className="p-1 text-xl font-bold  rounded text-black">{rooms.ten_phong} </div>{rooms.ten_toa_nha} <div>{rooms.ten_khu_vuc}</div> </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={rooms.trang_thai === 'Đang trống' ? 'success' : 'destructive'}
                                >
                                    {rooms.trang_thai}
                                </Badge>
                            </TableCell> {/* Trạng Thái */}
                            <TableCell>{rooms.dien_tich} m²</TableCell>
                            <TableCell>{rooms.ngay_tao}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    {/* Nút Gọi điện */}
                                    <Dialog>
                                        <Button variant="outline" size="icon" onClick={() => handleDeleteRoom(rooms.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" onClick={() => handleEditRoom(rooms.id)} >
                                                <Pencil className="mr-2 h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <Button variant="outline" size="icon" onClick={() => handleCoppyRoom(rooms.id)} >
                                            <BookCopy className="h-4 w-4"
                                            />
                                        </Button>
                                    </Dialog>

                                    <Button variant="outline" size="icon" onClick={() => handleDetailRoom(rooms.id)}>
                                        <Eye className="h-4 w-4"
                                        />
                                    </Button>

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ToastContainer/>
        </div>
    )
}