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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RefeshCataBlog() {
    const [deletedComment, setDeletedComment] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    // search với fetchdata base
    const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm
    const [filteredComment, setFilteredUsers] = useState([]); // Danh sách user sau khi lọc


    // hàm tiềm kiếm dựa trên dữ liệu được fetch
    const handleSearchChange = (event) => {
        const searchValue = event.target.value; // Nhận giá trị tìm kiếm từ người dùng
        setSearchTerm(searchValue); // Cập nhật `searchTerm` với giá trị tìm kiếm mới

        const filtered = deletedComment.filter((comments) => {
            const lowerCaseSearchValue = searchValue.toLowerCase().trim();
            // Tạo chuỗi kết hợp chứa tên, số điện thoại, ID và email để tìm kiếm toàn diện
            const combinedString = `${comments.name.toLowerCase()} ${comments.slug} ${comments.id} ${comments.status.toLowerCase()}`;
            // Kiểm tra xem chuỗi kết hợp có chứa giá trị tìm kiếm không
            return combinedString.includes(lowerCaseSearchValue);
        });
        setFilteredUsers(filtered);
    };


    // Định nghĩa hàm fetchDeletedComment
    const fetchDeletedComment = async () => {
        try {
            const adminToken = Cookies.get("token");
            const response = await fetch('http://localhost:8000/api/comment_building/list_delete', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setDeletedComment(result.list || []);
                console.log(result);
                console.log(deletedComment); // Kiểm tra dữ liệu


            } else {
                setDeletedComment([])
                setError('Không có quyền truy cập');
            }
        } catch (error) {
            setDeletedComment([])
            setError('Không thể truy cập dữ liệu');
        }
    };

    // Gọi fetchDeletedComment trong useEffect khi trang load lần đầu
    useEffect(() => {
        const adminToken = Cookies.get('token');
        if (!adminToken) {
            router.push('/');
            return;
        }
        fetchDeletedComment(); // Gọi hàm fetchDeletedComment
    }, [router]);

    useEffect(() => {
        setFilteredUsers(deletedComment); // Cập nhật  mỗi khi users thay đổi
    }, [deletedComment]);



    const handleRefesh = async (id) => {
        const adminToken = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:8000/api/comment_building/restore/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                await response.json(); // Đợi dữ liệu trả về
                toast.success('Cập nhật thành công')
                fetchDeletedComment(); // Cập nhật danh sách người dùng đã xóa nếu không chuyển trang

            } else {
                fetchDeletedComment()
                const errorData = await response.json();
                setError(errorData.message || "Lỗi khi khôi phục người dùng");
            }
        } catch (error) {
            console.log("Lỗi khi thực hiện khôi phục người dùng:", error);
        }
    };

    const handleReturn = () => {
        router.push('/admin/comment')
    }
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
                <Button onClick={handleReturn} variant="blue">
                    <FileText className="mr-2 h-4 w-4" />
                    Trang bình luận
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên Danh Mục Tin Tức</TableHead>
                        <TableHead>Điện thoại</TableHead>
                        <TableHead>Tình trạng</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filteredComment.length > 0 ? (
                            filteredComment.map((comments, index) => (
                                <TableRow key={index}>
                                    <TableCell>{comments.id}</TableCell>
                                    <TableCell>{comments.avatar_user}</TableCell>
                                    <TableCell>{comments.name_user}</TableCell>
                                    <TableCell>{comments.name_building}</TableCell>
                                    <TableCell>{comments.message}</TableCell>
                                    <TableCell>{comments.date}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="icon" onClick={() => handleRefesh(comments.id)}>
                                                <RefreshCcw className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500">
                                    Danh sách trống
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <ToastContainer />
        </div>

    );
}