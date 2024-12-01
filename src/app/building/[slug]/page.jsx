'use client'; // Đảm bảo dòng này có ở đầu file

import Image from "next/image";
import { useParams } from "next/navigation"; // Import useRouter từ next/navigation cho app router (v13+)
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoomComponents from "@/components/roomCard";
import CommentComponent from "@/components/Comment";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/breadcum";
import useBuildingDetails from "@/utils/api/GET/api"; // Import custom hook
import { Spinner } from "@/components/ui/loading";
import { useEffect, useState } from "react"; // Don't forget to import useState
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/redux/authSlice";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function BuildingDetailComponent() {
    const { slug } = useParams(); // Lấy slug từ URL
    const { building, loading, error } = useBuildingDetails(slug);
    const [comments, setComments] = useState([]); // State to manage comments
    const dispatch = useDispatch(); // Initialize dispatch
    const user = useSelector((state) => state.auth.user); // Access user from Redux store
    const token = Cookies.get('token');

    useEffect(() => {
        if (user) {
            dispatch(setProfile(user)); // Dispatch action to set user
        }
    }, [user, dispatch]);

    const addComment = async (newComment) => {
        if (!user) {
            toast.warning("bạn chưa đăng nhập !");

            return;
        }

        // Optimistic update: Add the comment to UI immediately
        const newCommentObj = {
            id: comments.length + 1,
            author: user ? user.name : "User",
            content: newComment,
            likes: 0,
            replies: 0,
            avatar: user ? `http://localhost:8000/storage/${user?.avatar}` : "",
        };
        setComments([...comments, newCommentObj]);

        // Send comment to backend
        const response = await fetch(`http://localhost:8000/api/building_cmt/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                slug: slug,    // Directly passing the values
                message: newComment
            })
        });


        const data = await response.json();
        toast.success("Gửi bình luận thành công!");
        if (data.message !== "Bạn chưa đăng nhập") {
            console.log("Comment added successfully:", data);
        } else {
            toast.warning("Có lỗi xảy ra vui lòng thử lại sau!");

        }
    };

    return (
        <>
            <div className="container mx-auto px-4 space-y-4 py-4">
                <Breadcrumb />
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-3xl font-bold mb-2">{building?.ten}</h1>
                            <Badge variant="secondary">Cuộc sống sang trọng</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 space-y-4 h-full flex flex-col">
                                {building?.image.split(";").slice(0, 2).map((imgUrl, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:8000/storage/${imgUrl}`}
                                        alt={`Hình ảnh tòa nhà ${index + 1}`}
                                        width={600}
                                        height={300}
                                        className="w-full rounded-lg flex-1 object-cover"
                                    />
                                ))}
                            </div>
                            <div className="space-y-4 h-full flex flex-col">
                                {building?.image.split(";").slice(2, 5).map((imgUrl, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:8000/storage/${imgUrl}`}
                                        alt={`Hình ảnh nội thất ${index + 1}`}
                                        width={300}
                                        height={200}
                                        className="w-full rounded-lg flex-1 object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mô tả</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {building?.mo_ta}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tiện nghi chung</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                                {building?.tien_ich.split(";").map((amenity, index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Địa chỉ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                                {building?.vi_tri.split(";").map((address, index) => (
                                    <li key={index}>{address}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Các phòng có sẵn</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.values(building?.phong_tro || []).map((room, index) => (
                                <RoomComponents room={room} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <CommentComponent comments={comments} onCommentAdd={addComment} user={user} /> {/* Pass comments and addComment function here */}

                <div className="px-4 space-y-8 py-12 flex flex-col justify-center items-center container mx-auto">
                    <h2 className="text-center w-full font-bold text-2xl text-[#00008B]">
                        Phòng trọ <span className="text-[#FF5C00]">nổi bật</span>
                    </h2>
                    <Button className="w-36" variant="blue">
                        Xem chi tiết <ArrowRight />
                    </Button>
                </div>
            </div>
            <ToastContainer
            
            />
        </>
    );
}
