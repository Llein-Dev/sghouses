"use client"
import { ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Breadcrumb from '@/components/breadcum'
import { useParams } from 'next/navigation'
import { useFetchBlogHouse, useFetchDetailBlog, useFetchViewHouse } from '@/utils/api/GET/api'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Link from 'next/link'
import CommentComponent from '@/components/Comment'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '@/redux/authSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductCardColViewComponent } from '@/components/product-card-view'
import ErrorComponent from '@/components/ui/error'
export default function ArticleDetail() {
    const { slug } = useParams();
    const { detailBlog } = useFetchDetailBlog(slug);
    const [comments, setComments] = useState(detailBlog?.list_cmt || []);
    const user = useSelector((state) => state.auth.user); // Access user from Redux store
    const dispatch = useDispatch(); // Initialize dispatch
    const token = Cookies.get('token');
    useEffect(() => {
        if (detailBlog) {
            setComments(detailBlog.list_cmt || []);
        }
    }, [detailBlog]);

    useEffect(() => {
        if (user) {
            dispatch(setProfile(user)); // Dispatch action to set user
        }
    }, [user, dispatch]);
    const { BlogHouse } = useFetchBlogHouse();
    console.log(BlogHouse);

    const addComment = async (newComment) => {
        if (!user) {
            toast.warning("bạn chưa đăng nhập!");

            return;
        }

        // Tạo một comment tạm thời
        const tempComment = {
            id: comments?.length + 1, // Tạo id giả lập
            name: user?.name || "Người dùng",
            content: newComment,
            avatar: user?.avatar ? `${process.env.NEXT_PUBLIC_PATH_FILE}${user.avatar}` : "",
            likes: 0,
            replies: 0,
            date: "Vừa xong", // Hiển thị thời gian tạm thời
        };

        // Hiển thị bình luận tạm thời
        setComments((prevComments) => [...prevComments, tempComment]);

        try {
            // Gửi bình luận tới API
            const response = await fetch(`http://localhost:8000/api/blog/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    slug,
                    message: newComment,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Bình luận thành công:", data);

                // Thay thế comment tạm thời bằng comment từ server (nếu cần thiết)
                const updatedComment = {
                    id: data.id, // ID thực từ server
                    name: user?.name,
                    content: newComment,
                    avatar: user?.avatar ? `${process.env.NEXT_PUBLIC_PATH_FILE}${user.avatar}` : "",
                    likes: 0,
                    replies: 0,
                    date: data.date || "Vừa xong",
                };

                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment === tempComment ? updatedComment : comment
                    )
                );
            } else {
                throw new Error(data.message || "Thêm bình luận thất bại");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi thêm bình luận:", error);
            toast.warning('Có lỗi xảy ra, vui lòng thử lại.')
            // Xóa comment tạm thời nếu gửi không thành công
            setComments((prevComments) =>
                prevComments.filter((comment) => comment !== tempComment)
            );
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 space-y-4 pt-4">
                <Breadcrumb />
                <main className="">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 mb-4">
                            <div className=' bg-white p-8 shadow rounded-md mb-4'>
                                <div className="mb-8 space-y-4">
                                    <h1 className="text-4xl text-blue-900 font-bold mb-4">{detailBlog.title}</h1>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                        <span>Ngày tải: Ngày 24 tháng 10, 2024</span>
                                    </div>
                                    <p>
                                        {detailBlog.description}
                                    </p>
                                </div>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_PATH_FILE}${detailBlog.image}`}
                                    alt="SGhouses Việt Nam"
                                    className="w-full h-[400px] object-cover rounded-lg mb-6"

                                />
                                <div className="prose lg:prose-xl max-w-none space-y-4">
                                    {detailBlog?.body
                                        ?.split('\n')
                                        .filter(paragraph => paragraph.trim() !== '')
                                        .map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                </div>

                                {/* Author Info */}
                                <div className="flex items-center space-x-4 mt-8 p-4 bg-muted rounded-lg">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.avatar_user || "/placeholder.svg?height=40&width=40"}
                                            alt={user?.name_user || "Tác giả"}
                                        />
                                        <AvatarFallback>{user?.name_user?.charAt(0) || "TG"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{user?.name_user || "Nguyễn Văn A"}</h3>
                                        <p className="text-sm text-muted-foreground">{user?.role_user || "Nhà báo chuyên về văn hóa và ẩm thực"}</p>
                                    </div>
                                </div>

                                {/* Share Buttons */}
                                <div className="flex space-x-4 mt-8">
                                    <Button variant="orange" size="icon">
                                        <Facebook className="h-4 w-4" />
                                    </Button>
                                    <Button variant="orange" size="icon">
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                    <Button variant="orange" size="icon">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Comment Section */}

                            </div>
                            <CommentComponent
                                comments={comments} // Truyền state comments
                                onCommentAdd={addComment}
                                user={user}
                            />

                        </div>
                        {/* Related Articles */}
            

                        <div className="lg:col-span-1 bg-gray-100">
                            <div className="space-y-4">
                                {BlogHouse.map((i) => (
                                    <Card key={i.id}>
                                        <CardContent className="grid p-0 overflow-hidden grid-cols-3">
                                            {/* Image Section */}
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_PATH_FILE}${i.image}`}
                                                alt={`Related Article ${i.title}`}
                                                className="col-span-1 aspect-square object-cover"
                                            />

                                            {/* Text Content Section */}
                                            <div className="p-5 col-span-2">
                                                <Link href={`/blog/${i.slug}`}>
                                                    <h3 className="font-semibold mb-2">{i.title || 'Tiêu đề bài viết liên quan'}</h3>
                                                </Link>
                                                {/* Limited Description */}
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {i.description || 'Mô tả ngắn về bài viết liên quan...'}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                    </div>
                </main>
            </div>

        </>
    )
}
