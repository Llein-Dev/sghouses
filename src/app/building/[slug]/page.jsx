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

export default function BuildingDetailComponent() {
    const { slug } = useParams(); // Lấy slug từ URL
    // Sử dụng custom hook
    const { building, loading, error } = useBuildingDetails(slug);
    if (loading) {
        return <div className="h-screen w-full flex justify-center items-center">
            <Spinner />
        </div>;
    }
    if (error) {
        return <div>Lỗi: {error.message}</div>;
    }
    console.log(building);

    return (
        <div className="container mx-auto px-4 space-y-4 py-4">
            <Breadcrumb />
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-3xl font-bold mb-2">{building.ten}</h1>
                        <Badge variant="secondary">Cuộc sống sang trọng</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Ảnh ở đầu trang */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-4 h-full flex flex-col">
                            {building.image.split(";").slice(0, 2).map((imgUrl, index) => (
                                <Image
                                    key={index}
                                    src={imgUrl}
                                    alt={`Hình ảnh tòa nhà ${index + 1}`}
                                    width={600}
                                    height={300}
                                    className="w-full rounded-lg flex-1 object-cover"
                                />
                            ))}
                        </div>
                        <div className="space-y-4 h-full flex flex-col">
                            {building.image.split(";").slice(2, 5).map((imgUrl, index) => (
                                <Image
                                    key={index}
                                    src={imgUrl}
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
                    {building.mo_ta}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Tiện nghi chung</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            {building.tien_ich.split(";").map((amenity, index) => (
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
                            {building.vi_tri.split(";").map((address, index) => (
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
                            <RoomComponents key={index} room={room} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <CommentComponent />

            <div className="px-4 space-y-8 py-12 flex flex-col justify-center items-center container mx-auto">
                <h2 className="text-center w-full font-bold text-2xl text-[#00008B]">
                    Phòng trọ <span className="text-[#FF5C00]">nổi bật</span>
                </h2>
                <Button className="w-36" variant="blue">
                    Xem chi tiết <ArrowRight />
                </Button>
            </div>
        </div>
    );
}
