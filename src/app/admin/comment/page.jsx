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
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Comment() {
    const [Comment, setComment] = useState([])
    const router = useRouter()
    const [selectedCateBlog, setSelectedCateBlog] = useState(null); // State cho user cần chỉnh sửa
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(5); // Số lượng mục mỗi trang
    const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm


    useEffect(() => {
        const adminToken = Cookies.get('token');
        if (!adminToken) {
            router.push('/');
            return;
        }
        // fetch dữ liệu user

        const fetchDataComment = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/comment_building', {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    // Kiểm tra nếu list_cate_blog là mảng hợp lệ
                    if (result && Array.isArray(result.list)) {
                        setComment(result.list);
                        console.log("Dữ liệu trả về từ API:", result.list);
                    } else {
                        setComment([]);
                        console.error("list không phải là mảng hợp lệ.");
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


        fetchDataComment();
    }, [router]);

    const handleDeleteComment = async (id) => {
        const adminToken = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:8000/api/comment_building/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "Content-Type": "application/json",
                },
            });


            console.log('Delete response status:', response.status);

            if (response.ok) {
                toast.success('Xóa thành công')
                // Cập nhật danh sách người dùng bằng cách loại bỏ người dùng đã xóa
                setComment((prevCategoriesBlog) => prevCategoriesBlog.filter(comments => comments.id !== id));
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Lỗi khi xóa người dùng");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Có lỗi xảy ra khi xóa người dùng");
        }
    };



    //Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredCategoryBlog = Array.isArray(Comment)
        ? Comment.filter((blog) =>
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

    const handleRefesh = () => {
        router.push('/admin/comment/comment_refresh')
    }
    return (
        <>
            <div className="space-y-4">
                {/* Cột chứa thanh tìm kiếm */}
                <div className="flex items-center justify-between w-full">
                    {/* Cột 1 */}
                    <div className="w-1/2 flex items-center space-x-4">
                        <Search className="h-5 w-5 text-gray-500" />
                        <Input
                            placeholder="Tìm kiếm..."
                            className="max-w-sm"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Cột 2 */}
                    <div className="w-1/2 flex justify-end">
                        <Button onClick={handleRefesh} variant="blue">
                            <FileText className="mr-2 h-4 w-4" />
                            Khôi phục
                        </Button>
                    </div>
                </div>




                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Ảnh</TableHead>
                            <TableHead>Tên người dùng</TableHead>
                            <TableHead>Tên tòa nhà</TableHead>
                            <TableHead>Bình luận</TableHead>
                            <TableHead>Ngày tháng</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(currentItems

                        ) && currentItems
                            .length > 0 ? (
                            currentItems
                                .map((comments, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{comments.id}</TableCell>
                                        <TableCell>  <img  className="w-10 h-10 rounded-full" src={`${process.env.NEXT_PUBLIC_PATH_FILE}${comments.avatar_user}`}
                                            onError={(e) => {
                                                e.target.src = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"; // URL ảnh mặc định
                                            }}></img> </TableCell>
                                        <TableCell>{comments.name_user}</TableCell>
                                        <TableCell>{comments.name_building}</TableCell>
                                        <TableCell>{comments.message}</TableCell>
                                        <TableCell>{comments.date}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="icon" onClick={() => handleDeleteComment(comments.id)}>
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


        </>
    )
}